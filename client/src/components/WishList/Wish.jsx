import { useState, useContext } from "react";
import { LovesContext } from "../../contexts/LovesContext";
import { ProductsContext } from "../../contexts/ProductsContext";  
import { useNavigate } from "react-router";           
import WishlistProduct from "./WishlistProduct";
import "./WishlistDrawer.css";

const WishlistDrawer = ({ onClose }) => {
  const { loves, onLoveDelete } = useContext(LovesContext);
  const { products } = useContext(ProductsContext);      
  const navigate = useNavigate();

  const [selectedItems, setSelectedItems] = useState([]);

  const lovedProducts = loves
    .map((love) => {
      const product = products.find((d) => d._id === love.productId);
      return product ? { ...product, loveId: love._id } : null;
    })
    .filter(Boolean);

  const toggleSelect = (productId) => {
    setSelectedItems((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  

  const handleViewDetails = (product) => {
    navigate(`products/details/${product._id}`);
  };

  return (
    <div className="wishlist-overlay" onClick={onClose}>
      <div className="wishlist-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="wishlist-header">
          <h4>Wishlist</h4>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        {lovedProducts.length === 0 ? (
          <p className="empty-text">Your wishlist is empty.</p>
        ) : (
          <>
            <ul className="wishlist-list">
              {lovedProducts.map((product) => {
                const isSelected = selectedItems.includes(product._id);
                const multipleSelected = selectedItems.length > 1;

                return (
                  <WishlistProduct
                    key={product._id}
                    product={product}
                    isSelected={isSelected}
                    multipleSelected={multipleSelected}
                    toggleSelect={toggleSelect}
                    onViewDetails={handleViewDetails}        
                    onLoveDelete={onLoveDelete}
                    onClose={onClose} 
                  />
                );
              })}
            </ul>

            {selectedItems.length > 1 && (
              <div className="wishlist-actions">
                <button
                  className="cart-btn-global"
                >
                  Add {selectedItems.length} items to Cart
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default WishlistDrawer;