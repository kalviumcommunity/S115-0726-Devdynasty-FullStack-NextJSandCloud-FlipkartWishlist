"use client";

import React from "react";
import { PackageSearch, RotateCcw } from "lucide-react";

function ProductGrid({ products, loading, error, onResetFilters, children }) {
  if (loading) {
    return <div className="product-grid">{children}</div>;
  }

  if (error) {
    return (
      <div className="empty-state-card">
        <div className="empty-state-icon">
          <PackageSearch size={32} />
        </div>
        <h3>Unable to load products</h3>
        <p>{error}</p>
        {onResetFilters && (
          <button type="button" className="empty-state-action flex items-center gap-2" onClick={onResetFilters}>
            <RotateCcw size={16} /> Try Again
          </button>
        )}
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="empty-state-card">
        <div className="empty-state-icon">
          <PackageSearch size={32} />
        </div>
        <h3>No matching products found</h3>
        <p>We couldn't find any products matching your search term or category filters.</p>
        {onResetFilters && (
          <button type="button" className="empty-state-action inline-flex items-center gap-2" onClick={onResetFilters}>
            <RotateCcw size={16} /> Reset All Filters
          </button>
        )}
      </div>
    );
  }

  return <div className="product-grid">{children}</div>;
}

export default ProductGrid;

