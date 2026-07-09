export default function StockBadge({ stock }) {
  if (stock > 10) {
    return (
      <span className="badge in-stock">
        In Stock
        <style jsx>{`
          .in-stock {
            background-color: #e6f4ea;
            color: #1e8e3e;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 12px;
            font-weight: bold;
          }
        `}</style>
      </span>
    );
  } else if (stock > 0) {
    return (
      <span className="badge low-stock">
        Only {stock} left
        <style jsx>{`
          .low-stock {
            background-color: #fef7e0;
            color: #b06000;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 12px;
            font-weight: bold;
          }
        `}</style>
      </span>
    );
  } else {
    return (
      <span className="badge out-of-stock">
        Out of Stock
        <style jsx>{`
          .out-of-stock {
            background-color: #fce8e6;
            color: #c5221f;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 12px;
            font-weight: bold;
          }
        `}</style>
      </span>
    );
  }
}
