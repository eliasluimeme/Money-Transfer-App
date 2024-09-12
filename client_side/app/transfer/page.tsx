"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowRight, DollarSign } from "lucide-react"
import Sidebar from "@/components/sidebar/sidebar"

const recentContacts = [
  { id: 1, name: "Alice Johnson", avatar: "/avatar1.jpg" },
  { id: 2, name: "Bob Smith", avatar: "/avatar2.jpg" },
  { id: 3, name: "Carol Williams", avatar: "/avatar3.jpg" },
  { id: 4, name: "David Brown", avatar: "/avatar4.jpg" },
]

export default function TransferPage() {
  const [amount, setAmount] = useState("")
  const [recipient, setRecipient] = useState("")

  const handleTransfer = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Transfer:", { amount, recipient })
    // Here you would typically handle the transfer logic
  }

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
                  <Select onValueChange={setRecipient}>
                    <SelectTrigger className="border-2 border-purple-200 focus:border-purple-500 focus:ring-purple-500 rounded-lg">
                      <SelectValue placeholder="Select recipient" />
                    </SelectTrigger>
                    <SelectContent>
                      {recentContacts.map((contact) => (
                        <SelectItem key={contact.id} value={contact.name}>
                          <div className="flex items-center">
                            <Avatar className="h-6 w-6 mr-2">
                              <AvatarImage src={contact.avatar} alt={contact.name} />
                              <AvatarFallback>{contact.name[0]}</AvatarFallback>
                            </Avatar>
                            {contact.name}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button type="submit" size="lg" className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition-colors duration-200">
                  <ArrowRight className="w-5 h-5 mr-2" />
                  Send Money
                </Button>
              </form>
              
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-purple-800 mb-4">Recent Contacts</h3>
                <div className="flex space-x-4 overflow-x-auto pb-4">
                  {recentContacts.map((contact) => (
                    <Button
                      key={contact.id}
                      variant="outline"
                      className="flex flex-col items-center space-y-2 min-w-[80px] bg-purple-50 border-purple-200 hover:bg-purple-100"
                      onClick={() => setRecipient(contact.name)}
                    >
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={contact.avatar} alt={contact.name} />
                        <AvatarFallback>{contact.name[0]}</AvatarFallback>
                      </Avatar>
                      <span className="text-xs text-purple-800 font-medium">{contact.name.split(' ')[0]}</span>
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}