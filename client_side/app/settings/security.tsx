'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { TabsContent } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"

export default function Security() {
    const [twoFactor, setTwoFactor] = useState(false)

    const handlePasswordChange = (e: React.FormEvent) => {
      e.preventDefault()
      console.log("Changing password")
      // Here you would typically handle password change logic
    }

  return (
    <TabsContent value="security">
      <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
        <CardContent className="p-6 space-y-6">
          <div className="flex items-center justify-between bg-purple-50 p-4 rounded-lg">
            <div className="space-y-1">
              <h4 className="text-sm font-medium leading-none text-purple-800">Two-factor Authentication</h4>
              <p className="text-sm text-purple-600">Enable or disable two-factor authentication for your account.</p>
            </div>
            <Switch checked={twoFactor} onCheckedChange={setTwoFactor} className="data-[state=checked]:bg-purple-600" />
          </div>
          <Separator className="my-4 bg-purple-100" />
          <form onSubmit={handlePasswordChange} className="space-y-4">
            <h4 className="text-lg font-semibold text-purple-800">Change Password</h4>
            <div className="space-y-2">
              <Label htmlFor="currentPassword" className="text-sm font-medium text-purple-800">Current Password</Label>
              <Input id="currentPassword" type="password" className="border-purple-200 focus:border-purple-400 focus:ring-purple-400" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="newPassword" className="text-sm font-medium text-purple-800">New Password</Label>
              <Input id="newPassword" type="password" className="border-purple-200 focus:border-purple-400 focus:ring-purple-400" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-sm font-medium text-purple-800">Confirm New Password</Label>
              <Input id="confirmPassword" type="password" className="border-purple-200 focus:border-purple-400 focus:ring-purple-400" />
            </div>
            <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white">Change Password</Button>
          </form>
        </CardContent>
      </Card>
    </TabsContent>
  )
}