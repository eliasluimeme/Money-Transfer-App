'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Send, DollarSign, User, ArrowRight } from 'lucide-react'

type User = {
  id: number
  username: string
  email: string
}

type SendMoneyModalProps = {
  onSendMoney: (amount: number, recipientId: number) => Promise<void>
  currentBalance: number
}

export default function SendMoneyModal({ onSendMoney, currentBalance }: SendMoneyModalProps) {
  const [amount, setAmount] = useState('')
  const [recipient, setRecipient] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [step, setStep] = useState(1)

  // Mock recent recipients (replace with actual data in a real app)
  const recentRecipients: User[] = [
    { id: 1, username: 'Alice', email: 'alice@example.com' },
    { id: 2, username: 'Bob', email: 'bob@example.com' },
    { id: 3, username: 'Charlie', email: 'charlie@example.com' },
  ]

  const handleSendMoney = async () => {
    setError('')
    setIsLoading(true)

    if (!amount || !recipient) {
      setError('Please enter an amount and recipient')
      setIsLoading(false)
      return
    }

    const amountNum = parseFloat(amount)
    if (isNaN(amountNum) || amountNum <= 0) {
      setError('Please enter a valid amount')
      setIsLoading(false)
      return
    }

    if (amountNum > currentBalance) {
      setError('Insufficient funds')
      setIsLoading(false)
      return
    }

    const recipientId = parseInt(recipient)
    if (isNaN(recipientId)) {
      setError('Invalid recipient')
      setIsLoading(false)
      return
    }

    try {
      await onSendMoney(amountNum, recipientId)
      setAmount('')
      setRecipient('')
      setStep(1)
      // Close the modal here if you have a way to control its open state
    } catch (error) {
      setError('Failed to send money. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleNext = () => {
    if (step === 1 && amount && parseFloat(amount) > 0) {
      setStep(2)
    } else if (step === 2 && recipient) {
      handleSendMoney()
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full h-24 flex-col bg-purple-600 hover:bg-purple-700">
          <Send className="w-6 h-6 mb-2" />
          Send Money
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">Send Money</DialogTitle>
          <DialogDescription className="text-center">
            {step === 1 ? "Enter the amount you want to send" : "Choose a recipient"}
          </DialogDescription>
        </DialogHeader>
        <div className="mt-6">
          {step === 1 && (
            <div className="space-y-4">
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  id="amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="pl-10 text-2xl font-bold text-center"
                  placeholder="0.00"
                />
              </div>
              <p className="text-sm text-gray-500 text-center">
                Available balance: ${currentBalance.toFixed(2)}
              </p>
            </div>
          )}
          {step === 2 && (
            <div className="space-y-4">
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  id="recipient"
                  type="text"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  className="pl-10"
                  placeholder="Recipient ID or username"
                />
              </div>
              <div>
                <Label className="text-sm text-gray-500 mb-2 block">Recent Recipients</Label>
                <div className="grid grid-cols-3 gap-4">
                  {recentRecipients.map((user) => (
                    <button
                      key={user.id}
                      onClick={() => setRecipient(user.id.toString())}
                      className="flex flex-col items-center space-y-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${user.username}`} alt={user.username} />
                        <AvatarFallback>{user.username[0].toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <span className="text-xs font-medium text-center">{user.username}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
        {error && <p className="text-sm text-red-500 mt-4 text-center">{error}</p>}
        <DialogFooter className="mt-6">
          <Button 
            type="submit" 
            onClick={handleNext} 
            disabled={isLoading || (step === 1 && !amount) || (step === 2 && !recipient)}
            className="w-full"
          >
            {isLoading ? 'Processing...' : step === 1 ? 'Next' : 'Send Money'}
            {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}