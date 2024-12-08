import React from 'react';
import { Home, TrendingUp, Library, Compass, Settings, LogOut, Music, X } from 'lucide-react';

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        ></div>
      )}

      <nav className={`
        fixed top-0 left-0 h-screen w-64 bg-black flex flex-col px-4 py-8 z-50
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:relative lg:translate-x-0
      `}>
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <Music className="h-6 w-6 text-red-500" />
            <h1 className="text-red-500 text-xl font-semibold">DreamMusic</h1>
          </div>
          <button onClick={onClose} className="lg:hidden">
            <X className="h-6 w-6 text-gray-400 hover:text-white" />
          </button>
        </div>

        <div className="flex-grow">
          <p className="text-gray-500 text-sm mb-4">MENU</p>
          <ul className="space-y-2">
            <li className="flex items-center gap-4 text-gray-400 hover:text-white cursor-pointer p-2 rounded transition-colors">
              <Home className="h-5 w-5 text-red-500" />
              <span>Home</span>
            </li>
            <li className="flex items-center gap-4 text-gray-400 hover:text-white cursor-pointer p-2 rounded transition-colors">
              <TrendingUp className="h-5 w-5 text-red-500" />
              <span>Trends</span>
            </li>
            <li className="flex items-center gap-4 text-gray-400 hover:text-white cursor-pointer p-2 rounded transition-colors">
              <Library className="h-5 w-5 text-red-500" />
              <span>Library</span>
            </li>
            <li className="flex items-center gap-4 text-gray-400 hover:text-white cursor-pointer p-2 rounded transition-colors">
              <Compass className="h-5 w-5 text-red-500" />
              <span>Discover</span>
            </li>
          </ul>
        </div>

        <div className="mt-auto">
          <p className="text-gray-500 text-sm mb-4">GENERAL</p>
          <ul className="space-y-2">
            <li className="flex items-center gap-4 text-gray-400 hover:text-white cursor-pointer p-2 rounded transition-colors">
              <Settings className="h-5 w-5 text-red-500" />
              <span>Settings</span>
            </li>
            <li className="flex items-center gap-4 text-gray-400 hover:text-white cursor-pointer p-2 rounded transition-colors">
              <LogOut className="h-5 w-5 text-red-500" />
              <span>Log Out</span>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Sidebar;

