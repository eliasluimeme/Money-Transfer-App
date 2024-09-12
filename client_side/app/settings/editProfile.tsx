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
              <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
                <CardContent className="p-6">
                  <form onSubmit={handleSave} className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <Avatar className="w-24 h-24 border-4 border-purple-200">
                        <AvatarImage src="/placeholder-avatar.jpg" alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <Button type="button" variant="outline" size="sm" className="bg-purple-50 hover:bg-purple-100">
                        <Camera className="mr-2 h-4 w-4" />
                        Change Avatar
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-sm font-medium text-purple-800">Your Name</Label>
                        <Input id="name" name="name" value={user.name} onChange={handleInputChange} className="border-purple-200 focus:border-purple-400 focus:ring-purple-400" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="username" className="text-sm font-medium text-purple-800">User Name</Label>
                        <Input id="username" name="username" value={user.username} onChange={handleInputChange} className="border-purple-200 focus:border-purple-400 focus:ring-purple-400" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium text-purple-800">Email</Label>
                        <Input id="email" name="email" type="email" value={user.email} onChange={handleInputChange} className="border-purple-200 focus:border-purple-400 focus:ring-purple-400" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="dateOfBirth" className="text-sm font-medium text-purple-800">Date of Birth</Label>
                        <Input id="dateOfBirth" name="dateOfBirth" type="date" value={user.dateOfBirth} onChange={handleInputChange} className="border-purple-200 focus:border-purple-400 focus:ring-purple-400" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="presentAddress" className="text-sm font-medium text-purple-800">Present Address</Label>
                        <Input id="presentAddress" name="presentAddress" value={user.presentAddress} onChange={handleInputChange} className="border-purple-200 focus:border-purple-400 focus:ring-purple-400" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="permanentAddress" className="text-sm font-medium text-purple-800">Permanent Address</Label>
                        <Input id="permanentAddress" name="permanentAddress" value={user.permanentAddress} onChange={handleInputChange} className="border-purple-200 focus:border-purple-400 focus:ring-purple-400" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="city" className="text-sm font-medium text-purple-800">City</Label>
                        <Input id="city" name="city" value={user.city} onChange={handleInputChange} className="border-purple-200 focus:border-purple-400 focus:ring-purple-400" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="postalCode" className="text-sm font-medium text-purple-800">Postal Code</Label>
                        <Input id="postalCode" name="postalCode" value={user.postalCode} onChange={handleInputChange} className="border-purple-200 focus:border-purple-400 focus:ring-purple-400" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="country" className="text-sm font-medium text-purple-800">Country</Label>
                        <Input id="country" name="country" value={user.country} onChange={handleInputChange} className="border-purple-200 focus:border-purple-400 focus:ring-purple-400" />
                      </div>
                    </div>
                    <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white">Save Changes</Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
    )
}