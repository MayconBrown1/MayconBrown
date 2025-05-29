import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Package, Users, Settings, Menu, X, Cloud } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { isOnline } = useAppContext();

  const navItems = [
    { path: '/', label: 'Caixa', icon: ShoppingCart },
    { path: '/products', label: 'Produtos', icon: Package },
    { path: '/customers', label: 'Clientes', icon: Users },
    { path: '/settings', label: 'Configurações', icon: Settings },
  ];

  const isActive = (path: string) => location.pathname === path;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <ShoppingCart size={24} className="text-brown-600 mr-2" />
              <span className="text-xl font-bold">CaixaBrown</span>
            </Link>

            {/* Desktop menu */}
            <div className="hidden md:ml-6 md:flex md:space-x-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`px-3 py-2 rounded-md text-sm font-medium flex items-center ${
                      isActive(item.path)
                        ? 'bg-brown-50 text-brown-700'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Icon size={18} className="mr-2" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="flex items-center">
            {/* Online/offline indicator */}
            <div className="flex items-center mr-4">
              <div className={`w-2 h-2 rounded-full mr-2 ${isOnline ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span className="text-sm text-gray-600 hidden sm:inline">{isOnline ? 'Online' : 'Offline'}</span>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
                onClick={toggleMenu}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`block px-3 py-2 rounded-md text-base font-medium flex items-center ${
                    isActive(item.path)
                      ? 'bg-brown-50 text-brown-700'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Icon size={18} className="mr-2" />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;