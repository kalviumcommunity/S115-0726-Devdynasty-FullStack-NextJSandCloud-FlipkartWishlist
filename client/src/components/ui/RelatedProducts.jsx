"use client";

import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import ProductSkeleton from "./ProductSkeleton";
import { get } from "@/services/api";
import { Sparkles } from "lucide-react";

function RelatedProducts({ currentProductId, category }) {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRelated() {
      try {
        setLoading(true);
        const data = await get("/api/products");
        if (Array.isArray(data)) {
          // Filter products in the same category excluding current product
          let matches = data.filter(
            (p) => String(p.id) !== String(currentProductId) && p.category === category
          );

          // If not enough matching category items, supplement with other products
          if (matches.length < 4) {
            const others = data.filter(
              (p) => String(p.id) !== String(currentProductId) && p.category !== category
            );
            matches = [...matches, ...others];
          }

          setRelatedProducts(matches.slice(0, 4));
        }
      } catch (err) {
        console.error("Failed to load related products", err);
      } finally {
        setLoading(false);
      }
    }

    if (currentProductId) {
      fetchRelated();
    }
  }, [currentProductId, category]);

  if (!loading && relatedProducts.length === 0) {
    return null;
  }

  return (
    <section className="related-products-section">
      <div className="section-heading">
        <div>
          <h2 className="flex items-center gap-2 text-xl sm:text-2xl font-extrabold text-slate-900">
            <Sparkles size={20} className="text-amber-500 fill-amber-400" />
            You May Also Like
          </h2>
          <p className="text-sm text-slate-500 mt-1">Recommended products based on this category.</p>
        </div>
      </div>

      {loading ? (
        <div className="product-grid">
          {Array.from({ length: 4 }).map((_, idx) => (
            <ProductSkeleton key={idx} />
          ))}
        </div>
      ) : (
        <div className="product-grid">
          {relatedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}

export default RelatedProducts;
