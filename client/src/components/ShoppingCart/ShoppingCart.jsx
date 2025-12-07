import { useContext } from "react";
import { Link, useNavigate } from "react-router";
import { CartContext } from "../../contexts/CartContext";
import "./ShoppingCart.css";


const ShoppingCart = () => {
  const { cart, onCartEdit, onCartDelete, clearCart } = useContext(CartContext);
  const navigate = useNavigate();


  let subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  let deliveryFee = subtotal < 100 ? 5 : 0;
  if (subtotal === 0) {
    deliveryFee = 0;
  }
  const total = subtotal + deliveryFee;

  return (
    <div className="cart-page">
      <div className="cart-products">
        <h2 className="cart-title">Shopping Cart</h2>

        {cart.length === 0 ? (
          <p className="empty-text">Your cart is empty.</p>
        ) : (
          <>
            <div className="cart-header-row">
              <div className="cart-col details">Product details</div>
              <div className="cart-col price">Price</div>
              <div className="cart-col quantity">Quantity</div>
              <div className="cart-col total">Total</div>
            </div>

            {cart.map((item) => (
              <div key={item._id} className="cart-item-row">
                <div className="cart-col details">
                  <button
                    className="remove-btn"
                    onClick={() => onCartDelete(item._id)}
                  >
                    ✕
                  </button>
                  <img src={item.image} alt={item.title} />

                  <div className="cart-title-block">
                    <Link
                      to={`/products/details/${item.productId}`}
                      className="product-title"
                    >
                      {item.title}
                    </Link>

                   {item.options && Object.keys(item.options).length > 0 && (
                      <div className="cart-options">
                         {Object.entries(item.options).map(([key, value]) => (
                         <span key={key} className="cart-option">
                            {key}: {typeof value === "object" ? JSON.stringify(value) : value}
                         </span>
                         ))}
                      </div>
                    )}

                  </div>
                </div>

                <div className="cart-col price">${item.price}</div>

                <div className="cart-col quantity">
                  <button
                    className="qty-btn"
                    onClick={() =>
                      onCartEdit(item._id, Math.max(1, item.quantity - 1))
                    }
                  >
                    –
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    className="qty-btn"
                    onClick={() => onCartEdit(item._id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>

                <div className="cart-col total">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </>
        )}
      </div>

      <div className="cart-summary">
        <h4>Summary</h4>
        <div className="summary-row">
          <span>Products cost:</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="summary-row">
          <span>Delivery fee:</span>
          <span>${deliveryFee.toFixed(2)}</span>
        </div>
        <div className="summary-row total">
          <span>Total:</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <button className="checkout-btn"
         >Order Now</button>
                </div>
              </div>
            );
          };

export default ShoppingCart;