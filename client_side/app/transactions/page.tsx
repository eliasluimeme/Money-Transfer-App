"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowUpRight, ArrowDownRight, Search, Filter } from "lucide-react"
import Sidebar from "@/components/sidebar/sidebar"

const transactions = [
  { id: 1, name: "Alice Johnson", amount: 50.00, type: "sent", date: "2023-06-15" },
  { id: 2, name: "Bob Smith", amount: 30.00, type: "received", date: "2023-06-14" },
  { id: 3, name: "Carol Williams", amount: 75.00, type: "sent", date: "2023-06-13" },
  { id: 4, name: "David Brown", amount: 100.00, type: "received", date: "2023-06-12" },
  { id: 5, name: "Eve Davis", amount: 25.00, type: "sent", date: "2023-06-11" },
]

export default function TransactionsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")

  const filteredTransactions = transactions.filter(transaction => 
    transaction.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterType === "all" || transaction.type === filterType)
  )

  return (
    <div className="flex h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-4xl font-bold text-purple-800">Transactions</h1>
          
          <Card className="bg-white shadow-xl rounded-2xl overflow-hidden border-t-4 border-purple-500">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-purple-800">Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-4 mb-6">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400" size={20} />
                  <Input
                    type="search"
                    placeholder="Search transactions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-2 border-purple-200 focus:border-purple-500 focus:ring-purple-500 rounded-lg"
                  />
                </div>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-[180px] border-2 border-purple-200 focus:border-purple-500 focus:ring-purple-500 rounded-lg">
                    <SelectValue placeholder="Filter" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="sent">Sent</SelectItem>
                    <SelectItem value="received">Received</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-4">
                {filteredTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={`/avatar${transaction.id}.jpg`} alt={transaction.name} />
                        <AvatarFallback>{transaction.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-purple-800">{transaction.name}</p>
                        <p className="text-sm text-purple-600">{transaction.date}</p>
                      </div>
                    </div>
                    <div className={`flex items-center ${transaction.type === 'sent' ? 'text-red-500' : 'text-green-500'}`}>
                      {transaction.type === 'sent' ? (
                        <ArrowUpRight className="w-4 h-4 mr-1" />
                      ) : (
                        <ArrowDownRight className="w-4 h-4 mr-1" />
                      )}
                      <span className="font-semibold">${transaction.amount.toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}