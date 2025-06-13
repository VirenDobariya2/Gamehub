"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
}

export function SearchBar({ searchQuery, setSearchQuery }: SearchBarProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="relative">
      {isExpanded ? (
        <div className="flex items-center">
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
            onClick={() => {
              setIsExpanded(false);
              setSearchQuery("");
            }}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close search</span>
          </Button>
        </div>
      ) : (
        <Button variant="ghost" size="icon" onClick={() => setIsExpanded(true)}>
          <Search className="h-5 w-5" />
          <span className="sr-only">Search</span>
        </Button>
      )}
    </div>
  );
}
