'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { TabsContent } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Key } from "lucide-react"

export default function Security() {
    const [twoFactor, setTwoFactor] = useState(false)

    const handlePasswordChange = (e: React.FormEvent) => {
      e.preventDefault()
      console.log("Changing password")
      // Here you would typically handle password change logic
    }

  return (
    <TabsContent value="security">
      <Card className="bg-white shadow-xl rounded-2xl overflow-hidden border-t-4 border-purple-500">
        <CardContent className="p-8 space-y-8">
          <div className="flex items-center justify-between bg-purple-50 p-6 rounded-xl">
            <div className="space-y-2">
              <h4 className="text-lg font-semibold text-purple-800">Two-factor Authentication</h4>
              <p className="text-sm text-purple-600">Add an extra layer of security to your account</p>
            </div>
            <Switch
              checked={twoFactor}
              onCheckedChange={setTwoFactor}
              className="data-[state=checked]:bg-purple-600"
            />
          </div>
          <Separator className="my-6 bg-purple-100" />
          <form onSubmit={handlePasswordChange} className="space-y-6">
            <h4 className="text-2xl font-semibold text-purple-800">Change Password</h4>
            {["Current Password", "New Password", "Confirm New Password"].map((label) => (
              <div key={label} className="space-y-2">
                <Label htmlFor={label.toLowerCase().replace(/\s/g, '')} className="text-sm font-medium text-purple-800 uppercase tracking-wide">
                  {label}
                </Label>
                <div className="relative">
                  <Input
                    id={label.toLowerCase().replace(/\s/g, '')}
                    type="password"
                    className="border-2 border-purple-200 focus:border-purple-500 focus:ring-purple-500 rounded-lg pr-10"
                  />
                  <Key className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-400" size={20} />
                </div>
              </div>
            ))}
            <Button type="submit" size="lg" className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition-colors duration-200">
              Update Password
            </Button>
          </form>
        </CardContent>
      </Card>
    </TabsContent>
  )
}