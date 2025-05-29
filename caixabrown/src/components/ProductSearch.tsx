import React, { useState, useEffect, useRef } from 'react';
import { useAppContext } from '../context/AppContext';
import { Search, X } from 'lucide-react';

interface ProductSearchProps {
  onProductSelect: (product: any) => void;
}

const ProductSearch: React.FC<ProductSearchProps> = ({ onProductSelect }) => {
  const { state } = useAppContext();
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

  const filteredProducts = state.products
    .filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.barcode.includes(searchTerm)
    )
    .slice(0, 5); // Limit to 5 results

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setIsDropdownOpen(e.target.value.length > 0);
  };

  const handleSelectProduct = (product: any) => {
    onProductSelect(product);
    setSearchTerm('');
    setIsDropdownOpen(false);
  };

  const clearSearch = () => {
    setSearchTerm('');
    setIsDropdownOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
        <div className="pl-3 text-gray-500">
          <Search size={18} />
        </div>
        <input
          type="text"
          className="w-full p-2 pl-2 outline-none"
          placeholder="Pesquisar produtos..."
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
          {filteredProducts.length > 0 ? (
            <ul>
              {filteredProducts.map((product) => (
                <li
                  key={product.id}
                  className="p-3 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0"
                  onClick={() => handleSelectProduct(product)}
                >
                  <div className="font-medium">{product.name}</div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Código: {product.barcode}</span>
                    <span>
                      {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      }).format(product.price)}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-3 text-gray-500 text-center">
              Nenhum produto encontrado
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductSearch;