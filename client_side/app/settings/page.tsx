'use client'

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import EditProfile from "./editProfile"
import Security from "./security"
import Sidebar from "@/components/sidebar/sidebar"
import { Shield, User } from "lucide-react"

export default function Settings() {
  return (
    <div className="flex h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold text-purple-800 mb-8">Settings</h1>
          <Tabs defaultValue="edit-profile" className="space-y-8">
            <TabsList className="flex space-x-4 bg-transparent p-0">
              <TabsTrigger value="edit-profile" className="flex-1 bg-white rounded-lg shadow-md py-3 px-6 data-[state=active]:bg-purple-600 data-[state=active]:text-white transition-all duration-200">
                <User className="w-5 h-5 mr-2" />
                Edit Profile
              </TabsTrigger>
              <TabsTrigger value="security" className="flex-1 bg-white rounded-lg shadow-md py-3 px-6 data-[state=active]:bg-purple-600 data-[state=active]:text-white transition-all duration-200">
                <Shield className="w-5 h-5 mr-2" />
                Security
              </TabsTrigger>
            </TabsList>
            <EditProfile />
            <Security />
          </Tabs>
        </div>
      </main>
    </div>
  )
}