import { useLocation, useNavigate, Link } from "react-router";
import "./OrderConfirmation.css";

export default function OrderConfirmation() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const order = state?.order || {
    items: [],
    total: 0,
    createdAt: new Date().toISOString(),
  };

  const createdAt = new Date(order.createdAt).toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

  const totalProducts = order.items.reduce(
    (acc, item) => acc + Number(item.quantity),
    0
  );

  return (
    <div className="confirmation-page">
      <header className="confirmation-header">
        <div className="confirmation-icon">✓</div>
        <h2>Order Confirmed</h2>
        <p>Your order will be prepared and sent soon.</p>
      </header>

<div className="confirmation-info">
  <p><strong>Date:</strong> {createdAt}</p>
  <p><strong>Total products:</strong> {totalProducts}</p>
  <p><strong>Total price:</strong> {order.total.toFixed(2)} лв.</p>
</div>

<h3 className="confirmation-subheader">More information</h3>

<ul className="confirmation-list">
  {order.items.map((item) => (
    <li key={item._id} className="confirmation-row">
      <div className="row-left">
        {item.image && (
          <img
            src={item.image}
            alt={item.title}
            className="confirmation-image"
          />
        )}
        <div className="confirmation-details">
          <Link
            to={`/products/details/${item.productId}`}
            className="product-title"
          >
            {item.title}
          </Link>
          <span className="product-qty">Quantity: {item.quantity}</span>
        </div>
      </div>
      <div className="row-right">
        <span className="product-price">
          {(item.price * item.quantity).toFixed(2)} лв.
        </span>
      </div>
    </li>
  ))}
</ul>

      <footer className="confirmation-footer">
        <p>You’ll receive a confirmation email shortly.</p>
        <button
          className="btn-outline"
          onClick={() => navigate("/products")}
        >
          Continue Shopping
        </button>
      </footer>
    </div>
  );
}