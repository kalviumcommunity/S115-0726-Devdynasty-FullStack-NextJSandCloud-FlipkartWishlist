function ProductSkeleton() {
  return (
    <article className="product-skeleton" aria-busy="true" aria-label="Loading product">
      <div className="skeleton-image" aria-hidden="true" />
      <div className="skeleton-body">
        <div className="skeleton-line short" />
        <div className="skeleton-line medium" />
        <div className="skeleton-line" />
        <div className="skeleton-line small" />
        <div className="skeleton-footer">
          <div className="skeleton-button" />
          <div className="flex gap-2">
            <div className="skeleton-circle" />
            <div className="skeleton-circle" />
          </div>
        </div>
      </div>
    </article>
  );
}

export default ProductSkeleton;

