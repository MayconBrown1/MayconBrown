import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Product } from '../types';
import ProductForm from '../components/ProductForm';
import ProductList from '../components/ProductList';
import { PlusIcon } from 'lucide-react';

const ProductManagement: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddProduct = (product: Product) => {
    dispatch({ type: 'ADD_PRODUCT', payload: { product } });
    setShowForm(false);
  };

  const handleUpdateProduct = (product: Product) => {
    dispatch({ type: 'UPDATE_PRODUCT', payload: { product } });
    setEditingProduct(null);
    setShowForm(false);
  };

  const handleDeleteProduct = (productId: string) => {
    if (window.confirm('Tem certeza que deseja excluir este produto?')) {
      dispatch({ type: 'DELETE_PRODUCT', payload: { productId } });
    }
  };

  const handleEditClick = (product: Product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const filteredProducts = state.products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.barcode.includes(searchTerm)
  );

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Gerenciamento de Produtos</h1>
        <button
          onClick={() => {
            setEditingProduct(null);
            setShowForm(!showForm);
          }}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          <PlusIcon size={18} className="mr-2" />
          Novo Produto
        </button>
      </div>

      {showForm && (
        <div className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
          <h2 className="text-xl font-semibold mb-4">
            {editingProduct ? 'Editar Produto' : 'Adicionar Produto'}
          </h2>
          <ProductForm
            product={editingProduct}
            onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct}
            onCancel={() => {
              setShowForm(false);
              setEditingProduct(null);
            }}
          />
        </div>
      )}

      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar produtos por nome ou código de barras..."
          className="w-full p-2 border border-gray-300 rounded-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <ProductList
        products={filteredProducts}
        onEdit={handleEditClick}
        onDelete={handleDeleteProduct}
      />
    </div>
  );
};

export default ProductManagement;