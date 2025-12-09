import "./WishListDrawer.css";

const WishlistProduct = ({
  product,
  isSelected,
  multipleSelected,
  toggleSelect,
  onViewDetails,
  onAddToCart,
  onLoveDelete,
  onClose,
}) => {
  return (
    <li className={`wishlist-item ${isSelected ? "selected" : ""}`}>
      <div className="item-left">
        <input
          type="checkbox"
          checked={isSelected}
          onClick={(e) => {
            e.stopPropagation();
          }}
          onChange={() => toggleSelect(product._id)}
        />
        <div
          className="item-image-col"
          onClick={() => {
             onViewDetails(product);
            onClose();
          }}
        >
          <img 
          src={product.images?.[product.mainImageIndex] || product.images?.[0] || ""}
          alt={product.title}
          className="item-image" />
        </div>
      </div>

      <div className="item-details-col">
        <button
          type="button"
          className="remove-btn"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onLoveDelete(product.loveId);
          }}
          aria-label="Remove from wishlist"
        >
          ❌
        </button>

        <div
          className="item-title"
          onClick={() => {
            onViewDetails(product);
            onClose();
          }}
        >
          {product.title}
        </div>
        <div className="item-price">{product.price} BGN</div>

        {!multipleSelected && (
          <button
            type="button"
            className="cart-btn-small"
            onClick={(e) => {
              e.preventDefault();
              onAddToCart({
                productId: product._id,
                title: product.title,
                image: product.images?.[product.mainImageIndex] || product.images?.[0] || "",
                price: product.price,
                quantity: 1,
              });
              onClose();
            }}
          >
            🛒 Add to Cart
          </button>
        )}
      </div>
    </li>
  );
};

export default WishlistProduct;