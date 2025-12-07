import { Link } from "react-router";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-column">
          <img src="/assets/img/logo1.png" alt="Site Logo" className="site-logo" />
          <p className="footer-tagline">Where every idea finds its canvas.</p>
        </div>

        <div className="footer-column shop-info">
          <h3>Shop Info</h3>
          <ul>
            <li>📌 123 Creative Lane, Sofia</li>
            <li>🕒 Mon–Fri: 9.00 – 18.00</li>
            <li>📞 +359 888 888 888</li>
            <li>✉️ info@state.com</li>
          </ul>
        </div>

        <div className="footer-column more-info">
          <h3>More Info</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">Shop</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 Stationery Store. Crafted with creativity ✨</p>
      </div>
    </footer>
  );
}