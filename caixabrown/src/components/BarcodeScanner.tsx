import React, { useEffect, useRef } from 'react';
import { Camera, CameraOff } from 'lucide-react';
import { initBarcodeScanner, setupExternalScanner } from '../utils/barcodeScanner';

interface BarcodeScannerProps {
  active: boolean;
  onToggle: () => void;
  onDetect: (barcode: string) => void;
  videoRef: React.RefObject<HTMLVideoElement>;
}

const BarcodeScanner: React.FC<BarcodeScannerProps> = ({ 
  active, 
  onToggle, 
  onDetect,
  videoRef 
}) => {
  const scannerRef = useRef<{ stop: () => void } | null>(null);
  const externalScannerRef = useRef<{ cleanup: () => void } | null>(null);

  useEffect(() => {
    // Always set up external scanner
    externalScannerRef.current = setupExternalScanner(onDetect);
    
    return () => {
      externalScannerRef.current?.cleanup();
    };
  }, [onDetect]);

  useEffect(() => {
    const setupCamera = async () => {
      if (active && videoRef.current) {
        try {
          scannerRef.current = await initBarcodeScanner(videoRef.current, onDetect);
        } catch (error) {
          console.error('Failed to initialize camera scanner:', error);
          onToggle(); // Turn off the scanner if initialization fails
        }
      } else if (!active && scannerRef.current) {
        scannerRef.current.stop();
        scannerRef.current = null;
      }
    };

    setupCamera();

    return () => {
      if (scannerRef.current) {
        scannerRef.current.stop();
        scannerRef.current = null;
      }
    };
  }, [active, onDetect, onToggle, videoRef]);

  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold">Leitor de Código de Barras</h3>
        <button
          onClick={onToggle}
          className={`flex items-center px-3 py-1 rounded-lg transition ${
            active 
              ? 'bg-red-100 text-red-700 hover:bg-red-200' 
              : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
          }`}
        >
          {active ? (
            <>
              <CameraOff size={18} className="mr-1" />
              Desativar
            </>
          ) : (
            <>
              <Camera size={18} className="mr-1" />
              Ativar
            </>
          )}
        </button>
      </div>
      
      {active ? (
        <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
          <video 
            ref={videoRef} 
            className="absolute inset-0 w-full h-full object-cover"
            muted
            playsInline
          ></video>
          <div className="absolute inset-0 border-2 border-blue-500 border-dashed opacity-70 pointer-events-none"></div>
        </div>
      ) : (
        <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center text-gray-500">
          <div className="text-center">
            <Camera size={32} className="mx-auto mb-2 opacity-50" />
            <p>Câmera desativada</p>
            <p className="text-sm mt-2">Leitor externo sempre ativo</p>
          </div>
        </div>
      )}
      
      <div className="mt-2 text-sm text-gray-600">
        <p>Aponte para o código de barras ou use um leitor externo.</p>
      </div>
    </div>
  );
};

export default BarcodeScanner;