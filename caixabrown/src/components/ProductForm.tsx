import React, { useState, useEffect } from 'react';
import { Product } from '../types';

interface ProductFormProps {
  product: Product | null;
  onSubmit: (product: Product) => void;
  onCancel: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ product, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<Product>({
    id: '',
    name: '',
    barcode: '',
    price: 0,
    saleType: 'quantity',
    category: '',
  });

  useEffect(() => {
    if (product) {
      setFormData(product);
    } else {
      setFormData({
        id: Date.now().toString(),
        name: '',
        barcode: '',
        price: 0,
        saleType: 'quantity',
        category: '',
      });
    }
  }, [product]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'price') {
      // Convert comma to dot for decimal handling
      const numericValue = value.replace(',', '.');
      setFormData({
        ...formData,
        [name]: parseFloat(numericValue) || 0,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
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
            Nome do Produto
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
          <label htmlFor="barcode" className="block text-sm font-medium text-gray-700 mb-1">
            Código de Barras
          </label>
          <input
            type="text"
            id="barcode"
            name="barcode"
            required
            className="w-full p-2 border border-gray-300 rounded-lg"
            value={formData.barcode}
            onChange={handleChange}
          />
        </div>
        
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
            Preço
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">R$</span>
            <input
              type="text"
              id="price"
              name="price"
              required
              className="w-full p-2 pl-10 border border-gray-300 rounded-lg"
              value={formData.price.toString().replace('.', ',')}
              onChange={handleChange}
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="saleType" className="block text-sm font-medium text-gray-700 mb-1">
            Tipo de Venda
          </label>
          <select
            id="saleType"
            name="saleType"
            className="w-full p-2 border border-gray-300 rounded-lg"
            value={formData.saleType}
            onChange={handleChange}
          >
            <option value="quantity">Unidade</option>
            <option value="weight">Peso (kg)</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            Categoria (opcional)
          </label>
          <input
            type="text"
            id="category"
            name="category"
            className="w-full p-2 border border-gray-300 rounded-lg"
            value={formData.category}
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
          {product ? 'Atualizar' : 'Adicionar'} Produto
        </button>
      </div>
    </form>
  );
};

export default ProductForm;