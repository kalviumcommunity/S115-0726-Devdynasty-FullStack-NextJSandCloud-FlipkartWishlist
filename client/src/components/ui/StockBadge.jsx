export default function StockBadge({ stock }) {
  if (stock > 3) {
    return (
      <span className="badge in-stock">
        🟢 In Stock
        <style jsx>{`
          .in-stock {
            background-color: #e6f4ea;
            color: #1e8e3e;
            padding: 6px 10px;
            border-radius: 6px;
            font-size: 12px;
            font-weight: 700;
            display: inline-flex;
            align-items: center;
            gap: 6px;
          }
        `}</style>
      </span>
    );
  } else if (stock > 0) {
    return (
      <span className="badge low-stock">
        🟡 Low Stock: {stock}
        <style jsx>{`
          .low-stock {
            background-color: #fef7e0;
            color: #b06000;
            padding: 6px 10px;
            border-radius: 6px;
            font-size: 12px;
            font-weight: 700;
            display: inline-flex;
            align-items: center;
            gap: 6px;
          }
        `}</style>
      </span>
    );
  } else {
    return (
      <span className="badge out-of-stock">
        🔴 Out of Stock
        <style jsx>{`
          .out-of-stock {
            background-color: #fce8e6;
            color: #c5221f;
            padding: 6px 10px;
            border-radius: 6px;
            font-size: 12px;
            font-weight: 700;
            display: inline-flex;
            align-items: center;
            gap: 6px;
          }
        `}</style>
      </span>
    );
  }
}
