import React from 'react';
import { Customer } from '../types';
import { Edit, Trash2 } from 'lucide-react';

interface CustomerListProps {
  customers: Customer[];
  onEdit: (customer: Customer) => void;
  onDelete: (customerId: string) => void;
}

const CustomerList: React.FC<CustomerListProps> = ({ customers, onEdit, onDelete }) => {
  if (customers.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>Nenhum cliente cadastrado.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Nome
            </th>
            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              CPF/CNPJ
            </th>
            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Telefone
            </th>
            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              E-mail
            </th>
            <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Ações
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {customers.map((customer) => (
            <tr key={customer.id} className="hover:bg-gray-50">
              <td className="px-4 py-3 whitespace-nowrap">
                <div className="font-medium text-gray-900">{customer.name}</div>
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                {customer.document}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                {customer.phone || '-'}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                {customer.email || '-'}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                <button
                  onClick={() => onEdit(customer)}
                  className="text-blue-600 hover:text-blue-900 mr-3"
                >
                  <Edit size={18} />
                </button>
                <button
                  onClick={() => onDelete(customer.id)}
                  className="text-red-600 hover:text-red-900"
                >
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerList;