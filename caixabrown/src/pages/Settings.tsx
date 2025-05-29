import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { AlertTriangle, Save, RefreshCw, Trash2 } from 'lucide-react';
import { clearStorageData } from '../utils/storage';

const Settings: React.FC = () => {
  const { state, syncData, isOnline } = useAppContext();
  const [syncing, setSyncing] = useState(false);
  const [storeInfo, setStoreInfo] = useState({
    name: 'Supermercado Exemplo',
    document: '00.000.000/0000-00',
    address: 'Rua Exemplo, 123 - Cidade/UF',
    phone: '(00) 0000-0000',
  });

  const handleSyncData = async () => {
    setSyncing(true);
    try {
      await syncData();
    } finally {
      setSyncing(false);
    }
  };

  const handleClearData = () => {
    if (window.confirm('ATENÇÃO: Isso irá apagar TODOS os dados armazenados localmente. Esta ação não pode ser desfeita. Deseja continuar?')) {
      clearStorageData();
      window.location.reload();
    }
  };

  const handleStoreInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStoreInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveStoreInfo = () => {
    // In a real app, we'd save this to localStorage or similar
    alert('Informações da loja salvas com sucesso!');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">Informações da Loja</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nome da Loja
            </label>
            <input
              type="text"
              name="name"
              value={storeInfo.name}
              onChange={handleStoreInfoChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              CNPJ
            </label>
            <input
              type="text"
              name="document"
              value={storeInfo.document}
              onChange={handleStoreInfoChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Endereço
            </label>
            <input
              type="text"
              name="address"
              value={storeInfo.address}
              onChange={handleStoreInfoChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Telefone
            </label>
            <input
              type="text"
              name="phone"
              value={storeInfo.phone}
              onChange={handleStoreInfoChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <button
            type="button"
            onClick={handleSaveStoreInfo}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            <Save size={18} className="mr-2" />
            Salvar
          </button>
        </form>
      </div>

      <div>
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">Sincronização de Dados</h2>
          <div className="flex items-center mb-4">
            <div className={`w-3 h-3 rounded-full mr-2 ${isOnline ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span>{isOnline ? 'Online' : 'Offline'}</span>
          </div>
          <p className="text-gray-600 mb-4">
            {isOnline 
              ? `${state.orders.filter(o => !o.synced).length} pedidos pendentes de sincronização.` 
              : 'Você está offline. A sincronização será realizada quando a conexão for restabelecida.'}
          </p>
          <button
            onClick={handleSyncData}
            disabled={!isOnline || syncing}
            className={`flex items-center px-4 py-2 rounded-lg transition ${
              !isOnline || syncing
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            <RefreshCw size={18} className={`mr-2 ${syncing ? 'animate-spin' : ''}`} />
            {syncing ? 'Sincronizando...' : 'Sincronizar Agora'}
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Gerenciamento de Dados</h2>
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg mb-4">
            <div className="flex items-start">
              <AlertTriangle size={24} className="text-red-600 mr-3 mt-0.5" />
              <div>
                <h3 className="text-lg font-medium text-red-800">Área de Perigo</h3>
                <p className="text-red-700 mt-1">
                  Limpar todos os dados irá remover permanentemente todos os produtos, clientes, pedidos e configurações armazenados localmente.
                </p>
              </div>
            </div>
          </div>
          <button
            onClick={handleClearData}
            className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            <Trash2 size={18} className="mr-2" />
            Limpar Todos os Dados
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;