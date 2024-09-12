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
    <aside className="w-64 bg-purple-800 p-6 flex flex-col h-screen">
      <h1 className="text-3xl font-bold mb-10 text-white">OnBank</h1>
      <nav className="space-y-6 flex-grow">
        <a href="#" className="flex items-center text-purple-200 hover:text-white transition-colors duration-200">
          <Home className="w-5 h-5 mr-3" />
          Dashboard
        </a>
        <a href="#" className="flex items-center text-purple-200 hover:text-white transition-colors duration-200">
          <Send className="w-5 h-5 mr-3" />
          Transfer
        </a>
        <a href="#" className="flex items-center text-purple-200 hover:text-white transition-colors duration-200">
          <History className="w-5 h-5 mr-3" />
          Transactions
        </a>
        <a href="#" className="flex items-center text-purple-200 hover:text-white transition-colors duration-200">
          <CreditCard className="w-5 h-5 mr-3" />
          Cards
        </a>
      </nav>
      <div className="mt-auto">
        <a href="/settings" className="flex items-center text-purple-200 hover:text-white transition-colors duration-200 mb-4">
          <Settings className="w-5 h-5 mr-3" />
          Settings
        </a>
        <button 
          onClick={handleLogout} 
          className="flex items-center text-purple-200 hover:text-white transition-colors duration-200"
        >
          <LogOut className="w-5 h-5 mr-3" />
          Log out
        </button>
      </div>
    </aside>
  )
}