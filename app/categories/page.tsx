"use client"; 

import Link from "next/link";
import { useState } from "react";

import { MainNav } from "@/components/main-nav";
import { UserNav } from "@/components/user-nav";
import { SearchBar } from "@/components/search-bar";
import { CategoryCard } from "@/components/category-card";
import VantaBackground from "@/components/VantaBackground";

export default function CategoriesPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { title: "Action", image: "/placeholder.svg?height=200&width=350", href: "/categories/action" },
    { title: "Adventure", image: "/placeholder.svg?height=200&width=350", href: "/categories/adventure" },
    { title: "Puzzle", image: "/placeholder.svg?height=200&width=350", href: "/categories/puzzle" },
    { title: "Strategy", image: "/placeholder.svg?height=200&width=350", href: "/categories/strategy" },
    { title: "Sports", image: "/placeholder.svg?height=200&width=350", href: "/categories/sports" },
    { title: "Racing", image: "/placeholder.svg?height=200&width=350", href: "/categories/racing" },
    { title: "Multiplayer", image: "/placeholder.svg?height=200&width=350", href: "/categories/multiplayer" },
    { title: "Card", image: "/placeholder.svg?height=200&width=350", href: "/categories/card" },
    { title: "Board", image: "/placeholder.svg?height=200&width=350", href: "/categories/board" },
    { title: "Arcade", image: "/placeholder.svg?height=200&width=350", href: "/categories/arcade" },
    { title: "Shooter", image: "/placeholder.svg?height=200&width=350", href: "/categories/shooter" },
    { title: "RPG", image: "/placeholder.svg?height=200&width=350", href: "/categories/rpg" },
  ];

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden text-white">
      <VantaBackground />
      <header className="sticky top-0 z-40 border-b bg-white/20 backdrop-blur">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 font-bold">
              <span className="text-xl text-black">GameHub</span>
            </Link>
            <MainNav />
          </div>
          <div className="flex items-center gap-4">
            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <UserNav />
          </div>
        </div>
      </header>

      <main className="flex-1 relative z-10">
        <div className="container px-4 py-10">
          <h1 className="mb-8 text-4xl font-extrabold text-white drop-shadow-md text-center">Explore Game Categories</h1>

          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {categories.map((category) => (
              <CategoryCard key={category.title} {...category} />
            ))}
          </div>
        </div>
      </main>

      <footer className="border-t py-6 bg-white/10 backdrop-blur text-white relative z-10">
        <div className="container px-4 text-center text-sm">
          <p>© 2025 GameHub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
