export default function StockBadge({ stock }) {
  if (stock > 3) {
    return (
      <span className="badge in-stock">
        <span className="pulse-dot-container" aria-hidden="true">
          <span className="pulse-ring green"></span>
          <span className="pulse-dot green"></span>
        </span>
        In Stock
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
            gap: 8px;
          }
          .pulse-dot-container {
            position: relative;
            width: 10px;
            height: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .pulse-dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background-color: #1e8e3e;
            position: absolute;
          }
          .pulse-ring {
            position: absolute;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background-color: #1e8e3e;
            opacity: 0.75;
            animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
          }
          @keyframes ping {
            75%, 100% {
              transform: scale(2.2);
              opacity: 0;
            }
          }
        `}</style>
      </span>
    );
  } else if (stock > 0) {
    return (
      <span className="badge low-stock">
        <span className="pulse-dot-container" aria-hidden="true">
          <span className="pulse-ring orange"></span>
          <span className="pulse-dot orange"></span>
        </span>
        Low Stock
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
            gap: 8px;
          }
          .pulse-dot-container {
            position: relative;
            width: 10px;
            height: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .pulse-dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background-color: #e37400;
            position: absolute;
          }
          .pulse-ring {
            position: absolute;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background-color: #e37400;
            opacity: 0.8;
            animation: ping-fast 1s cubic-bezier(0, 0, 0.2, 1) infinite;
          }
          @keyframes ping-fast {
            75%, 100% {
              transform: scale(2.5);
              opacity: 0;
            }
          }
        `}</style>
      </span>
    );
  } else {
    return (
      <span className="badge out-of-stock">
        <span className="pulse-dot-container" aria-hidden="true">
          <span className="pulse-ring red"></span>
          <span className="pulse-dot red"></span>
        </span>
        Out of Stock
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
            gap: 8px;
          }
          .pulse-dot-container {
            position: relative;
            width: 10px;
            height: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .pulse-dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background-color: #d93025;
            position: absolute;
          }
          .pulse-ring {
            position: absolute;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background-color: #d93025;
            opacity: 0.7;
            animation: pulse-slow 2s ease-in-out infinite;
          }
          @keyframes pulse-slow {
            0%, 100% {
              transform: scale(1);
              opacity: 0.7;
            }
            50% {
              transform: scale(1.8);
              opacity: 0.2;
            }
          }
        `}</style>
      </span>
    );
  }
}

