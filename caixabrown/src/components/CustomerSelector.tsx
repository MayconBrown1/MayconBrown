import React, { useState, useRef, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { User, UserPlus, Search, X } from 'lucide-react';

const CustomerSelector: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const filteredCustomers = state.customers
    .filter(customer => 
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.document.includes(searchTerm) ||
      (customer.email && customer.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (customer.phone && customer.phone.includes(searchTerm))
    )
    .slice(0, 5); // Limit to 5 results

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setIsDropdownOpen(e.target.value.length > 0);
  };

  const handleSelectCustomer = (customer: any) => {
    dispatch({ type: 'SET_CURRENT_CUSTOMER', payload: { customer } });
    setSearchTerm('');
    setIsDropdownOpen(false);
  };

  const clearCustomer = () => {
    dispatch({ type: 'SET_CURRENT_CUSTOMER', payload: { customer: null } });
  };

  const clearSearch = () => {
    setSearchTerm('');
    setIsDropdownOpen(false);
  };

  return (
    <div className="p-3 border border-gray-200 rounded-lg">
      <h3 className="font-medium mb-2">Cliente</h3>
      
      {state.currentCustomer ? (
        <div className="flex justify-between items-center p-3 bg-blue-50 border border-blue-100 rounded-lg">
          <div>
            <div className="font-medium">{state.currentCustomer.name}</div>
            <div className="text-sm text-gray-600">
              {state.currentCustomer.document}
              {state.currentCustomer.phone && ` • ${state.currentCustomer.phone}`}
            </div>
          </div>
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={clearCustomer}
          >
            <X size={18} />
          </button>
        </div>
      ) : (
        <div className="relative" ref={dropdownRef}>
          <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
            <div className="pl-3 text-gray-500">
              <Search size={18} />
            </div>
            <input
              type="text"
              className="w-full p-2 pl-2 outline-none"
              placeholder="Buscar cliente..."
              value={searchTerm}
              onChange={handleSearchChange}
              onFocus={() => setIsDropdownOpen(searchTerm.length > 0)}
            />
            {searchTerm && (
              <button 
                className="p-2 text-gray-500 hover:text-gray-700"
                onClick={clearSearch}
              >
                <X size={18} />
              </button>
            )}
          </div>

          {isDropdownOpen && (
            <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg">
              {filteredCustomers.length > 0 ? (
                <ul>
                  {filteredCustomers.map((customer) => (
                    <li
                      key={customer.id}
                      className="p-3 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0"
                      onClick={() => handleSelectCustomer(customer)}
                    >
                      <div className="font-medium">{customer.name}</div>
                      <div className="text-sm text-gray-600">
                        {customer.document}
                        {customer.phone && ` • ${customer.phone}`}
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="p-3 text-gray-500 text-center">
                  Nenhum cliente encontrado
                  <a 
                    href="/customers" 
                    className="block mt-1 text-blue-600 hover:text-blue-800 flex items-center justify-center"
                  >
                    <UserPlus size={16} className="mr-1" />
                    Adicionar novo cliente
                  </a>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CustomerSelector;