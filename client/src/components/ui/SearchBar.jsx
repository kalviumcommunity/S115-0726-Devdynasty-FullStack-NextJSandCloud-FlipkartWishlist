"use client";

import React from "react";
import { Search, X } from "lucide-react";

function SearchBar({ value, onChange }) {
  return (
    <div className="search-bar">
      <label className="visually-hidden" htmlFor="product-search">
        Search products
      </label>
      <div className="search-bar-wrapper">
        <Search size={18} className="search-icon" />
        <input
          id="product-search"
          type="text"
          className="search-bar-input"
          placeholder="Search products by title, category, or brand..."
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
        {value ? (
          <button
            type="button"
            className="search-clear-btn"
            onClick={() => onChange("")}
            aria-label="Clear search query"
            title="Clear search"
          >
            <X size={14} />
          </button>
        ) : (
          <span className="search-hint hidden sm:inline-block">⌘K</span>
        )}
      </div>
    </div>
  );
}

export default SearchBar;

