import React, { useState, useEffect } from 'react';
import { CreditCard, Wallet, Ban as Bank, QrCode, Receipt, ArrowLeft } from 'lucide-react';
import { PaymentMethod } from '../types';

interface PaymentProcessorProps {
  total: number;
  onComplete: (method: PaymentMethod, amountPaid: number) => void;
  onCancel: () => void;
}

const PaymentProcessor: React.FC<PaymentProcessorProps> = ({ total, onComplete, onCancel }) => {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);
  const [cashAmount, setCashAmount] = useState<string>('');
  const [change, setChange] = useState<number>(0);

  useEffect(() => {
    if (selectedMethod === 'cash' && cashAmount) {
      const amount = parseFloat(cashAmount.replace(',', '.'));
      setChange(amount - total);
    } else {
      setChange(0);
    }
  }, [cashAmount, total, selectedMethod]);

  const handleCashAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Allow only numbers and comma/dot for decimal
    const value = e.target.value.replace(/[^\d,\.]/g, '');
    setCashAmount(value);
  };

  const handleComplete = () => {
    if (selectedMethod === 'cash') {
      const amount = parseFloat(cashAmount.replace(',', '.'));
      if (isNaN(amount) || amount < total) {
        alert('O valor recebido deve ser maior ou igual ao total da compra.');
        return;
      }
      onComplete(selectedMethod, amount);
    } else if (selectedMethod) {
      onComplete(selectedMethod, total);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const paymentMethods = [
    { id: 'cash', label: 'Dinheiro', icon: Wallet },
    { id: 'credit', label: 'Cartão de Crédito', icon: CreditCard },
    { id: 'debit', label: 'Cartão de Débito', icon: CreditCard },
    { id: 'pix', label: 'PIX', icon: QrCode },
    { id: 'boleto', label: 'Boleto', icon: Receipt }
  ];

  return (
    <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
      <div className="flex items-center mb-4">
        <button
          onClick={onCancel}
          className="mr-2 text-gray-500 hover:text-gray-700"
        >
          <ArrowLeft size={20} />
        </button>
        <h2 className="text-xl font-semibold">Pagamento</h2>
      </div>
      
      <div className="mb-6">
        <div className="text-lg font-bold mb-2">Total a pagar: {formatCurrency(total)}</div>
      </div>

      <div className="mb-6">
        <h3 className="font-medium mb-3">Forma de pagamento</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {paymentMethods.map((method) => {
            const Icon = method.icon;
            return (
              <button
                key={method.id}
                className={`p-3 rounded-lg border flex items-center justify-center transition ${
                  selectedMethod === method.id
                    ? 'bg-blue-50 border-blue-300 text-blue-700'
                    : 'border-gray-200 hover:bg-gray-100'
                }`}
                onClick={() => setSelectedMethod(method.id as PaymentMethod)}
              >
                <Icon size={18} className="mr-2" />
                {method.label}
              </button>
            );
          })}
        </div>
      </div>

      {selectedMethod === 'cash' && (
        <div className="mb-6">
          <label className="block font-medium mb-2">Valor recebido</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">R$</span>
            <input
              type="text"
              className="w-full p-3 pl-10 border border-gray-300 rounded-lg"
              placeholder="0,00"
              value={cashAmount}
              onChange={handleCashAmountChange}
            />
          </div>
          
          {change >= 0 && cashAmount && (
            <div className="mt-3 p-3 bg-green-50 border border-green-100 rounded-lg">
              <div className="flex justify-between">
                <span>Troco:</span>
                <span className="font-bold">{formatCurrency(change)}</span>
              </div>
            </div>
          )}
          
          {change < 0 && cashAmount && (
            <div className="mt-3 p-3 bg-red-50 border border-red-100 rounded-lg text-red-700">
              <div className="flex justify-between">
                <span>Faltando:</span>
                <span className="font-bold">{formatCurrency(Math.abs(change))}</span>
              </div>
            </div>
          )}
        </div>
      )}
      
      <div className="flex justify-end">
        <button
          onClick={handleComplete}
          disabled={!selectedMethod || (selectedMethod === 'cash' && (parseFloat(cashAmount.replace(',', '.')) < total || !cashAmount))}
          className={`px-6 py-2 rounded-lg transition ${
            !selectedMethod || (selectedMethod === 'cash' && (parseFloat(cashAmount.replace(',', '.')) < total || !cashAmount))
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-green-600 text-white hover:bg-green-700'
          }`}
        >
          Finalizar Pagamento
        </button>
      </div>
    </div>
  );
};

export default PaymentProcessor;