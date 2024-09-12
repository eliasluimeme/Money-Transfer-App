"use client"

import { useState, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Toast } from "@/components/ui/toast"
import { ArrowRight, DollarSign, CreditCard, Smartphone, Building, Search } from "lucide-react"
import Sidebar from "@/components/sidebar/sidebar"

const recentContacts = [
  { id: 1, name: "Alice Johnson", avatar: "/avatar1.jpg", accountNumber: "****1234" },
  { id: 2, name: "Bob Smith", avatar: "/avatar2.jpg", accountNumber: "****5678" },
  { id: 3, name: "Carol Williams", avatar: "/avatar3.jpg", accountNumber: "****9012" },
  { id: 4, name: "David Brown", avatar: "/avatar4.jpg", accountNumber: "****3456" },
]

const transferMethods = [
  { id: "bank", name: "Bank Transfer", icon: Building },
  { id: "card", name: "Card Transfer", icon: CreditCard },
  { id: "mobile", name: "Mobile Transfer", icon: Smartphone },
]

export default function TransferPage() {
  const [amount, setAmount] = useState("")
  const [recipient, setRecipient] = useState("")
  const [transferMethod, setTransferMethod] = useState("bank")
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredContacts = recentContacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleTransfer = (e: React.FormEvent) => {
    e.preventDefault()
    if (!amount || !recipient) {
      setToastMessage("Please fill in all fields")
      setShowToast(true)
      return
    }
    console.log("Transfer:", { amount, recipient, transferMethod })
    setToastMessage("Transfer successful!")
    setShowToast(true)
    setAmount("")
    setRecipient("")
  }

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 3000)
      return () => clearTimeout(timer)
    }
  }, [showToast])

  return (
    <div className="flex h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-4xl font-bold text-purple-800">Transfer Money</h1>
          
          <Card className="bg-white shadow-xl rounded-2xl overflow-hidden border-t-4 border-purple-500">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-purple-800">Send Money</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="quick" className="mb-6">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="quick">Quick Transfer</TabsTrigger>
                  <TabsTrigger value="new">New Recipient</TabsTrigger>
                </TabsList>
                <TabsContent value="quick">
                  <form onSubmit={handleTransfer} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="amount" className="text-sm font-medium text-purple-800 uppercase tracking-wide">Amount</Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400" size={20} />
                        <Input
                          id="amount"
                          type="number"
                          placeholder="0.00"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          className="pl-10 border-2 border-purple-200 focus:border-purple-500 focus:ring-purple-500 rounded-lg"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="recipient" className="text-sm font-medium text-purple-800 uppercase tracking-wide">Recipient</Label>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400" size={20} />
                        <Input
                          type="text"
                          placeholder="Search contacts..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10 border-2 border-purple-200 focus:border-purple-500 focus:ring-purple-500 rounded-lg mb-2"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        {filteredContacts.map((contact) => (
                          <Button
                            key={contact.id}
                            type="button"
                            variant="outline"
                            className={`flex items-center justify-start space-x-2 h-auto py-2 ${
                              recipient === contact.name ? 'bg-purple-100 border-purple-500' : 'bg-white'
                            }`}
                            onClick={() => setRecipient(contact.name)}
                          >
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={contact.avatar} alt={contact.name} />
                              <AvatarFallback>{contact.name[0]}</AvatarFallback>
                            </Avatar>
                            <div className="text-left">
                              <p className="text-sm font-medium">{contact.name}</p>
                              <p className="text-xs text-gray-500">{contact.accountNumber}</p>
                            </div>
                          </Button>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-purple-800 uppercase tracking-wide">Transfer Method</Label>
                      <div className="flex space-x-2">
                        {transferMethods.map((method) => (
                          <Button
                            key={method.id}
                            type="button"
                            variant="outline"
                            className={`flex-1 ${transferMethod === method.id ? 'bg-purple-100 border-purple-500' : 'bg-white'}`}
                            onClick={() => setTransferMethod(method.id)}
                          >
                            <method.icon className="w-5 h-5 mr-2" />
                            {method.name}
                          </Button>
                        ))}
                      </div>
                    </div>
                    <Button type="submit" size="lg" className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition-colors duration-200">
                      <ArrowRight className="w-5 h-5 mr-2" />
                      Send Money
                    </Button>
                  </form>
                </TabsContent>
                <TabsContent value="new">
                  <form onSubmit={handleTransfer} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="newRecipientName" className="text-sm font-medium text-purple-800 uppercase tracking-wide">Recipient Name</Label>
                      <Input id="newRecipientName" className="border-2 border-purple-200 focus:border-purple-500 focus:ring-purple-500 rounded-lg" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newRecipientAccount" className="text-sm font-medium text-purple-800 uppercase tracking-wide">Account Number</Label>
                      <Input id="newRecipientAccount" className="border-2 border-purple-200 focus:border-purple-500 focus:ring-purple-500 rounded-lg" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newAmount" className="text-sm font-medium text-purple-800 uppercase tracking-wide">Amount</Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400" size={20} />
                        <Input
                          id="newAmount"
                          type="number"
                          placeholder="0.00"
                          className="pl-10 border-2 border-purple-200 focus:border-purple-500 focus:ring-purple-500 rounded-lg"
                        />
                      </div>
                    </div>
                    <Button type="submit" size="lg" className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition-colors duration-200">
                      <ArrowRight className="w-5 h-5 mr-2" />
                      Send Money to New Recipient
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>
      {showToast && (
        <Toast
          variant={toastMessage.includes("successful") ? "success" : "error"}
          className="fixed bottom-4 right-4 w-auto"
        >
          {toastMessage}
        </Toast>
      )}
    </div>
  )
}