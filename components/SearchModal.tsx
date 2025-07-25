"use client";

import { X } from "lucide-react";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  searchQuery: string;
  setSearchQuery: (value: string) => void;
}

export function SearchModal({ isOpen, onClose, searchQuery, setSearchQuery }: SearchModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/30"
      onClick={onClose}
    >
      <div
        className="absolute left-0 top-0 h-full w-[600px] bg-white p-6 shadow-2xl rounded-r-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Search Games</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition"
          >
            <X className="h-6 w-6 text-gray-500" />
          </button>
        </div>

        <input
          type="text"
          placeholder="Search games..."
          className="w-full border border-blue-200 rounded-xl p-3 focus:border-blue-400 focus:outline-none text-black"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          autoFocus
        />
      </div>
    </div>
  );
}
