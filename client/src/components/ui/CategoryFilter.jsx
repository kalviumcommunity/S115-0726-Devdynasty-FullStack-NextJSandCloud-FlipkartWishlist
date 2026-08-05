"use client";

import React from "react";
import { Filter, X } from "lucide-react";

function CategoryFilter({
  categories = [],
  selectedCategory = "",
  onCategorySelect,
  onClear,
  categoryCounts = {},
  totalProductsCount = 0,
}) {
  return (
    <div className="category-filter">
      <div className="category-filter-header">
        <div className="flex items-center gap-2">
          <Filter size={16} className="text-blue-600" />
          <p className="section-label">Browse by Category</p>
        </div>
        <button
          type="button"
          className="clear-filter"
          onClick={() => onClear?.()}
          disabled={!selectedCategory}
        >
          {selectedCategory ? "Clear filter" : "All categories"}
        </button>
      </div>

      <div className="category-filter-buttons">
        <button
          type="button"
          className={`category-chip ${!selectedCategory ? "active" : ""}`}
          onClick={() => onClear?.()}
        >
          All
          {totalProductsCount > 0 && (
            <span className="category-chip-count">{totalProductsCount}</span>
          )}
        </button>

        {categories.map((cat) => {
          const count = categoryCounts[cat];
          return (
            <button
              key={cat}
              type="button"
              className={`category-chip ${selectedCategory === cat ? "active" : ""}`}
              onClick={() => onCategorySelect?.(cat)}
            >
              {cat}
              {count !== undefined && (
                <span className="category-chip-count">{count}</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default CategoryFilter;

