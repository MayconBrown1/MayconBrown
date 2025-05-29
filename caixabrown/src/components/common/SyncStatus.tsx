import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { Cloud, CloudOff } from 'lucide-react';

const SyncStatus: React.FC = () => {
  const { isOnline, state, syncData } = useAppContext();
  const [lastSynced, setLastSynced] = useState<Date | null>(null);
  const [syncing, setSyncing] = useState(false);
  const [showBanner, setShowBanner] = useState(false);

  const pendingSyncCount = state.orders.filter(order => !order.synced).length;

  useEffect(() => {
    // Show banner briefly when coming back online
    if (isOnline && pendingSyncCount > 0) {
      setShowBanner(true);
      const timer = setTimeout(() => {
        setShowBanner(false);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [isOnline, pendingSyncCount]);

  const handleManualSync = async () => {
    if (!isOnline || syncing) return;
    
    setSyncing(true);
    try {
      await syncData();
      setLastSynced(new Date());
    } finally {
      setSyncing(false);
    }
  };

  if (!showBanner && isOnline && pendingSyncCount === 0) {
    return null;
  }

  return (
    <div className={`fixed bottom-0 left-0 right-0 p-2 transition-transform duration-300 ${showBanner ? 'translate-y-0' : 'translate-y-full'}`}>
      <div className={`max-w-md mx-auto rounded-lg shadow-lg p-3 flex items-center justify-between ${
        isOnline ? 'bg-blue-50 border border-blue-200' : 'bg-red-50 border border-red-200'
      }`}>
        <div className="flex items-center">
          {isOnline ? (
            <Cloud size={20} className="text-blue-600 mr-2" />
          ) : (
            <CloudOff size={20} className="text-red-600 mr-2" />
          )}
          <div>
            <p className={`text-sm font-medium ${isOnline ? 'text-blue-800' : 'text-red-800'}`}>
              {isOnline 
                ? pendingSyncCount > 0 
                  ? `${pendingSyncCount} ${pendingSyncCount === 1 ? 'venda pendente' : 'vendas pendentes'} de sincronização` 
                  : 'Todos os dados estão sincronizados'
                : 'Você está offline - os dados serão sincronizados quando a conexão for restaurada'
              }
            </p>
            {lastSynced && (
              <p className="text-xs text-gray-600">
                Última sincronização: {lastSynced.toLocaleTimeString()}
              </p>
            )}
          </div>
        </div>
        
        {isOnline && pendingSyncCount > 0 && (
          <button
            onClick={handleManualSync}
            disabled={syncing}
            className={`px-3 py-1 rounded text-xs font-medium ${
              syncing 
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {syncing ? 'Sincronizando...' : 'Sincronizar'}
          </button>
        )}
      </div>
    </div>
  );
};

export default SyncStatus;