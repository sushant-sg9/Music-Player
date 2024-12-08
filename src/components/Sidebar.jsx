import { Home, TrendingUp, Library, Compass, Settings, LogOut, Music } from 'lucide-react'

const  Sidebar = () => {
  return (
    <nav className="w-64 h-screen bg-black flex flex-col px-4 py-8">
      <div className="flex items-center gap-2 mb-8">
        <Music className="h-6 w-6 text-red-500" />
        <h1 className="text-red-500 text-xl font-semibold">DreamMusic</h1>
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
  )
}

export default Sidebar