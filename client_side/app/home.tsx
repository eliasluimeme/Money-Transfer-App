'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { User, Transaction } from './types'
import { api } from './services/api'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { ArrowUpRight, ArrowDownRight, DollarSign, CreditCard, Send, PlusCircle, Home, History, Settings, LogOut, Bell } from 'lucide-react'
import Sidebar from '@/components/sidebar/sidebar'
import SendMoneyModal from '@/components/modals/sendMoneyModal'
import AddMoneyModal from '@/components/modals/addMoneyModal'

export default function MoneyTransferApp() {
  const [user, setUser] = useState<User | null>(null)
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [addAmount, setAddAmount] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await api.getProfile()
        setUser(userData)

        const transactions = await api.getTransactions()
        setTransactions(transactions)
      } catch (error) {
        console.error('Error fetching data:', error)
        router.push('/login')
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [router])

  const addToBalance = async (amount: number) => {
    try {
      await api.addToBalance(amount, "card")
      const updatedUserData = await api.getProfile()
      setUser(updatedUserData)
      setAddAmount('')
    } catch (error) {
      console.error('Error adding to balance:', error)
    }
  }

  const createTransaction = async (amount: number, receiverId: number) => {
    try {
      const newTransaction = await api.createTransaction(amount, receiverId)
      setTransactions([...transactions, newTransaction])

      const updatedUserData = await api.getProfile()
      setUser(updatedUserData)
    } catch (error) {
      console.error('Error creating transaction:', error)
    }
  }

  const handleSendMoney = async (amount: number, recipientId: number) => {
    try {
      const newTransaction = await api.createTransaction(amount, recipientId)
      setTransactions([newTransaction, ...transactions])

      const updatedUserData = await api.getProfile()
      setUser(updatedUserData)
    } catch (error) {
      console.error('Error sending money:', error)
      throw error // Re-throw the error to be handled in the modal
    }
  }

  const handleAddMoney = async (amount: number, method: string) => {
    try {
      await api.addToBalance(amount, method)
      const updatedUserData = await api.getProfile()
      setUser(updatedUserData)
    } catch (error) {
      console.error('Error adding money:', error)
      throw error
    }
  }

  if (isLoading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-purple-500 border-solid rounded-full animate-spin border-t-transparent"></div>
      </div>
    )
  }

  const chartData = [
    { name: 'Jan', income: 4000, expenses: 2400 },
    { name: 'Feb', income: 3000, expenses: 1398 },
    { name: 'Mar', income: 2000, expenses: 9800 },
    { name: 'Apr', income: 2780, expenses: 3908 },
    { name: 'May', income: 1890, expenses: 4800 },
    { name: 'Jun', income: 2390, expenses: 3800 },
    { name: 'Jul', income: 3490, expenses: 4300 },
  ]

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Welcome back, {user.username}</h2>
            <div className="flex items-center space-x-4">
              <button className="text-gray-600 hover:text-purple-600">
                <Bell className="w-6 h-6" />
              </button>
              <Avatar className="w-12 h-12">
                <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${user.username}`} alt={user.username} />
                <AvatarFallback>{user.username[0].toUpperCase()}</AvatarFallback>
              </Avatar>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white">
              <CardHeader>
                <CardTitle className="text-lg font-medium">Total Balance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">${user.balance.amount.toLocaleString()}</div>
                <div className="flex items-center mt-2 text-purple-200">
                  <ArrowUpRight className="w-4 h-4 mr-1" />
                  <span>+2.5%</span>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white border border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg font-medium text-gray-600">Income</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-500">$7,920</div>
                <div className="flex items-center mt-2 text-gray-500">
                  <ArrowUpRight className="w-4 h-4 mr-1" />
                  <span>+10.2%</span>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white border border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg font-medium text-gray-600">Expenses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-red-500">$3,248</div>
                <div className="flex items-center mt-2 text-gray-500">
                  <ArrowDownRight className="w-4 h-4 mr-1" />
                  <span>-5.1%</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="lg:col-span-2 border border-gray-200">
              <CardHeader>
                <CardTitle>Financial Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                      <defs>
                        <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <CartesianGrid strokeDasharray="3 3" />
                      <Tooltip />
                      <Area type="monotone" dataKey="income" stroke="#8884d8" fillOpacity={1} fill="url(#colorIncome)" />
                      <Area type="monotone" dataKey="expenses" stroke="#82ca9d" fillOpacity={1} fill="url(#colorExpenses)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-200">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <SendMoneyModal onSendMoney={handleSendMoney} currentBalance={parseInt(user.balance.amount)} />
                  <AddMoneyModal onAddMoney={handleAddMoney} currentBalance={parseInt(user.balance.amount)} />
                  <Button className="h-24 flex-col" variant="outline" onClick={() => {}}>
                    <CreditCard className="w-6 h-6 mb-2" />
                    Pay Bills
                  </Button>
                  <Button className="h-24 flex-col" variant="outline" onClick={() => {}}>
                    <DollarSign className="w-6 h-6 mb-2" />
                    Investments
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-8 border border-gray-200">
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all">
                <TabsList className="mb-4">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="income">Income</TabsTrigger>
                  <TabsTrigger value="expenses">Expenses</TabsTrigger>
                </TabsList>
                <TabsContent value="all">
                  {transactions.slice(0, 5).map((transaction, index) => (
                    <div key={index} className="flex items-center justify-between py-4 border-b last:border-b-0">
                      <div className="flex items-center">
                        <Avatar className="w-10 h-10 mr-4">
                          <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${transaction.receiver_username}`} alt={transaction.receiver_username} />
                          <AvatarFallback>{transaction.receiver_username[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{transaction.receiver_username}</div>
                          <div className="text-sm text-gray-500">{new Date(transaction.created_at).toLocaleDateString()}</div>
                        </div>
                      </div>
                      <div className={`font-medium ${transaction.sender === user.id ? 'text-red-500' : 'text-green-500'}`}>
                        {transaction.sender === user.id ? '-' : '+'}${transaction.amount}
                      </div>
                    </div>
                  ))}
                </TabsContent>
                {/* Add similar TabsContent for "income" and "expenses" */}
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

// 'use client'

// import React, { useState, useEffect } from 'react'
// import { useRouter } from 'next/navigation'
// import { User, Transaction } from './types'
// import { api } from './services/api'
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Progress } from "@/components/ui/progress"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import {
//   AreaChart,
//   Area,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from 'recharts'
// import { ArrowUpRight, ArrowDownRight, DollarSign, CreditCard, Send, PlusCircle, Home, History, Settings, LogOut } from 'lucide-react'

// export default function MoneyTransferApp() {
//   const [user, setUser] = useState<User | null>(null)
//   const [transactions, setTransactions] = useState<Transaction[]>([])
//   const [addAmount, setAddAmount] = useState('')
//   const [isLoading, setIsLoading] = useState(true)
//   const router = useRouter()

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const userData = await api.getProfile()
//         setUser(userData)

//         const transactions = await api.getTransactions()
//         setTransactions(transactions)
//       } catch (error) {
//         console.error('Error fetching data:', error)
//         router.push('/login')
//       } finally {
//         setIsLoading(false)
//       }
//     }

//     fetchData()
//   }, [router])

//   const addToBalance = async (amount: number) => {
//     try {
//       await api.addToBalance(amount)
//       const updatedUserData = await api.getProfile()
//       setUser(updatedUserData)
//       setAddAmount('')
//     } catch (error) {
//       console.error('Error adding to balance:', error)
//     }
//   }

//   const createTransaction = async (amount: number, receiverId: number) => {
//     try {
//       const newTransaction = await api.createTransaction(amount, receiverId)
//       setTransactions([...transactions, newTransaction])

//       const updatedUserData = await api.getProfile()
//       setUser(updatedUserData)
//     } catch (error) {
//       console.error('Error creating transaction:', error)
//     }
//   }

//   const handleLogout = () => {
//     localStorage.removeItem('access_token')
//     localStorage.removeItem('refresh_token')
//     router.push('/login')
//   }

//   if (isLoading || !user) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gray-100">
//         <div className="w-16 h-16 border-4 border-purple-500 border-solid rounded-full animate-spin border-t-transparent"></div>
//       </div>
//     )
//   }

//   const chartData = [
//     { name: 'Jan', income: 4000, expenses: 2400 },
//     { name: 'Feb', income: 3000, expenses: 1398 },
//     { name: 'Mar', income: 2000, expenses: 9800 },
//     { name: 'Apr', income: 2780, expenses: 3908 },
//     { name: 'May', income: 1890, expenses: 4800 },
//     { name: 'Jun', income: 2390, expenses: 3800 },
//     { name: 'Jul', income: 3490, expenses: 4300 },
//   ]

//   return (
//     <div className="flex h-screen bg-gray-100">
//       {/* Sidebar */}
//       <aside className="hidden md:flex md:flex-col md:w-64 bg-white shadow-md">
//         <div className="flex items-center justify-center h-20 border-b">
//           <h1 className="text-2xl font-bold text-purple-600">MoneyApp</h1>
//         </div>
//         <nav className="flex-grow">
//           <a href="#" className="flex items-center px-6 py-3 text-gray-700 bg-gray-100">
//             <Home className="w-5 h-5 mr-3" />
//             Dashboard
//           </a>
//           <a href="#" className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-100">
//             <Send className="w-5 h-5 mr-3" />
//             Transfer
//           </a>
//           <a href="#" className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-100">
//             <History className="w-5 h-5 mr-3" />
//             Transactions
//           </a>
//           <a href="#" className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-100">
//             <CreditCard className="w-5 h-5 mr-3" />
//             Cards
//           </a>
//         </nav>
//         <div className="p-6 border-t">
//           <a href="#" className="flex items-center text-gray-600 hover:text-gray-800">
//             <Settings className="w-5 h-5 mr-3" />
//             Settings
//           </a>
//           <button onClick={handleLogout} className="flex items-center mt-4 text-gray-600 hover:text-gray-800">
//             <LogOut className="w-5 h-5 mr-3" />
//             Log out
//           </button>
//         </div>
//       </aside>

//       {/* Main content */}
//       <main className="flex-1 overflow-y-auto">
//         <div className="p-8">
//           <div className="flex justify-between items-center mb-8">
//             <h2 className="text-3xl font-bold text-gray-800">Welcome back, {user.username}</h2>
//             <Avatar className="w-12 h-12">
//               <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${user.username}`} alt={user.username} />
//               <AvatarFallback>{user.username[0].toUpperCase()}</AvatarFallback>
//             </Avatar>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//             <Card className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white">
//               <CardHeader>
//                 <CardTitle className="text-lg font-medium">Total Balance</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="text-3xl font-bold">${user.balance.amount.toLocaleString()}</div>
//                 <div className="flex items-center mt-2 text-green-300">
//                   <ArrowUpRight className="w-4 h-4 mr-1" />
//                   <span>+2.5%</span>
//                 </div>
//               </CardContent>
//             </Card>
//             <Card>
//               <CardHeader>
//                 <CardTitle className="text-lg font-medium">Income</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="text-3xl font-bold text-green-500">$7,920</div>
//                 <div className="flex items-center mt-2 text-gray-500">
//                   <ArrowUpRight className="w-4 h-4 mr-1" />
//                   <span>+10.2%</span>
//                 </div>
//               </CardContent>
//             </Card>
//             <Card>
//               <CardHeader>
//                 <CardTitle className="text-lg font-medium">Expenses</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="text-3xl font-bold text-red-500">$3,248</div>
//                 <div className="flex items-center mt-2 text-gray-500">
//                   <ArrowDownRight className="w-4 h-4 mr-1" />
//                   <span>-5.1%</span>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>

//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//             <Card className="lg:col-span-2">
//               <CardHeader>
//                 <CardTitle>Financial Overview</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="h-[300px]">
//                   <ResponsiveContainer width="100%" height="100%">
//                     <AreaChart data={chartData}>
//                       <defs>
//                         <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
//                           <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
//                           <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
//                         </linearGradient>
//                         <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
//                           <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
//                           <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
//                         </linearGradient>
//                       </defs>
//                       <XAxis dataKey="name" />
//                       <YAxis />
//                       <CartesianGrid strokeDasharray="3 3" />
//                       <Tooltip />
//                       <Area type="monotone" dataKey="income" stroke="#8884d8" fillOpacity={1} fill="url(#colorIncome)" />
//                       <Area type="monotone" dataKey="expenses" stroke="#82ca9d" fillOpacity={1} fill="url(#colorExpenses)" />
//                     </AreaChart>
//                   </ResponsiveContainer>
//                 </div>
//               </CardContent>
//             </Card>

//             <Card>
//               <CardHeader>
//                 <CardTitle>Quick Actions</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="grid grid-cols-2 gap-4">
//                   <Button className="h-24 flex-col" onClick={() => {}}>
//                     <Send className="w-6 h-6 mb-2" />
//                     Send Money
//                   </Button>
//                   <Button className="h-24 flex-col" variant="outline" onClick={() => {}}>
//                     <PlusCircle className="w-6 h-6 mb-2" />
//                     Add Money
//                   </Button>
//                   <Button className="h-24 flex-col" variant="outline" onClick={() => {}}>
//                     <CreditCard className="w-6 h-6 mb-2" />
//                     Pay Bills
//                   </Button>
//                   <Button className="h-24 flex-col" variant="outline" onClick={() => {}}>
//                     <DollarSign className="w-6 h-6 mb-2" />
//                     Investments
//                   </Button>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>

//           <Card className="mt-8">
//             <CardHeader>
//               <CardTitle>Recent Transactions</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <Tabs defaultValue="all">
//                 <TabsList className="mb-4">
//                   <TabsTrigger value="all">All</TabsTrigger>
//                   <TabsTrigger value="income">Income</TabsTrigger>
//                   <TabsTrigger value="expenses">Expenses</TabsTrigger>
//                 </TabsList>
//                 <TabsContent value="all">
//                   {transactions.slice(0, 5).map((transaction, index) => (
//                     <div key={index} className="flex items-center justify-between py-4 border-b last:border-b-0">
//                       <div className="flex items-center">
//                         <Avatar className="w-10 h-10 mr-4">
//                           <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${transaction.receiver_username}`} alt={transaction.receiver_username} />
//                           <AvatarFallback>{transaction.receiver_username[0]}</AvatarFallback>
//                         </Avatar>
//                         <div>
//                           <div className="font-medium">{transaction.receiver_username}</div>
//                           <div className="text-sm text-gray-500">{new Date(transaction.created_at).toLocaleDateString()}</div>
//                         </div>
//                       </div>
//                       <div className={`font-medium ${transaction.sender === user.id ? 'text-red-500' : 'text-green-500'}`}>
//                         {transaction.sender === user.id ? '-' : '+'}${transaction.amount}
//                       </div>
//                     </div>
//                   ))}
//                 </TabsContent>
//                 {/* Add similar TabsContent for "income" and "expenses" */}
//               </Tabs>
//             </CardContent>
//           </Card>
//         </div>
//       </main>
//     </div>
//   )
// }

// 'use client'

// import React, { useState, useEffect } from 'react'
// import { useRouter } from 'next/navigation'
// import { User, Transaction } from './types'
// import { api } from './services/api'
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Icons } from "@/components/ui/icons"
// import { Progress } from "@/components/ui/progress"
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from 'recharts'

// export default function MoneyTransferApp() {
//   const [user, setUser] = useState<User | null>(null)
//   const [transactions, setTransactions] = useState<Transaction[]>([])
//   const [addAmount, setAddAmount] = useState('')
//   const [isLoading, setIsLoading] = useState(true)
//   const router = useRouter()

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const userData = await api.getProfile()
//         setUser(userData)

//         const transactions = await api.getTransactions()
//         setTransactions(transactions)
//       } catch (error) {
//         console.error('Error fetching data:', error)
//         router.push('/login')
//       } finally {
//         setIsLoading(false)
//       }
//     }

//     fetchData()
//   }, [router])

//   const addToBalance = async (amount: number) => {
//     try {
//       await api.addToBalance(amount)
//       const updatedUserData = await api.getProfile()
//       setUser(updatedUserData)
//       setAddAmount('')
//     } catch (error) {
//       console.error('Error adding to balance:', error)
//     }
//   }

//   const createTransaction = async (amount: number, receiverId: number) => {
//     try {
//       const newTransaction = await api.createTransaction(amount, receiverId)
//       setTransactions([...transactions, newTransaction])

//       const updatedUserData = await api.getProfile()
//       setUser(updatedUserData)
//     } catch (error) {
//       console.error('Error creating transaction:', error)
//     }
//   }

//   const acceptTransaction = async (transactionId: number) => {
//     try {
//       await api.acceptTransaction(transactionId)
      
//       const transactionsData = await api.getTransactions()
//       setTransactions(transactionsData)

//       const updatedUserData = await api.getProfile()
//       setUser(updatedUserData)
//     } catch (error) {
//       console.error('Error accepting transaction:', error)
//     }
//   }

//   const handleLogout = () => {
//     localStorage.removeItem('access_token')
//     localStorage.removeItem('refresh_token')
//     router.push('/login')
//   }

//   if (isLoading) {
//     return (
//       <div className="min-h-screen flex justify-center items-center bg-gray-100">
//         <Icons.spinner className="h-8 w-8 animate-spin text-purple-600" />
//       </div>
//     )
//   }

//   if (!user) {
//     return null
//   }

//   const chartData = [
//     { name: 'Mon', income: 1000, expenses: 400 },
//     { name: 'Tue', income: 1500, expenses: 600 },
//     { name: 'Wed', income: 1200, expenses: 800 },
//     { name: 'Thu', income: 1800, expenses: 1000 },
//     { name: 'Fri', income: 2000, expenses: 1500 },
//     { name: 'Sat', income: 2500, expenses: 2000 },
//     { name: 'Sun', income: 3000, expenses: 1800 },
//   ]

//   return (
//     <div className="flex h-screen bg-gray-100">
//       {/* Sidebar */}
//       <aside className="w-64 bg-white p-6 shadow-md">
//         <h1 className="text-2xl font-bold mb-8">Money Transfer App</h1>
//         <nav className="space-y-4">
//           <a href="#" className="flex items-center space-x-2 text-purple-600">
//             <Icons.home className="h-5 w-5" />
//             <span>Dashboard</span>
//           </a>
//           <a href="#" className="flex items-center space-x-2 text-gray-600 hover:text-purple-600">
//             <Icons.transfer className="h-5 w-5" />
//             <span>Transfer</span>
//           </a>
//           <a href="#" className="flex items-center space-x-2 text-gray-600 hover:text-purple-600">
//             <Icons.history className="h-5 w-5" />
//             <span>Transactions</span>
//           </a>
//           <a href="#" className="flex items-center space-x-2 text-gray-600 hover:text-purple-600">
//             <Icons.creditCard className="h-5 w-5" />
//             <span>Cards</span>
//           </a>
//         </nav>
//         <div className="mt-auto pt-6">
//           <Button variant="outline" className="w-full" onClick={handleLogout}>
//             Log out
//           </Button>
//         </div>
//       </aside>

//       {/* Main content */}
//       <main className="flex-1 p-8 overflow-auto">
//         <div className="flex justify-between items-center mb-8">
//           <h2 className="text-2xl font-semibold">Dashboard</h2>
//           <Avatar>
//             <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${user.username}`} alt={user.username} />
//             <AvatarFallback>{user.username[0].toUpperCase()}</AvatarFallback>
//           </Avatar>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//           <Card>
//             <CardHeader>
//               <CardTitle>Total Balance</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="text-3xl font-bold">${user.balance.amount}</div>
//               <div className="text-sm text-green-500">+2.36%</div>
//             </CardContent>
//           </Card>
//           <Card>
//             <CardHeader>
//               <CardTitle>Total Savings</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="text-3xl font-bold">$5,000.00</div>
//               <div className="text-sm text-green-500">+2.36%</div>
//             </CardContent>
//           </Card>
//         </div>

//         <Card className="mb-8">
//           <CardHeader>
//             <CardTitle>Statistics</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <ResponsiveContainer width="100%" height={300}>
//               <BarChart data={chartData}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="name" />
//                 <YAxis />
//                 <Tooltip />
//                 <Bar dataKey="income" fill="#8884d8" />
//                 <Bar dataKey="expenses" fill="#82ca9d" />
//               </BarChart>
//             </ResponsiveContainer>
//           </CardContent>
//         </Card>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
//           <Card>
//             <CardHeader>
//               <CardTitle>Goals</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-2">
//                 <div className="flex justify-between">
//                   <span>Summer Vacation</span>
//                   <span>62% reached</span>
//                 </div>
//                 <Progress value={62} className="w-full" />
//                 <div className="text-sm text-gray-500">$1,485 out of $2,400</div>
//               </div>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardHeader>
//               <CardTitle>Spending Overview</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-2">
//                 <div className="flex justify-between">
//                   <span>Groceries</span>
//                   <span>68%</span>
//                 </div>
//                 <Progress value={68} className="w-full" />
//                 <div className="flex justify-between">
//                   <span>Entertainment</span>
//                   <span>32%</span>
//                 </div>
//                 <Progress value={32} className="w-full" />
//               </div>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardHeader>
//               <CardTitle>Quick Transfer</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="flex space-x-2 mb-4">
//                 {['John', 'Sarah', 'Mike', 'Emma'].map((name, index) => (
//                   <Avatar key={index}>
//                     <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${name}`} alt={name} />
//                     <AvatarFallback>{name[0]}</AvatarFallback>
//                   </Avatar>
//                 ))}
//               </div>
//               <Button className="w-full">New Transfer</Button>
//             </CardContent>
//           </Card>
//         </div>

//         <Card>
//           <CardHeader>
//             <CardTitle>Recent Transactions</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-4">
//               {transactions.slice(0, 5).map((transaction, index) => (
//                 <div key={index} className="flex justify-between items-center">
//                   <div className="flex items-center space-x-4">
//                     <Avatar>
//                       <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${transaction.receiver_username}`} alt={transaction.receiver_username} />
//                       <AvatarFallback>{transaction.receiver_username[0]}</AvatarFallback>
//                     </Avatar>
//                     <div>
//                       <div className="font-medium">{transaction.receiver_username}</div>
//                       <div className="text-sm text-gray-500">{new Date(transaction.created_at).toLocaleDateString()}</div>
//                     </div>
//                   </div>
//                   <div className={transaction.sender === user.id ? 'text-red-500' : 'text-green-500'}>
//                     {transaction.sender === user.id ? '-' : '+'}${transaction.amount}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </CardContent>
//         </Card>
//       </main>
//     </div>
//   )
// }