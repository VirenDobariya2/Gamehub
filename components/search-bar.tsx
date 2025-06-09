"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, X } from "lucide-react"

export function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isExpanded, setIsExpanded] = useState(false)
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  return (
    <div className="relative">
      {isExpanded ? (
        <form onSubmit={handleSearch} className="flex items-center">
          <Input
            type="search"
            placeholder="Search for games"
            className="w-[200px] md:w-[300px]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoFocus
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0"
            type="button"
            onClick={() => setIsExpanded(false)}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close search</span>
          </Button>
        </form>
      ) : (
        <Button variant="ghost" size="icon" onClick={() => setIsExpanded(true)}>
          <Search className="h-5 w-5" />
          <span className="sr-only">Search</span>
        </Button>
      )}
    </div>
  )
}
