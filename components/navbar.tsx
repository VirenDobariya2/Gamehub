"use client";

import Link from "next/link";
import { Home, Search } from "lucide-react";

interface NavbarProps {
  onSearchClick: () => void;
}

export function Navbar({ onSearchClick }: NavbarProps) {
  return (
    <div className="w-[100px] h-[90px] bg-white rounded-[20px] shadow-lg overflow-hidden flex flex-col items-center">
      {/* Logo */}
      <div className="h-[50%] w-full flex items-center justify-center border-b">
        <Link href="/" className="flex items-center gap-1">
          <span className="text-lg font-bold text-gray-800">Game</span>
          
          <span className="text-lg font-bold text-orange-400">Hub</span>
        </Link>
      </div>

      {/* Icons */}
      <div className="h-[50%] w-full grid grid-cols-2 divide-x">
        <Link href="/" className="flex items-center justify-center hover:bg-blue-50 transition-colors">
          <div className="w-8 h-8 bg-blue-100 rounded-xl flex items-center justify-center">
            <Home className="h-4 w-4 text-blue-600" />
          </div>
        </Link>

        <button
          onClick={onSearchClick}
          className="flex items-center justify-center hover:bg-blue-50 transition-colors"
        >
          <div className="w-8 h-8 bg-blue-100 rounded-xl flex items-center justify-center">
            <Search className="h-4 w-4 text-blue-600" />
          </div>
        </button>
      </div>
    </div>
  );
}
