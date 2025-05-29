import React, { useState, useRef, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import BarcodeScanner from '../components/BarcodeScanner';
import ProductSearch from '../components/ProductSearch';
import ShoppingCart from '../components/ShoppingCart';
import CustomerSelector from '../components/CustomerSelector';
import PaymentProcessor from '../components/PaymentProcessor';
import { PrinterIcon, Save } from 'lucide-react';
import { generateReceiptHTML, printReceipt } from '../utils/printing';

const Dashboard: React.FC = () => {
  const { 
    state, 
    addToCart, 
    processPayment,
    clearCart,
    calculateTotal
  } = useAppContext();

  const [scannerActive, setScannerActive] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [lastOrder, setLastOrder] = useState<any>(null);

  const videoRef = useRef<HTMLVideoElement>(null);

  const handleBarcodeDetected = (barcode: string) => {
    const product = state.products.find(p => p.barcode === barcode);
    if (product) {
      addToCart(product, 1);
    } else {
      alert(`Product with barcode ${barcode} not found!`);
    }
  };

  const handleProductSelect = (product: any) => {
    addToCart(product, 1);
  };

  const handlePaymentComplete = (method: any, amountPaid: number) => {
    const total = calculateTotal();
    const order = {
      items: state.cart,
      customer: state.currentCustomer,
      total,
      paymentMethod: method,
      amountPaid,
      change: method === 'cash' ? amountPaid - total : 0,
      date: new Date()
    };
    
    processPayment(method, amountPaid);
    setLastOrder(order);
    setShowPayment(false);
  };

  const handlePrintReceipt = () => {
    if (lastOrder) {
      const receiptHTML = generateReceiptHTML(
        lastOrder.items,
        lastOrder.customer,
        lastOrder.total,
        lastOrder.paymentMethod,
        lastOrder.amountPaid,
        lastOrder.change,
        lastOrder.date
      );
      printReceipt(receiptHTML);
    }
  };

  const handleNewSale = () => {
    setLastOrder(null);
    clearCart();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div className="lg:col-span-2">
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
          <h2 className="text-xl font-semibold mb-4">Checkout</h2>
          
          {lastOrder ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
              <h3 className="text-lg font-medium text-green-800 mb-2">Venda concluída!</h3>
              <p className="text-green-700 mb-4">
                Total: {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(lastOrder.total)}
              </p>
              <div className="flex space-x-4">
                <button
                  onClick={handlePrintReceipt}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  <PrinterIcon size={18} className="mr-2" />
                  Imprimir Recibo
                </button>
                <button
                  onClick={handleNewSale}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
                >
                  Nova Venda
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <ProductSearch onProductSelect={handleProductSelect} />
                </div>
                <div>
                  <BarcodeScanner 
                    active={scannerActive} 
                    onToggle={() => setScannerActive(!scannerActive)} 
                    onDetect={handleBarcodeDetected}
                    videoRef={videoRef}
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <CustomerSelector />
              </div>
              
              {showPayment ? (
                <PaymentProcessor 
                  total={calculateTotal()} 
                  onComplete={handlePaymentComplete}
                  onCancel={() => setShowPayment(false)}
                />
              ) : (
                <div className="flex justify-end">
                  <button
                    onClick={() => setShowPayment(true)}
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                    disabled={state.cart.length === 0}
                  >
                    Finalizar Compra
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      
      <div>
        <ShoppingCart />
      </div>
    </div>
  );
};

export default Dashboard;