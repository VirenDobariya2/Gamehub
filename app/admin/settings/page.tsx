"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AdminSidebar } from "@/components/admin-sidebar"
import { AdminHeader } from "@/components/admin-header"
import { AdminRouteGuard } from "@/components/admin-route-guard"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Save, Globe, Shield, Mail, Database, TrendingUp } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function AdminSettingsPage() {
  const { toast } = useToast()
  const [settings, setSettings] = useState({
    siteName: "GameHub",
    siteDescription: "Play thousands of free online games",
    siteUrl: "https://gamehub.com",
    adminEmail: "admin@gamehub.com",
    allowRegistration: true,
    requireEmailVerification: true,
    enableComments: true,
    enableRatings: true,
    maxFileSize: "10",
    allowedFileTypes: "jpg,png,gif,webp",
    smtpHost: "smtp.gmail.com",
    smtpPort: "587",
    smtpUser: "",
    smtpPassword: "",
    enableAnalytics: true,
    analyticsId: "",
  })

  const handleSave = (section) => {
    toast({
      title: "Settings saved",
      description: `${section} settings have been updated successfully.`,
    })
  }

  return (
    <AdminRouteGuard>
      <div className="flex min-h-screen bg-background">
        <AdminSidebar />
        <div className="flex-1">
          <AdminHeader />
          <main className="p-6">
            <div className="mb-8">
              <h1 className="text-3xl font-bold">Settings</h1>
              <p className="text-muted-foreground">Manage your platform configuration</p>
            </div>

            <Tabs defaultValue="general" className="space-y-6">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
                <TabsTrigger value="email">Email</TabsTrigger>
                <TabsTrigger value="uploads">Uploads</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              </TabsList>

              {/* General Settings */}
              <TabsContent value="general">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Globe className="h-5 w-5" />
                      General Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="siteName">Site Name</Label>
                        <Input
                          id="siteName"
                          value={settings.siteName}
                          onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="siteUrl">Site URL</Label>
                        <Input
                          id="siteUrl"
                          value={settings.siteUrl}
                          onChange={(e) => setSettings({ ...settings, siteUrl: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="siteDescription">Site Description</Label>
                      <Textarea
                        id="siteDescription"
                        value={settings.siteDescription}
                        onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
                        rows={3}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="adminEmail">Admin Email</Label>
                      <Input
                        id="adminEmail"
                        type="email"
                        value={settings.adminEmail}
                        onChange={(e) => setSettings({ ...settings, adminEmail: e.target.value })}
                      />
                    </div>
                    <Button onClick={() => handleSave("General")} className="w-full">
                      <Save className="mr-2 h-4 w-4" />
                      Save General Settings
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Security Settings */}
              <TabsContent value="security">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      Security Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Allow User Registration</Label>
                        <p className="text-sm text-muted-foreground">Allow new users to create accounts</p>
                      </div>
                      <Switch
                        checked={settings.allowRegistration}
                        onCheckedChange={(checked) => setSettings({ ...settings, allowRegistration: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Require Email Verification</Label>
                        <p className="text-sm text-muted-foreground">
                          Users must verify their email before accessing the platform
                        </p>
                      </div>
                      <Switch
                        checked={settings.requireEmailVerification}
                        onCheckedChange={(checked) => setSettings({ ...settings, requireEmailVerification: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Enable Comments</Label>
                        <p className="text-sm text-muted-foreground">Allow users to comment on games</p>
                      </div>
                      <Switch
                        checked={settings.enableComments}
                        onCheckedChange={(checked) => setSettings({ ...settings, enableComments: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Enable Ratings</Label>
                        <p className="text-sm text-muted-foreground">Allow users to rate games</p>
                      </div>
                      <Switch
                        checked={settings.enableRatings}
                        onCheckedChange={(checked) => setSettings({ ...settings, enableRatings: checked })}
                      />
                    </div>
                    <Button onClick={() => handleSave("Security")} className="w-full">
                      <Save className="mr-2 h-4 w-4" />
                      Save Security Settings
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Email Settings */}
              <TabsContent value="email">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Mail className="h-5 w-5" />
                      Email Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="smtpHost">SMTP Host</Label>
                        <Input
                          id="smtpHost"
                          value={settings.smtpHost}
                          onChange={(e) => setSettings({ ...settings, smtpHost: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="smtpPort">SMTP Port</Label>
                        <Input
                          id="smtpPort"
                          value={settings.smtpPort}
                          onChange={(e) => setSettings({ ...settings, smtpPort: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="smtpUser">SMTP Username</Label>
                      <Input
                        id="smtpUser"
                        value={settings.smtpUser}
                        onChange={(e) => setSettings({ ...settings, smtpUser: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="smtpPassword">SMTP Password</Label>
                      <Input
                        id="smtpPassword"
                        type="password"
                        value={settings.smtpPassword}
                        onChange={(e) => setSettings({ ...settings, smtpPassword: e.target.value })}
                      />
                    </div>
                    <Button onClick={() => handleSave("Email")} className="w-full">
                      <Save className="mr-2 h-4 w-4" />
                      Save Email Settings
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Upload Settings */}
              <TabsContent value="uploads">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Database className="h-5 w-5" />
                      Upload Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="maxFileSize">Maximum File Size (MB)</Label>
                      <Input
                        id="maxFileSize"
                        type="number"
                        value={settings.maxFileSize}
                        onChange={(e) => setSettings({ ...settings, maxFileSize: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="allowedFileTypes">Allowed File Types</Label>
                      <Input
                        id="allowedFileTypes"
                        value={settings.allowedFileTypes}
                        onChange={(e) => setSettings({ ...settings, allowedFileTypes: e.target.value })}
                        placeholder="jpg,png,gif,webp"
                      />
                      <p className="text-sm text-muted-foreground">Separate file extensions with commas</p>
                    </div>
                    <Button onClick={() => handleSave("Upload")} className="w-full">
                      <Save className="mr-2 h-4 w-4" />
                      Save Upload Settings
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Analytics Settings */}
              <TabsContent value="analytics">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      Analytics Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Enable Analytics</Label>
                        <p className="text-sm text-muted-foreground">Track user behavior and site performance</p>
                      </div>
                      <Switch
                        checked={settings.enableAnalytics}
                        onCheckedChange={(checked) => setSettings({ ...settings, enableAnalytics: checked })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="analyticsId">Google Analytics ID</Label>
                      <Input
                        id="analyticsId"
                        value={settings.analyticsId}
                        onChange={(e) => setSettings({ ...settings, analyticsId: e.target.value })}
                        placeholder="G-XXXXXXXXXX"
                      />
                    </div>
                    <Button onClick={() => handleSave("Analytics")} className="w-full">
                      <Save className="mr-2 h-4 w-4" />
                      Save Analytics Settings
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </AdminRouteGuard>
  )
}
