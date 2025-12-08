import { Link } from "react-router";
import "./NotFound.css"

export default function NotFound() {
  return (
    <div className="nf-wrapper">
      <div className="nf-card">
        <h1 className="nf-code">404</h1>
        <p className="nf-message">Sorry, the page you’re looking for doesn’t exist.</p>
        <div className="nf-actions">
          <Link to="/" className="nf-btn nf-primary">Go Home</Link>
          <Link to="/products" className="nf-btn nf-outline">Browse Catalog</Link>
        </div>
      </div>
    </div>
  );
}