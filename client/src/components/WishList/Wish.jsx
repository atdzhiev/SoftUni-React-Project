import { useState, useContext, useCallback } from "react";
import { LovesContext } from "../../contexts/LovesContext";
import { ProductsContext } from "../../contexts/ProductsContext";
import { CartContext } from "../../contexts/CartContext";  
import { useNavigate } from "react-router";           
import WishlistProduct from "./WishlistProduct";
import ConfirmModal from "../ConfrimModal/ConfirmModal";
import ErrorContainer from "../Error/ErrorContainer";
import "./WishListDrawer.css";

const WishlistDrawer = ({ onClose }) => {
  const { loves, onLoveDelete } = useContext(LovesContext);
  const { products } = useContext(ProductsContext);
  const { onCartSubmit } = useContext(CartContext);         
  const navigate = useNavigate();

  const [selectedItems, setSelectedItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedLoveId, setSelectedLoveId] = useState(null);

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

  const handleAddSelectedToCart = () => {
    const selectedProducts = lovedProducts.filter((d) =>
      selectedItems.includes(d._id)
    );
    selectedProducts.forEach((product) => onCartSubmit({
       productId: product._id,
       title: product.title,
       image: product.images?.[product.mainImageIndex] || product.images?.[0] || "",
       price: product.price,
       quantity: 1,
    })); 
    setSelectedItems([]);
    onClose();
  };

  const handleViewDetails = (product) => {
    navigate(`products/details/${product._id}`);
  };

   const handleDeleteClick = useCallback((loveId) => {
    setSelectedLoveId(loveId);
    setOpen(true);
  }, []);

  const handleConfirmDelete = () => {
    if (selectedLoveId) {
      onLoveDelete(selectedLoveId);
    }
    setOpen(false);
    setSelectedLoveId(null);
  };

  const handleCancelDelete = () => {
    setOpen(false);
    setSelectedLoveId(null);
  };

  return (
    <div className="wishlist-overlay" onClick={onClose}>
      <div className="wishlist-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="wishlist-header">
          <h4>Wishlist</h4>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <ErrorContainer />

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
                    onAddToCart={onCartSubmit}        
                    onLoveDelete={() => handleDeleteClick(product.loveId)}
                    onClose={onClose} 
                  />
                );
              })}
            </ul>

            {selectedItems.length > 1 && (
              <div className="wishlist-actions">
                <button
                  className="cart-btn-global"
                  onClick={handleAddSelectedToCart}
                >
                  Add {selectedItems.length} items to Cart
                </button>
              </div>
            )}
          </>
        )}
      </div>
      <ConfirmModal
        open={open}
        message="Are you sure you want to remove this item from your wishlist?"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
};

export default WishlistDrawer;