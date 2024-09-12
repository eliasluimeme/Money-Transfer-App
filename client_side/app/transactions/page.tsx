"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowUpRight, ArrowDownRight, Search, Filter, Download, ChevronLeft, ChevronRight } from "lucide-react"
import Sidebar from "@/components/sidebar/sidebar"

const transactions = [
  { id: 1, name: "Alice Johnson", amount: 50.00, type: "sent", date: "2023-06-15", category: "Food" },
  { id: 2, name: "Bob Smith", amount: 30.00, type: "received", date: "2023-06-14", category: "Services" },
  { id: 3, name: "Carol Williams", amount: 75.00, type: "sent", date: "2023-06-13", category: "Shopping" },
  { id: 4, name: "David Brown", amount: 100.00, type: "received", date: "2023-06-12", category: "Salary" },
  { id: 5, name: "Eve Davis", amount: 25.00, type: "sent", date: "2023-06-11", category: "Entertainment" },
  // Add more transactions here...
]

export default function TransactionsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [sortBy, setSortBy] = useState("date")
  const [sortOrder, setSortOrder] = useState("desc")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const filteredAndSortedTransactions = transactions
    .filter(transaction => 
      transaction.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterType === "all" || transaction.type === filterType)
    )
    .sort((a, b) => {
      if (sortBy === "date") {
        return sortOrder === "asc" 
          ? new Date(a.date).getTime() - new Date(b.date).getTime()
          : new Date(b.date).getTime() - new Date(a.date).getTime()
      } else if (sortBy === "amount") {
        return sortOrder === "asc" ? a.amount - b.amount : b.amount - a.amount
      }
      return 0
    })

  const pageCount = Math.ceil(filteredAndSortedTransactions.length / itemsPerPage)
  const paginatedTransactions = filteredAndSortedTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortBy(column)
      setSortOrder("asc")
    }
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <h1 className="text-4xl font-bold text-purple-800">Transactions</h1>
          
          <Card className="bg-white shadow-xl rounded-2xl overflow-hidden border-t-4 border-purple-500">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-purple-800">Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
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
                <div className="flex space-x-4">
                  <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger className="w-[140px] border-2 border-purple-200 focus:border-purple-500 focus:ring-purple-500 rounded-lg">
                      <SelectValue placeholder="Filter" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="sent">Sent</SelectItem>
                      <SelectItem value="received">Received</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" className="border-2 border-purple-200 hover:bg-purple-100">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[250px]">Name</TableHead>
                      <TableHead className="w-[100px] cursor-pointer" onClick={() => handleSort("amount")}>
                        Amount {sortBy === "amount" && (sortOrder === "asc" ? "↑" : "↓")}
                      </TableHead>
                      <TableHead className="w-[100px]">Type</TableHead>
                      <TableHead className="w-[120px] cursor-pointer" onClick={() => handleSort("date")}>
                        Date {sortBy === "date" && (sortOrder === "asc" ? "↑" : "↓")}
                      </TableHead>
                      <TableHead className="w-[120px]">Category</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedTransactions.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={`/avatar${transaction.id}.jpg`} alt={transaction.name} />
                              <AvatarFallback>{transaction.name[0]}</AvatarFallback>
                            </Avatar>
                            <span>{transaction.name}</span>
                          </div>
                        </TableCell>
                        <TableCell className={transaction.type === 'sent' ? 'text-red-500' : 'text-green-500'}>
                          ${transaction.amount.toFixed(2)}
                        </TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            transaction.type === 'sent' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                          }`}>
                            {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                          </span>
                        </TableCell>
                        <TableCell>{transaction.date}</TableCell>
                        <TableCell>{transaction.category}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div className="flex items-center justify-between mt-4">
                <p className="text-sm text-gray-500">
                  Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredAndSortedTransactions.length)} of {filteredAndSortedTransactions.length} transactions
                </p>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, pageCount))}
                    disabled={currentPage === pageCount}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}