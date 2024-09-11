'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { PlusCircle, DollarSign, CreditCard, Building, ArrowRight } from 'lucide-react'

type AddMoneyModalProps = {
  onAddMoney: (amount: number, method: string) => Promise<void>
  currentBalance: number
}

export default function AddMoneyModal({ onAddMoney, currentBalance }: AddMoneyModalProps) {
  const [amount, setAmount] = useState('')
  const [method, setMethod] = useState('card')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [step, setStep] = useState(1)

  const handleAddMoney = async () => {
    setError('')
    setIsLoading(true)

    if (!amount) {
      setError('Please enter an amount')
      setIsLoading(false)
      return
    }

    const amountNum = parseFloat(amount)
    if (isNaN(amountNum) || amountNum <= 0) {
      setError('Please enter a valid amount')
      setIsLoading(false)
      return
    }

    try {
      await onAddMoney(amountNum, method)
      setAmount('')
      setMethod('card')
      setStep(1)
      // Close the modal here if you have a way to control its open state
    } catch (error) {
      setError('Failed to add money. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleNext = () => {
    if (step === 1 && amount && parseFloat(amount) > 0) {
      setStep(2)
    } else if (step === 2) {
      handleAddMoney()
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="h-24 flex-col bg-purple-700 hover:bg-purple-600 text-white" variant="outline">
          <PlusCircle className="w-6 h-6 mb-2" />
          Add Money
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">Add Money</DialogTitle>
          <DialogDescription className="text-center">
            {step === 1 ? "Enter the amount you want to add" : "Choose a payment method"}
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
                Current balance: ${currentBalance.toFixed(2)}
              </p>
            </div>
          )}
          {step === 2 && (
            <div className="space-y-4">
              <RadioGroup value={method} onValueChange={setMethod}>
                <div className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors">
                  <RadioGroupItem value="card" id="card" />
                  <Label htmlFor="card" className="flex items-center cursor-pointer">
                    <CreditCard className="w-5 h-5 mr-2 text-purple-600" />
                    Credit/Debit Card
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors">
                  <RadioGroupItem value="building" id="building" />
                  <Label htmlFor="building" className="flex items-center cursor-pointer">
                    <Building className="w-5 h-5 mr-2 text-purple-600" />
                    Bank Transfer
                  </Label>
                </div>
              </RadioGroup>
            </div>
          )}
        </div>
        {error && <p className="text-sm text-red-500 mt-4 text-center">{error}</p>}
        <DialogFooter className="mt-6">
          <Button 
            type="submit" 
            onClick={handleNext} 
            disabled={isLoading || (step === 1 && !amount)}
            className="w-full"
          >
            {isLoading ? 'Processing...' : step === 1 ? 'Next' : 'Add Money'}
            {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}