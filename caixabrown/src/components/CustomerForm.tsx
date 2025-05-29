import React, { useState, useEffect } from 'react';
import { Customer } from '../types';

interface CustomerFormProps {
  customer: Customer | null;
  onSubmit: (customer: Customer) => void;
  onCancel: () => void;
}

const CustomerForm: React.FC<CustomerFormProps> = ({ customer, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<Customer>({
    id: '',
    name: '',
    document: '',
    phone: '',
    email: '',
  });

  useEffect(() => {
    if (customer) {
      setFormData(customer);
    } else {
      setFormData({
        id: Date.now().toString(),
        name: '',
        document: '',
        phone: '',
        email: '',
      });
    }
  }, [customer]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Nome Completo
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full p-2 border border-gray-300 rounded-lg"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        
        <div>
          <label htmlFor="document" className="block text-sm font-medium text-gray-700 mb-1">
            CPF/CNPJ
          </label>
          <input
            type="text"
            id="document"
            name="document"
            required
            className="w-full p-2 border border-gray-300 rounded-lg"
            value={formData.document}
            onChange={handleChange}
          />
        </div>
        
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Telefone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className="w-full p-2 border border-gray-300 rounded-lg"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            E-mail
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full p-2 border border-gray-300 rounded-lg"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
      </div>
      
      <div className="mt-6 flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          {customer ? 'Atualizar' : 'Adicionar'} Cliente
        </button>
      </div>
    </form>
  );
};

export default CustomerForm;