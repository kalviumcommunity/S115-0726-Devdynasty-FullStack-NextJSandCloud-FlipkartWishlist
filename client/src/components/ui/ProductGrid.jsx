function ProductGrid({ products, loading, error, children }) {
  if (loading) {
    return <div className="product-grid">{children}</div>;
  }

  if (error) {
    return <p className="empty-state">{error}</p>;
  }

  if (products.length === 0) {
    return <p className="empty-state">No products found.</p>;
  }

  return <div className="product-grid">{children}</div>;
}

export default ProductGrid;
