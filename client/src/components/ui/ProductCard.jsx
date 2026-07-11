import Link from "next/link";
import StockBadge from "./StockBadge";

function ProductCard({ product }) {
  const title = product.title || product.name || "Untitled product";
  const imageUrl = product.image || product.imageUrl || "https://via.placeholder.com/320x220?text=Flipkart";
  const price = typeof product.price === "number" ? product.price : Number(product.price || 0);

  return (
    <article className="product-card">
      <img
        src={imageUrl}
        alt={title}
        className="product-card-image"
        style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px' }}
      />
      <div className="product-card-body" style={{ padding: '12px 0 0 0' }}>
        <div className="product-card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '700' }}>{title}</h3>
          <span className="product-card-category" style={{ fontSize: '12px', background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px' }}>
            {product.category || "General"}
          </span>
        </div>

        <p className="product-card-description" style={{ fontSize: '13px', color: '#64748b', margin: '0 0 12px 0', minHeight: '36px' }}>
          {product.description || "High-quality product ready to ship."}
        </p>

        <div className="product-card-meta" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <p className="price" style={{ margin: 0, fontSize: '18px', fontWeight: '800', color: 'var(--primary)' }}>₹{price.toFixed(2)}</p>
          <StockBadge stock={product.stock ?? 0} />
        </div>

        <div className="product-card-actions" style={{ display: 'flex', gap: '10px' }}>
          <Link href={`/product/${product.id}`} className="details-link" style={{ flexGrow: 1, textAlign: 'center', background: '#e2e8f0', color: '#0f172a', padding: '8px', borderRadius: '6px', fontSize: '14px', textDecoration: 'none', fontWeight: '600' }}>
            View details
          </Link>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
