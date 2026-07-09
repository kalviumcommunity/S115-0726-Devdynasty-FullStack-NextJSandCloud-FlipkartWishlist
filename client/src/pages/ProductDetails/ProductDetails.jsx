import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { get } from "../../services/api";

function ProductDetails() {
  const { id } = useParams();
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
    return <p>Loading product...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!product) {
    return <p>Product not found.</p>;
  }

  return (
    <main className="product-details-page">
      <div className="product-details-card">
        <img src={product.imageUrl} alt={product.name} />
        <div className="product-details-info">
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <p className="price">₹{product.price.toFixed(2)}</p>
        </div>
      </div>
    </main>
  );
}

export default ProductDetails;
