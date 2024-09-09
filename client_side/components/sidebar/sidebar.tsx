import { CreditCard, Send, Home, History, Settings, LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'


export default function Sidebar() {
    const router = useRouter()

    const handleLogout = () => {
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        router.push('/login')
    }
    
    return (
        <aside className="hidden md:flex md:flex-col md:w-64 border-r">
        <div className="flex items-center justify-center h-20 border-b">
          <h1 className="text-2xl font-bold text-purple-600">MoneyApp</h1>
        </div>
        <nav className="flex-grow">
          <a href="#" className="flex items-center px-6 py-3 text-purple-600 border-r-4 border-purple-600">
            <Home className="w-5 h-5 mr-3" />
            Dashboard
          </a>
          <a href="#" className="flex items-center px-6 py-3 text-gray-600 hover:text-purple-600 hover:bg-purple-50">
            <Send className="w-5 h-5 mr-3" />
            Transfer
          </a>
          <a href="#" className="flex items-center px-6 py-3 text-gray-600 hover:text-purple-600 hover:bg-purple-50">
            <History className="w-5 h-5 mr-3" />
            Transactions
          </a>
          <a href="#" className="flex items-center px-6 py-3 text-gray-600 hover:text-purple-600 hover:bg-purple-50">
            <CreditCard className="w-5 h-5 mr-3" />
            Cards
          </a>
        </nav>
        <div className="p-6 border-t">
          <a href="#" className="flex items-center text-gray-600 hover:text-purple-600">
            <Settings className="w-5 h-5 mr-3" />
            Settings
          </a>
          <button onClick={handleLogout} className="flex items-center mt-4 text-gray-600 hover:text-purple-600">
            <LogOut className="w-5 h-5 mr-3" />
            Log out
          </button>
        </div>
      </aside>
    )
}