"use client";

import { useEffect, useState, use } from "react";
import { get } from "../../../services/api";
import Navbar from "../../../components/layout/Navbar";

export default function ProductDetails({ params }) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadProduct() {
      try {
        const data = await get(`/api/products/${id}`);
        setProduct(data);
      } catch (error) {
        setError(error.message || "Unable to fetch product details.");
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [id]);

  if (loading) {
    return (
      <div>
        <Navbar />
        <p>Loading product...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Navbar />
        <p>{error}</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div>
        <Navbar />
        <p>Product not found.</p>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <main className="product-details-page" style={{ padding: '20px' }}>
        <div className="product-details-card">
          <img src={product.image || product.imageUrl} alt={product.title || product.name} style={{ maxWidth: '300px' }} />
          <div className="product-details-info">
            <h1>{product.title || product.name}</h1>
            <p>{product.description}</p>
            <p className="price">₹{product.price}</p>
          </div>
        </div>
      </main>
    </div>
  );
}
