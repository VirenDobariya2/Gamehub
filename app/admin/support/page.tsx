"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AdminSidebar } from "@/components/admin-sidebar"
import { AdminHeader } from "@/components/admin-header"
import { AdminRouteGuard } from "@/components/admin-route-guard"
import { Search, MessageSquare, Clock, CheckCircle, AlertCircle, User } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AdminSupportPage() {
  const [searchQuery, setSearchQuery] = useState("")

  // Mock data - in real app, fetch from API
  const tickets = [
    {
      id: "T001",
      subject: "Game not loading properly",
      user: "John Doe",
      email: "john@example.com",
      status: "open",
      priority: "high",
      category: "technical",
      created: "2024-03-15 10:30",
      lastReply: "2024-03-15 14:20",
      messages: 3,
    },
    {
      id: "T002",
      subject: "Account verification issue",
      user: "Sarah Wilson",
      email: "sarah@example.com",
      status: "pending",
      priority: "medium",
      category: "account",
      created: "2024-03-14 16:45",
      lastReply: "2024-03-15 09:15",
      messages: 5,
    },
    {
      id: "T003",
      subject: "Feature request: Dark mode",
      user: "Mike Johnson",
      email: "mike@example.com",
      status: "closed",
      priority: "low",
      category: "feature",
      created: "2024-03-13 11:20",
      lastReply: "2024-03-14 15:30",
      messages: 2,
    },
    {
      id: "T004",
      subject: "Payment processing error",
      user: "Emily Chen",
      email: "emily@example.com",
      status: "open",
      priority: "high",
      category: "billing",
      created: "2024-03-15 08:15",
      lastReply: "2024-03-15 12:45",
      messages: 4,
    },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case "open":
        return "bg-red-600"
      case "pending":
        return "bg-yellow-600"
      case "closed":
        return "bg-green-600"
      default:
        return "bg-gray-600"
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-600"
      case "medium":
        return "bg-yellow-600"
      case "low":
        return "bg-green-600"
      default:
        return "bg-gray-600"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "open":
        return <AlertCircle className="h-4 w-4" />
      case "pending":
        return <Clock className="h-4 w-4" />
      case "closed":
        return <CheckCircle className="h-4 w-4" />
      default:
        return <MessageSquare className="h-4 w-4" />
    }
  }

  const filteredTickets = tickets.filter(
    (ticket) =>
      ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.id.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const openTickets = filteredTickets.filter((t) => t.status === "open")
  const pendingTickets = filteredTickets.filter((t) => t.status === "pending")
  const closedTickets = filteredTickets.filter((t) => t.status === "closed")

  return (
    <AdminRouteGuard>
      <div className="flex min-h-screen bg-background">
        <AdminSidebar />
        <div className="flex-1">
          <AdminHeader />
          <main className="p-6">
            <div className="mb-8">
              <h1 className="text-3xl font-bold">Support Center</h1>
              <p className="text-muted-foreground">Manage user support tickets and inquiries</p>
            </div>

            {/* Support Stats */}
            <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-red-500" />
                    <div>
                      <div className="text-2xl font-bold">{openTickets.length}</div>
                      <div className="text-sm text-muted-foreground">Open Tickets</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-yellow-500" />
                    <div>
                      <div className="text-2xl font-bold">{pendingTickets.length}</div>
                      <div className="text-sm text-muted-foreground">Pending</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <div>
                      <div className="text-2xl font-bold">{closedTickets.length}</div>
                      <div className="text-sm text-muted-foreground">Resolved</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-blue-500" />
                    <div>
                      <div className="text-2xl font-bold">{tickets.length}</div>
                      <div className="text-sm text-muted-foreground">Total Tickets</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Search */}
            <Card className="mb-6">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Search tickets by ID, subject, or user..."
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Button variant="outline">Filter</Button>
                  <Button>New Ticket</Button>
                </div>
              </CardContent>
            </Card>

            {/* Tickets */}
            <Tabs defaultValue="all" className="space-y-6">
              <TabsList>
                <TabsTrigger value="all">All Tickets ({filteredTickets.length})</TabsTrigger>
                <TabsTrigger value="open">Open ({openTickets.length})</TabsTrigger>
                <TabsTrigger value="pending">Pending ({pendingTickets.length})</TabsTrigger>
                <TabsTrigger value="closed">Closed ({closedTickets.length})</TabsTrigger>
              </TabsList>

              <TabsContent value="all">
                <Card>
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="px-6 py-4 text-left text-sm font-medium">Ticket</th>
                            <th className="px-6 py-4 text-left text-sm font-medium">User</th>
                            <th className="px-6 py-4 text-left text-sm font-medium">Status</th>
                            <th className="px-6 py-4 text-left text-sm font-medium">Priority</th>
                            <th className="px-6 py-4 text-left text-sm font-medium">Last Reply</th>
                            <th className="px-6 py-4 text-center text-sm font-medium">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredTickets.map((ticket) => (
                            <tr key={ticket.id} className="border-b last:border-b-0 hover:bg-muted/50">
                              <td className="px-6 py-4">
                                <div>
                                  <div className="flex items-center gap-2">
                                    <span className="font-medium">#{ticket.id}</span>
                                    <Badge variant="outline">{ticket.category}</Badge>
                                  </div>
                                  <div className="font-medium">{ticket.subject}</div>
                                  <div className="text-sm text-muted-foreground">
                                    {ticket.messages} messages • Created {ticket.created}
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-2">
                                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm">
                                    <User className="h-4 w-4" />
                                  </div>
                                  <div>
                                    <div className="font-medium">{ticket.user}</div>
                                    <div className="text-sm text-muted-foreground">{ticket.email}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <Badge className={getStatusColor(ticket.status)}>
                                  {getStatusIcon(ticket.status)}
                                  <span className="ml-1">
                                    {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                                  </span>
                                </Badge>
                              </td>
                              <td className="px-6 py-4">
                                <Badge className={getPriorityColor(ticket.priority)}>
                                  {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)}
                                </Badge>
                              </td>
                              <td className="px-6 py-4 text-sm">{ticket.lastReply}</td>
                              <td className="px-6 py-4 text-center">
                                <Button variant="ghost" size="sm">
                                  View
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="open">
                <Card>
                  <CardHeader>
                    <CardTitle>Open Tickets</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {openTickets.map((ticket) => (
                        <div key={ticket.id} className="flex items-center justify-between rounded-lg border p-4">
                          <div>
                            <div className="font-medium">
                              #{ticket.id} - {ticket.subject}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {ticket.user} • {ticket.created}
                            </div>
                          </div>
                          <Button size="sm">Reply</Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="pending">
                <Card>
                  <CardHeader>
                    <CardTitle>Pending Tickets</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {pendingTickets.map((ticket) => (
                        <div key={ticket.id} className="flex items-center justify-between rounded-lg border p-4">
                          <div>
                            <div className="font-medium">
                              #{ticket.id} - {ticket.subject}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {ticket.user} • {ticket.created}
                            </div>
                          </div>
                          <Button size="sm">Follow Up</Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="closed">
                <Card>
                  <CardHeader>
                    <CardTitle>Closed Tickets</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {closedTickets.map((ticket) => (
                        <div
                          key={ticket.id}
                          className="flex items-center justify-between rounded-lg border p-4 opacity-75"
                        >
                          <div>
                            <div className="font-medium">
                              #{ticket.id} - {ticket.subject}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {ticket.user} • {ticket.created}
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                        </div>
                      ))}
                    </div>
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
