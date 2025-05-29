import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Customer } from '../types';
import CustomerForm from '../components/CustomerForm';
import CustomerList from '../components/CustomerList';
import { PlusIcon } from 'lucide-react';

const CustomerManagement: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const [showForm, setShowForm] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddCustomer = (customer: Customer) => {
    dispatch({ type: 'ADD_CUSTOMER', payload: { customer } });
    setShowForm(false);
  };

  const handleUpdateCustomer = (customer: Customer) => {
    dispatch({ type: 'UPDATE_CUSTOMER', payload: { customer } });
    setEditingCustomer(null);
    setShowForm(false);
  };

  const handleDeleteCustomer = (customerId: string) => {
    if (window.confirm('Tem certeza que deseja excluir este cliente?')) {
      dispatch({ type: 'DELETE_CUSTOMER', payload: { customerId } });
    }
  };

  const handleEditClick = (customer: Customer) => {
    setEditingCustomer(customer);
    setShowForm(true);
  };

  const filteredCustomers = state.customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.document.includes(searchTerm) ||
    (customer.email && customer.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (customer.phone && customer.phone.includes(searchTerm))
  );

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Gerenciamento de Clientes</h1>
        <button
          onClick={() => {
            setEditingCustomer(null);
            setShowForm(!showForm);
          }}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          <PlusIcon size={18} className="mr-2" />
          Novo Cliente
        </button>
      </div>

      {showForm && (
        <div className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
          <h2 className="text-xl font-semibold mb-4">
            {editingCustomer ? 'Editar Cliente' : 'Adicionar Cliente'}
          </h2>
          <CustomerForm
            customer={editingCustomer}
            onSubmit={editingCustomer ? handleUpdateCustomer : handleAddCustomer}
            onCancel={() => {
              setShowForm(false);
              setEditingCustomer(null);
            }}
          />
        </div>
      )}

      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar clientes por nome, documento, email ou telefone..."
          className="w-full p-2 border border-gray-300 rounded-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <CustomerList
        customers={filteredCustomers}
        onEdit={handleEditClick}
        onDelete={handleDeleteCustomer}
      />
    </div>
  );
};

export default CustomerManagement;