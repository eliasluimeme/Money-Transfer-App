// 'use client'

// import React from 'react'
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Button } from "@/components/ui/button"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
// import { ArrowUpRight, ArrowDownRight, CreditCard, Send, PlusCircle, Search, Bell } from 'lucide-react'
// import { Progress } from "@/components/ui/progress"

// export default function Dashboard() {
//   const user = {
//     name: 'John Doe',
//     avatar: '/placeholder.svg?height=40&width=40'
//   }

//   const chartData = [
//     { name: 'Jan', income: 4000, expenses: 2400 },
//     { name: 'Feb', income: 3000, expenses: 1398 },
//     { name: 'Mar', income: 2000, expenses: 9800 },
//     { name: 'Apr', income: 2780, expenses: 3908 },
//     { name: 'May', income: 1890, expenses: 4800 },
//     { name: 'Jun', income: 2390, expenses: 3800 },
//   ]

//   const transactions = [
//     { id: 1, name: 'Media World', amount: -67.20, date: 'Jan 8, 2020' },
//     { id: 2, name: 'Rentalcars', amount: -34.25, date: 'Jan 11, 2020' },
//     { id: 3, name: 'Instacart', amount: -53.60, date: 'Jan 16, 2020' },
//     { id: 4, name: 'Ryanair', amount: -34.25, date: 'Jan 18, 2020' },
//   ]

//   return (
//     <div className="flex h-screen bg-gray-100">
//       {/* Sidebar */}
//       <div className="w-64 bg-white p-4 hidden md:block">
//         <div className="flex items-center mb-8">
//           <div className="w-8 h-8 bg-purple-600 rounded-lg mr-2"></div>
//           <span className="text-xl font-bold">Banking App</span>
//         </div>
//         <nav>
//           {['Home', 'Dashboard', 'Transactions', 'Accounts', 'Investments', 'Credit Cards', 'Loans'].map((item) => (
//             <Button key={item} variant="ghost" className="w-full justify-start mb-1">
//               {item}
//             </Button>
//           ))}
//         </nav>
//       </div>

//       {/* Main content */}
//       <div className="flex-1 overflow-auto">
//         {/* Header */}
//         <header className="bg-white p-4 flex justify-between items-center">
//           <h1 className="text-2xl font-bold">Dashboard</h1>
//           <div className="flex items-center space-x-4">
//             <Button variant="outline" size="icon">
//               <Search className="h-4 w-4" />
//             </Button>
//             <Button variant="outline" size="icon">
//               <Bell className="h-4 w-4" />
//             </Button>
//             <Avatar>
//               <AvatarImage src={user.avatar} alt={user.name} />
//               <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
//             </Avatar>
//           </div>
//         </header>

//         {/* Dashboard content */}
//         <main className="p-6">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
//             <Card className="col-span-2">
//               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                 <CardTitle className="text-sm font-medium">Card Selection</CardTitle>
//                 <CreditCard className="h-4 w-4 text-muted-foreground" />
//               </CardHeader>
//               <CardContent>
//                 <div className="flex items-center space-x-4">
//                   <div className="w-40 h-24 bg-purple-600 rounded-lg flex items-center justify-center text-white">
//                     <span className="text-2xl font-bold">VISA</span>
//                   </div>
//                   <div>
//                     <div className="text-2xl font-bold">149.00 EUR</div>
//                     <div className="text-sm text-muted-foreground">3456 2365 1274 2379</div>
//                     <div className="text-sm text-muted-foreground">06 / 20</div>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//             <Card>
//               <CardHeader>
//                 <CardTitle className="text-sm font-medium">Insurance</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="text-2xl font-bold mb-2">100%</div>
//                 <Progress value={100} className="mb-2" />
//                 <div className="space-y-1">
//                   <div className="flex justify-between text-sm">
//                     <span>Education Insurance</span>
//                     <span>25%</span>
//                   </div>
//                   <div className="flex justify-between text-sm">
//                     <span>Medical Insurance</span>
//                     <span>30%</span>
//                   </div>
//                   <div className="flex justify-between text-sm">
//                     <span>Personal Insurance</span>
//                     <span>45%</span>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>

//           <Card className="mb-6">
//             <CardHeader>
//               <CardTitle>Transactions</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-4">
//                 {transactions.map((transaction) => (
//                   <div key={transaction.id} className="flex justify-between items-center">
//                     <div>
//                       <div className="font-medium">{transaction.name}</div>
//                       <div className="text-sm text-muted-foreground">{transaction.date}</div>
//                     </div>
//                     <div className="font-medium text-red-500">
//                       ${Math.abs(transaction.amount).toFixed(2)}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardHeader>
//               <CardTitle>Statistics</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <Tabs defaultValue="days">
//                 <TabsList>
//                   <TabsTrigger value="days">Days</TabsTrigger>
//                   <TabsTrigger value="week">Week</TabsTrigger>
//                   <TabsTrigger value="months">Months</TabsTrigger>
//                 </TabsList>
//                 <TabsContent value="days" className="space-y-4">
//                   <div className="h-[200px]">
//                     <ResponsiveContainer width="100%" height="100%">
//                       <AreaChart data={chartData}>
//                         <defs>
//                           <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
//                             <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
//                             <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
//                           </linearGradient>
//                         </defs>
//                         <XAxis dataKey="name" />
//                         <YAxis />
//                         <CartesianGrid strokeDasharray="3 3" />
//                         <Tooltip />
//                         <Area type="monotone" dataKey="income" stroke="#8884d8" fillOpacity={1} fill="url(#colorIncome)" />
//                       </AreaChart>
//                     </ResponsiveContainer>
//                   </div>
//                   <div className="flex justify-center items-center">
//                     <div className="inline-flex items-center">
//                       <div className="w-16 h-16 rounded-full bg-purple-600 flex items-center justify-center text-white text-2xl font-bold">
//                         86%
//                       </div>
//                       <span className="ml-2 text-sm text-muted-foreground">Monday</span>
//                     </div>
//                   </div>
//                 </TabsContent>
//               </Tabs>
//             </CardContent>
//           </Card>
//         </main>
//       </div>
//     </div>
//   )
// }


// 'use client'

// import React, { useState, useEffect } from 'react'
// import { useRouter } from 'next/navigation'
// import { User, Transaction } from './types'
// import { api } from './services/api'
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
// import { ArrowUpRight, ArrowDownRight, DollarSign, CreditCard, Send, PlusCircle, Home, History, Settings, LogOut, Bell } from 'lucide-react'
// import Sidebar from '@/components/sidebar/sidebar'
// import SendMoneyModal from '@/components/modals/sendMoneyModal'
// import AddMoneyModal from '@/components/modals/addMoneyModal'
// import PayBillsModal from '@/components/modals/payBillsModal'

// export default function MoneyTransferApp() {
//   const [user, setUser] = useState<User | null>(null)
//   const [transactions, setTransactions] = useState<Transaction[]>([])
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

//   const handleSendMoney = async (amount: number, recipientId: number) => {
//     try {
//       const newTransaction = await api.createTransaction(amount, recipientId)
//       setTransactions([newTransaction, ...transactions])

//       const updatedUserData = await api.getProfile()
//       setUser(updatedUserData)
//     } catch (error) {
//       console.error('Error sending money:', error)
//       throw error
//     }
//   }

//   const handleAddMoney = async (amount: number, method: string) => {
//     try {
//       await api.addToBalance(amount, method)
//       const updatedUserData = await api.getProfile()
//       setUser(updatedUserData)
//     } catch (error) {
//       console.error('Error adding money:', error)
//       throw error
//     }
//   }

//   const handlePayBill = async (amount: number, billType: string) => {
//     try {
//       await api.addToBalance(-amount, "bill_payment")
//       const updatedUserData = await api.getProfile()
//       setUser(updatedUserData)
//       console.log(`Successfully paid ${billType} bill: $${amount}`)
//     } catch (error) {
//       console.error('Error paying bill:', error)
//       throw error
//     }
//   }

//   if (isLoading || !user) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-background">
//         <div className="w-16 h-16 border-4 border-primary border-solid rounded-full animate-spin border-t-transparent"></div>
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
//     <div className="flex h-screen bg-background text-foreground">
//       <Sidebar />
//       <main className="flex-1 overflow-y-auto">
//         <div className="p-8">
//           <div className="flex justify-between items-center mb-8">
//             <h2 className="text-3xl font-bold">Welcome back, {user.username}</h2>
//             <div className="flex items-center space-x-4">
//               <button className="text-foreground hover:text-primary transition-colors">
//                 <Bell className="w-6 h-6" />
//               </button>
//               <Avatar className="w-12 h-12">
//                 <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${user.username}`} alt={user.username} />
//                 <AvatarFallback>{user.username[0].toUpperCase()}</AvatarFallback>
//               </Avatar>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//             <Card className="bg-primary text-primary-foreground">
//               <CardHeader>
//                 <CardTitle className="text-lg font-medium">Total Balance</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="text-3xl font-bold">${user.balance.amount.toLocaleString()}</div>
//                 <div className="flex items-center mt-2 text-primary-foreground/80">
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
//                 <div className="flex items-center mt-2 text-muted-foreground">
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
//                 <div className="flex items-center mt-2 text-muted-foreground">
//                   <ArrowDownRight className="w-4 h-4 mr-1" />
//                   <span>-5.1%</span>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>

//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
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
//                   <SendMoneyModal onSendMoney={handleSendMoney} currentBalance={parseInt(user.balance.amount)} />
//                   <AddMoneyModal onAddMoney={handleAddMoney} currentBalance={parseInt(user.balance.amount)} />
//                   <PayBillsModal onPayBill={handlePayBill} currentBalance={parseInt(user.balance.amount)} />
//                   <Button className="h-24 flex-col" variant="outline">
//                     <DollarSign className="w-6 h-6 mb-2" />
//                     Investments
//                   </Button>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>

//           <Card>
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
//                           <div className="text-sm text-muted-foreground">{new Date(transaction.created_at).toLocaleDateString()}</div>
//                         </div>
//                       </div>
//                       <div className={`font-medium ${transaction.sender === user.id ? 'text-red-500' : 'text-green-500'}`}>
//                         {transaction.sender === user.id ? '-' : '+'}${transaction.amount}
//                       </div>
//                     </div>
//                   ))}
//                 </TabsContent>
//               </Tabs>
//             </CardContent>
//           </Card>
//         </div>
//       </main>
//     </div>
//   )
// }


'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { User, Transaction } from './types'
import { api } from './services/api'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
import SendMoneyModal from '@/components/modals/sendMoneyModal'
import AddMoneyModal from '@/components/modals/addMoneyModal'
import PayBillsModal from '@/components/modals/payBillsModal'
import InvestmentModal from '@/components/modals/inverstementsModal'
import Sidebar from '@/components/sidebar/sidebar'

export default function MoneyTransferApp() {
  const [user, setUser] = useState<User | null>(null)
  const [transactions, setTransactions] = useState<Transaction[]>([])
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

  const handleSendMoney = async (amount: number, recipientId: number) => {
    try {
      const newTransaction = await api.createTransaction(amount, recipientId)
      setTransactions([newTransaction, ...transactions])

      const updatedUserData = await api.getProfile()
      setUser(updatedUserData)
    } catch (error) {
      console.error('Error sending money:', error)
      throw error
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

  const handleInvest = async (amount: number, investmentType: string) => {
    try {
      await api.addToBalance(-amount, "investment")
      const updatedUserData = await api.getProfile()
      setUser(updatedUserData)
      console.log(`Successfully invested $${amount} in ${investmentType}`)
    } catch (error) {
      console.error('Error investing:', error)
      throw error
    }
  }

  const handlePayBill = async (amount: number, billType: string) => {
    try {
      await api.addToBalance(-amount, "bill_payment")
      const updatedUserData = await api.getProfile()
      setUser(updatedUserData)
      console.log(`Successfully paid ${billType} bill: $${amount}`)
    } catch (error) {
      console.error('Error paying bill:', error)
      throw error
    }
  }

  if (isLoading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-700 to-purple-900">
        <div className="w-16 h-16 border-4 border-white border-solid rounded-full animate-spin border-t-transparent"></div>
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
    <div className="flex h-screen w-full overflow-hidden bg-gradient-to-br from-purple-200 to-purple-700 text-white">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Welcome back, {user.username}</h2>
            <div className="flex items-center space-x-4">
              <button className="text-white hover:text-purple-200 transition-colors">
                <Bell className="w-6 h-6" />
              </button>
              <Avatar className="w-12 h-12">
                <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${user.username}`} alt={user.username} />
                <AvatarFallback>{user.username[0].toUpperCase()}</AvatarFallback>
              </Avatar>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-purple-700 text-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-medium">Total Balance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">${user.balance.amount.toLocaleString()}</div>
                <div className="flex items-center mt-2 text-green-300">
                  <ArrowUpRight className="w-4 h-4 mr-1" />
                  <span>+2.5%</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-purple-100 text-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-medium text-purple-700">Income</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-500">$7,920</div>
                <div className="flex items-center mt-2 text-green-500">
                  <ArrowUpRight className="w-4 h-4 mr-1" />
                  <span>+10.2%</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-purple-100 text-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-medium text-purple-700">Expenses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-red-500">$3,248</div>
                <div className="flex items-center mt-2 text-red-500">
                  <ArrowDownRight className="w-4 h-4 mr-1" />
                  <span>-5.1%</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <Card className="lg:col-span-2 bg-purple-300 text-white shadow-lg">
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
                      <XAxis dataKey="name" stroke="#fff" />
                      <YAxis stroke="#fff" />
                      <CartesianGrid strokeDasharray="3 3" stroke="#ffffff33" />
                      <Tooltip contentStyle={{ backgroundColor: '#ffffff', color: '#000' }} />
                      <Area type="monotone" dataKey="income" stroke="#8884d8" fillOpacity={1} fill="url(#colorIncome)" />
                      <Area type="monotone" dataKey="expenses" stroke="#82ca9d" fillOpacity={1} fill="url(#colorExpenses)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-purple-700 text-white shadow-lg">
              <CardHeader>
                <CardTitle className='text-xl mb-4'>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <SendMoneyModal onSendMoney={handleSendMoney} currentBalance={parseInt(user.balance.amount)} />
                  <AddMoneyModal onAddMoney={handleAddMoney} currentBalance={parseInt(user.balance.amount)} />
                  <PayBillsModal onPayBill={handlePayBill} currentBalance={parseInt(user.balance.amount)} />
                  <InvestmentModal onInvest={handleInvest} currentBalance={parseInt(user.balance.amount)} />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-purple-500 text-white shadow-lg">
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all">
                <TabsList className="mb-4 bg-purple-700">
                  <TabsTrigger value="all" className="data-[state=active]:bg-purple-600 text-white">All</TabsTrigger>
                  <TabsTrigger value="income" className="data-[state=active]:bg-purple-600 text-white">Income</TabsTrigger>
                  <TabsTrigger value="expenses" className="data-[state=active]:bg-purple-600 text-white">Expenses</TabsTrigger>
                </TabsList>
                <TabsContent value="all">
                  {transactions.slice(0, 5).map((transaction, index) => (
                    <div key={index} className="flex items-center justify-between py-4 border-b border-purple-700 last:border-b-0">
                      <div className="flex items-center">
                        <Avatar className="w-10 h-10 mr-4">
                          <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${transaction.receiver_username}`} alt={transaction.receiver_username} />
                          <AvatarFallback>{transaction.receiver_username[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{transaction.receiver_username}</div>
                          <div className="text-sm text-purple-300">{new Date(transaction.created_at).toLocaleDateString()}</div>
                        </div>
                      </div>
                      <div className={`font-medium ${transaction.sender === user.id ? 'text-red-300' : 'text-green-300'}`}>
                        {transaction.sender === user.id ? '-' : '+'}${transaction.amount}
                      </div>
                    </div>
                  ))}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}