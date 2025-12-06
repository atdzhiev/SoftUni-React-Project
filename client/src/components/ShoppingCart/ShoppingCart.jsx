import { useContext } from "react";
import { Link, useNavigate } from "react-router";
import "./ShoppingCart.css";


const ShoppingCart = () => {
  
  return (
    <div className="cart-page">
      <div className="cart-products">
        <h2 className="cart-title">Shopping Cart</h2>

          <p className="empty-text">Your cart is empty.</p>
        

    </div>

      <div className="cart-summary">
        <h4>Summary</h4>
        <div className="summary-row">
          <span>Products cost:</span>
          <span>0</span>
        </div>
        <div className="summary-row">
          <span>Delivery fee:</span>
          <span>0</span>
        </div>
        <div className="summary-row total">
          <span>Total:</span>
          <span>0</span>
        </div>
        <button className="checkout-btn"
        >Order Now</button>
      </div>
    </div>
  );
};

export default ShoppingCart;