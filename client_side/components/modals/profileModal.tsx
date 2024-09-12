"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { User, Settings, LogOut, CreditCard, Shield, HelpCircle } from "lucide-react"
import { useRouter } from "next/navigation"

interface ProfileModalProps {
  user: {
    username: string
    avatarUrl: string
  }
  onLogout: () => void
}

export default function ProfileModal({ user, onLogout }: ProfileModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  const handleNavigation = (path: string) => {
    console.log(`Navigating to: ${path}`)
    setIsOpen(false)
    router.push(path)
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.avatarUrl} alt={user.username} />
            <AvatarFallback>{user.username[0].toUpperCase()}</AvatarFallback>
          </Avatar>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[200px] sm:w-[300px]">
        {/* <SheetHeader>
          <SheetTitle className="text-left">Account</SheetTitle>
        </SheetHeader> */}
        <div className="py-4">
          <div className="flex items-center gap-4 mb-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={user.avatarUrl} alt={user.username} />
              <AvatarFallback>{user.username[0].toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-lg font-semibold">{user.username}</h3>
              <p className="text-sm text-muted-foreground">Personal Account</p>
            </div>
          </div>
          <Separator className="my-4" />
          <nav className="space-y-2">
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => handleNavigation('/profile')}
            >
              <User className="mr-2 h-4 w-4" />
              Profile
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => handleNavigation('/settings')}
            >
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => handleNavigation('/cards')}
            >
              <CreditCard className="mr-2 h-4 w-4" />
              Cards & Banks
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => handleNavigation('/security')}
            >
              <Shield className="mr-2 h-4 w-4" />
              Security
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => handleNavigation('/help')}
            >
              <HelpCircle className="mr-2 h-4 w-4" />
              Help & Support
            </Button>
          </nav>
        </div>
        <Separator className="my-4" />
        <Button
          variant="destructive"
          className="w-full"
          onClick={onLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Log Out
        </Button>
      </SheetContent>
    </Sheet>
  )
}