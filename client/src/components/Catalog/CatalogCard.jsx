import { useContext } from "react";
import { Link } from "react-router";
import { LovesContext } from "../../contexts/LovesContext";
import { CartContext } from "../../contexts/CartContext";
import { AuthContext } from "../../contexts/AuthContext";
import "./CatalogCard.css"



const CatalogCard = ({ _id, title, price, images, mainImageIndex }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const { loves, onClickLove, onLoveDelete } = useContext(LovesContext);
  const { onCartSubmit } = useContext(CartContext);
  const loveRecord = loves.find((l) => l.productId === _id);
  const isLoved = !!loveRecord;

  const handleLove = async () => {
    if (isLoved) {
      await onLoveDelete(loveRecord._id);
    } else {
      await onClickLove(_id);
    }
  };

  const cardImage = Array.isArray(images)
    ? images[mainImageIndex] || images[0]
    : images;

  return (
    <div className="catalog-card mb-4">
      <div className="position-relative">
        <img
          alt={title}
          className="card-img contain w-100"
          src={cardImage || "/placeholder.png"}
        />
        <div className="product-overlay d-flex align-items-center justify-content-center position-absolute top-0 start-0 w-100 h-100">
          <ul className="list-unstyled d-flex flex-column align-items-center">
             {isAuthenticated && (
            <>
             <li>
                <button
                  onClick={handleLove}
                  className={`btn ${isLoved ? "btn-danger" : "btn-success"} text-white`}
                >
                  <i className={isLoved ? "fas fa-heart" : "far fa-heart"}></i>
                </button>
              </li>
            <li>
              <button
                className="btn btn-success text-white mt-2"
                onClick={() =>
                  onCartSubmit({
                    productId: _id,
                    title,
                    price,
                    image: cardImage,
                    quantity: 1,
                  })
                }
              >
                <i className="fas fa-cart-plus" />
              </button>
            </li>
            </>
            )}
            <li>
              <Link
                className="btn btn-success text-white mt-2"
                to={`/products/details/${_id}`}
              >
                <i className="far fa-eye"></i>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="catalog-title card-body text-center">
        <Link to={`/products/details/${_id}`} className="h3 text-decoration-none">
          {title}
        </Link>
        <p className="catalog-price mb-0">{Number(price)} BGN</p>
      </div>
    </div>
  );
};

export default CatalogCard;