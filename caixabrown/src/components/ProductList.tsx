import React from 'react';
import { Product } from '../types';
import { Edit, Trash2 } from 'lucide-react';

interface ProductListProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (productId: string) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onEdit, onDelete }) => {
  const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  if (products.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>Nenhum produto cadastrado.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Produto
            </th>
            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Código de Barras
            </th>
            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Preço
            </th>
            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Tipo de Venda
            </th>
            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Categoria
            </th>
            <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Ações
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {products.map((product) => (
            <tr key={product.id} className="hover:bg-gray-50">
              <td className="px-4 py-3 whitespace-nowrap">
                <div className="font-medium text-gray-900">{product.name}</div>
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                {product.barcode}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                {formatter.format(product.price)}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                {product.saleType === 'quantity' ? 'Unidade' : 'Peso (kg)'}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                {product.category || '-'}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                <button
                  onClick={() => onEdit(product)}
                  className="text-blue-600 hover:text-blue-900 mr-3"
                >
                  <Edit size={18} />
                </button>
                <button
                  onClick={() => onDelete(product.id)}
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

export default ProductList;