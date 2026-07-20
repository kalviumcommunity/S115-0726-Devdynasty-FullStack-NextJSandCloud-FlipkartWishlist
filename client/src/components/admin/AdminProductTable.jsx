import StockBadge from "@/components/ui/StockBadge";

function formatPrice(value) {
  const number = typeof value === "number" ? value : Number(value || 0);
  return `₹${number.toLocaleString("en-IN")}`;
}

function getProductImage(product) {
  return product.image || product.imageUrl || "https://via.placeholder.com/120?text=Product";
}

function getProductTitle(product) {
  return product.title || product.name || "Untitled product";
}

export default function AdminProductTable({ products }) {
  return (
    <div className="admin-table-container">
      <div className="table-scroll">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Category</th>
              <th>Price</th>
              <th>Current Stock</th>
              <th>Stock Status</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>
                  <div className="product-cell">
                    <img
                      src={getProductImage(product)}
                      alt={getProductTitle(product)}
                      className="product-thumb"
                    />
                    <div>
                      <p className="product-name">{getProductTitle(product)}</p>
                      <p className="product-subtitle">ID: {product.id}</p>
                    </div>
                  </div>
                </td>
                <td>{product.category || "General"}</td>
                <td>{formatPrice(product.price)}</td>
                <td>{product.stock ?? 0}</td>
                <td>
                  <div className="stock-status">
                    <StockBadge stock={product.stock ?? 0} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <style jsx>{`
        .admin-table-container {
          background: white;
          border: 1px solid var(--border);
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 24px 48px rgba(15, 23, 42, 0.08);
        }

        .table-scroll {
          overflow-x: auto;
        }

        .admin-table {
          width: 100%;
          border-collapse: collapse;
          min-width: 720px;
        }

        .admin-table th,
        .admin-table td {
          padding: 18px 20px;
          text-align: left;
          border-bottom: 1px solid var(--border);
        }

        .admin-table th {
          font-size: 14px;
          font-weight: 700;
          color: #475569;
          text-transform: uppercase;
          letter-spacing: 0.02em;
        }

        .admin-table tbody tr:hover {
          background: #f8fafc;
        }

        .product-cell {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .product-thumb {
          width: 64px;
          height: 64px;
          object-fit: cover;
          border-radius: 16px;
          border: 1px solid var(--border);
          background: #f8fafc;
        }

        .product-name {
          margin: 0 0 6px;
          font-size: 15px;
          font-weight: 700;
          color: var(--foreground);
        }

        .product-subtitle {
          margin: 0;
          color: #64748b;
          font-size: 13px;
        }

        .stock-status {
          display: flex;
          align-items: center;
        }

        @media (max-width: 768px) {
          .admin-table th,
          .admin-table td {
            padding: 14px 12px;
          }

          .product-thumb {
            width: 52px;
            height: 52px;
          }
        }
      `}</style>
    </div>
  );
}
