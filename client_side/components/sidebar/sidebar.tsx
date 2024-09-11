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
      <aside className="w-55 bg-white-800 p-10">
      <h1 className="text-4xl font-bold mb-10 text-purple-700">OnBank</h1>
      <nav className="space-y-8">
        <a href="#" className="flex items-center text-white hover:text-purple-700">
          <Home className="w-5 h-5 mr-3" />
          Dashboard
        </a>
        <a href="#" className="flex items-center text-white hover:text-purple-700">
          <Send className="w-5 h-5 mr-3" />
          Transfer
        </a>
        <a href="#" className="flex items-center text-white hover:text-purple-700">
          <History className="w-5 h-5 mr-3" />
          Transactions
        </a>
        <a href="#" className="flex items-center text-white hover:text-purple-700">
          <CreditCard className="w-5 h-5 mr-3" />
          Cards
        </a>
      </nav>
      <div className="absolute bottom-0 left-0 w-64 p-10">
        <a href="#" className="flex items-center text-white hover:text-purple-700 mb-4">
          <Settings className="w-5 h-5 mr-3" />
          Settings
        </a>
        <button onClick={() => {
          localStorage.removeItem('access_token')
          localStorage.removeItem('refresh_token')
          router.push('/login')
        }} className="flex items-center text-white hover:text-purple-700">
          <LogOut className="w-5 h-5 mr-3" />
          Log out
        </button>
      </div>
    </aside>
    )
}