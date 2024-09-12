'use client'

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import EditProfile from "./editProfile"
import Security from "./security"
import Sidebar from "@/components/sidebar/sidebar"

export default function Settings() {
  return (
    <div className="flex h-screen bg-gradient-to-br from-purple-100 to-white">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-purple-800 mb-6">Settings</h1>
          <Tabs defaultValue="edit-profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 bg-purple-100 p-1 rounded-lg">
              <TabsTrigger value="edit-profile" className="rounded-md py-2 data-[state=active]:bg-white data-[state=active]:text-purple-800">
                Edit Profile
              </TabsTrigger>
              <TabsTrigger value="security" className="rounded-md py-2 data-[state=active]:bg-white data-[state=active]:text-purple-800">
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