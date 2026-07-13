function ProductSkeleton() {
  return (
    <article className="product-skeleton">
      <div className="skeleton-image" aria-hidden="true" />
      <div className="skeleton-body">
        <div className="skeleton-line short" />
        <div className="skeleton-line medium" />
        <div className="skeleton-line" />
        <div className="skeleton-footer">
          <div className="skeleton-line tiny" />
          <div className="skeleton-line small" />
        </div>
      </div>
    </article>
  );
}

export default ProductSkeleton;
