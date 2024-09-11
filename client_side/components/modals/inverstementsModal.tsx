import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DollarSign, TrendingUp, ArrowRight, BarChart2, Briefcase, Building, Bitcoin } from 'lucide-react'

type InvestmentOption = {
  id: string
  name: string
  type: string
  riskLevel: 'Low' | 'Medium' | 'High'
  potentialReturn: string
  icon: React.ReactNode
}

type InvestmentModalProps = {
  onInvest: (amount: number, investmentType: string) => Promise<void>
  currentBalance: number
}

export default function InvestmentModal({ onInvest, currentBalance }: InvestmentModalProps) {
  const [amount, setAmount] = useState('')
  const [investmentType, setInvestmentType] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [step, setStep] = useState(1)
  const [isOpen, setIsOpen] = useState(false)

  const investmentOptions: InvestmentOption[] = [
    { id: 'stocks', name: 'Stock Market Index Fund', type: 'Stocks', riskLevel: 'Medium', potentialReturn: '7-10% p.a.', icon: <BarChart2 className="w-6 h-6" /> },
    { id: 'bonds', name: 'Government Bonds', type: 'Bonds', riskLevel: 'Low', potentialReturn: '2-5% p.a.', icon: <Briefcase className="w-6 h-6" /> },
    { id: 'realestate', name: 'Real Estate Investment Trust', type: 'Real Estate', riskLevel: 'Medium', potentialReturn: '5-8% p.a.', icon: <Building className="w-6 h-6" /> },
    { id: 'crypto', name: 'Cryptocurrency Fund', type: 'Crypto', riskLevel: 'High', potentialReturn: '20%+ p.a.', icon: <Bitcoin className="w-6 h-6" /> },
  ]

  const resetModalState = () => {
    setAmount('')
    setInvestmentType('')
    setError('')
    setStep(1)
    setIsLoading(false)
  }

  const handleInvest = async () => {
    setError('')
    setIsLoading(true)

    if (!amount || !investmentType) {
      setError('Please enter an amount and select an investment type')
      setIsLoading(false)
      return
    }

    const investmentAmount = parseFloat(amount)
    if (isNaN(investmentAmount) || investmentAmount <= 0) {
      setError('Please enter a valid amount')
      setIsLoading(false)
      return
    }

    if (investmentAmount > currentBalance) {
      setError('Insufficient funds')
      setIsLoading(false)
      return
    }

    try {
      await onInvest(investmentAmount, investmentType)
      resetModalState()
      setIsOpen(false)
    } catch (error) {
      setError('Failed to process investment. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleNext = () => {
    if (step === 1 && amount && parseFloat(amount) > 0) {
      setStep(2)
    } else if (step === 2 && investmentType) {
      handleInvest()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      setIsOpen(open)
      if (!open) resetModalState()
    }}>
      <DialogTrigger asChild>
        <Button className="h-24 flex-col bg-white hover:bg-purple-600 text-black hover:text-white">
          <TrendingUp className="w-6 h-6 mb-2" />
          Invest
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-gray-800">Invest</DialogTitle>
          <DialogDescription className="text-center text-gray-600">
            {step === 1 ? "Enter the amount you want to invest" : "Choose an investment option"}
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
              <Label className="text-sm text-gray-500 mb-2 block">Investment Options</Label>
              <div className="grid grid-cols-1 gap-4">
                {investmentOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setInvestmentType(option.id)}
                    className={`flex items-center p-4 rounded-lg transition-colors ${
                      investmentType === option.id ? 'bg-purple-100 border-2 border-purple-500' : 'hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    <div className={`p-2 rounded-full mr-4 ${
                      option.riskLevel === 'Low' ? 'bg-green-100 text-green-600' :
                      option.riskLevel === 'Medium' ? 'bg-yellow-100 text-yellow-600' :
                      'bg-red-100 text-red-600'
                    }`}>
                      {option.icon}
                    </div>
                    <div className="flex-grow text-left">
                      <p className="font-medium text-gray-800">{option.name}</p>
                      <p className="text-xs text-gray-500">{option.type}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-800">{option.potentialReturn}</p>
                      <p className={`text-xs font-medium ${
                        option.riskLevel === 'Low' ? 'text-green-600' :
                        option.riskLevel === 'Medium' ? 'text-yellow-600' :
                        'text-red-600'
                      }`}>
                        {option.riskLevel} Risk
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        {error && <p className="text-sm text-red-500 mt-4 text-center">{error}</p>}
        <DialogFooter className="mt-6">
          <Button 
            type="submit" 
            onClick={handleNext} 
            disabled={isLoading || (step === 1 && !amount) || (step === 2 && !investmentType)}
            className="w-full bg-purple-700 hover:bg-purple-600 text-white"
          >
            {isLoading ? 'Processing...' : step === 1 ? 'Next' : 'Invest'}
            {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}