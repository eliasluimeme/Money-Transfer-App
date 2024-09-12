'use client'

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { TabsContent } from "@/components/ui/tabs"
import { Camera } from "lucide-react"

export default function EditProfile() {
    const [user, setUser] = useState({
        name: "Charlene Reed",
        username: "charlene_reed",
        email: "user@gmail.com",
        dateOfBirth: "1990-01-25",
        presentAddress: "San Jose, California, USA",
        permanentAddress: "San Jose, California, USA",
        city: "San Jose",
        postalCode: "45962",
        country: "USA",
      })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault()
        console.log("Saving user data:", user)
        // Here you would typically send the data to your backend
    }

    return (
        <TabsContent value="edit-profile">
          <Card className="bg-white shadow-xl rounded-2xl overflow-hidden border-t-4 border-purple-500">
            <CardContent className="p-8">
              <form onSubmit={handleSave} className="space-y-8">
                <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
                  <Avatar className="w-32 h-32 border-4 border-purple-200 rounded-full">
                    <AvatarImage src="/placeholder-avatar.jpg" alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <Button type="button" variant="outline" size="lg" className="bg-purple-50 hover:bg-purple-100 text-purple-700 border-purple-300">
                    <Camera className="mr-2 h-5 w-5" />
                    Change Avatar
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {Object.entries(user).map(([key, value]) => (
                    <div key={key} className="space-y-2">
                      <Label htmlFor={key} className="text-sm font-medium text-purple-800 uppercase tracking-wide">
                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      </Label>
                      <Input
                        id={key}
                        name={key}
                        value={value}
                        onChange={handleInputChange}
                        className="border-2 border-purple-200 focus:border-purple-500 focus:ring-purple-500 rounded-lg"
                      />
                    </div>
                  ))}
                </div>
                <Button type="submit" size="lg" className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition-colors duration-200">
                  Save Changes
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
    )
}