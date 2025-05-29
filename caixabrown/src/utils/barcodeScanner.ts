/**
 * Initialize barcode scanner using the device camera
 */
export const initBarcodeScanner = async (videoElement: HTMLVideoElement, onDetect: (barcode: string) => void) => {
  try {
    // Check if BarcodeDetector API is available
    if ('BarcodeDetector' in window) {
      const barcodeDetector = new (window as any).BarcodeDetector({
        formats: ['ean_13', 'ean_8', 'code_39', 'code_128', 'qr_code', 'upc_a', 'upc_e']
      });

      // Get camera stream
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      });
      
      videoElement.srcObject = stream;
      await videoElement.play();

      // Set up detection loop
      const detect = async () => {
        try {
          const barcodes = await barcodeDetector.detect(videoElement);
          if (barcodes.length > 0) {
            onDetect(barcodes[0].rawValue);
          }
          requestAnimationFrame(detect);
        } catch (error) {
          console.error('Barcode detection error:', error);
          requestAnimationFrame(detect);
        }
      };

      requestAnimationFrame(detect);
      
      return {
        stop: () => {
          const tracks = stream.getTracks();
          tracks.forEach(track => track.stop());
        }
      };
    } else {
      throw new Error('Barcode detection is not supported in this browser');
    }
  } catch (error) {
    console.error('Failed to initialize barcode scanner:', error);
    throw error;
  }
};

/**
 * Set up event listener for external barcode scanner
 * (usually these appear as keyboard inputs)
 */
export const setupExternalScanner = (onDetect: (barcode: string) => void) => {
  let barcodeBuffer = '';
  let lastKeyTime = 0;
  const MAX_INTERVAL = 100; // ms between keystrokes to be considered part of the same barcode

  const handleKeyDown = (event: KeyboardEvent) => {
    const currentTime = new Date().getTime();
    
    // If it's been too long since the last keystroke, reset the buffer
    if (currentTime - lastKeyTime > MAX_INTERVAL && barcodeBuffer.length > 0) {
      barcodeBuffer = '';
    }
    
    // Update the time
    lastKeyTime = currentTime;
    
    // If Enter key is pressed, process the barcode
    if (event.key === 'Enter' && barcodeBuffer.length > 0) {
      onDetect(barcodeBuffer);
      barcodeBuffer = '';
      event.preventDefault();
    } 
    // Otherwise, add the character to the buffer
    else if (!event.ctrlKey && !event.altKey && event.key.length === 1) {
      barcodeBuffer += event.key;
    }
  };

  document.addEventListener('keydown', handleKeyDown);
  
  return {
    cleanup: () => {
      document.removeEventListener('keydown', handleKeyDown);
    }
  };
};