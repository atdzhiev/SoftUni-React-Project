import { useState, useContext, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { CartContext } from "../../contexts/CartContext";
import { LovesContext } from "../../contexts/LovesContext";
import * as productsService from "../../services/productsService";
import { ProductsContext } from "../../contexts/ProductsContext";
import { AuthContext } from "../../contexts/AuthContext";
import ConfirmModal from "../ConfrimModal/ConfirmModal";
import ErrorContainer from "../Error/ErrorContainer";
import { useError } from "../../contexts/ErrorContext";
import "./Details.css";

const Details = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const { isAuthenticated, isAdmin ,userId } = useContext(AuthContext);
  const { onCartSubmit } = useContext(CartContext);
  const { loves, onClickLove, onLoveDelete } = useContext(LovesContext);
  const { onDeleteClick } = useContext(ProductsContext);
  const { addError } = useError();

  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);

  useEffect(() => {
    productsService
      .getOne(productId)
      .then((result) => {
        setProduct(result);
        const defaultMain =
          result.images?.[result.mainImageIndex] || result.images?.[0] || "";
        setMainImage(defaultMain);
      })
      .catch((err) => {
        addError("Error loading design: " + err.message);
      });
  }, [productId, addError]);

  if (!product) {
    return (
      <div className="container py-5">
        <ErrorContainer />
        <p>Loading design...</p>
      </div>
    );
  } 

  
  const loveEntry = loves.find((l) => l.productId === product._id);
  const inWishlist = Boolean(loveEntry);

   const isOwner = product._ownerId === userId;

  const handleOptionSelect = (optionKey, value) => {
    setSelectedOptions((prev) => ({ ...prev, [optionKey]: value }));
  };

  const handleAddToCart = () => {
    onCartSubmit({
      productId: product._id,
      title: product.title,
      image:
        product.images?.[product.mainImageIndex] ||
        product.images?.[0] ||
        "",
      price: product.price,
      quantity,
      options: selectedOptions,
    });
  };

  const openConfirm = (action) => {
    setConfirmAction(() => action);
    setConfirmOpen(true);
  };

  const handleConfirm = () => {
    if (confirmAction) confirmAction();
    setConfirmOpen(false);
    setConfirmAction(null);
  };

  const handleCancel = () => {
    setConfirmOpen(false);
    setConfirmAction(null);
  };


  return (
    <section className="product-details-wrapper py-5">
      <div className="container">

         <ErrorContainer />

        <div className="d-flex justify-content-between align-items-center mb-4">
          <button
            className="btn btn-link back-btn"
            onClick={() => navigate(-1)}
          >
            ← Back
          </button>

          {isAdmin && isOwner &&(
            <div className="admin-toolbar d-flex gap-3">
              <button
                className="btn btn-warning"
                onClick={() => navigate(`/products/edit/${product._id}`)}
              >
                ✏️ Edit
              </button>
              <button
                className="btn btn-danger"
                onClick={() => openConfirm(() => onDeleteClick(product._id))}
              >
                🗑 Delete
              </button>
            </div>
          )}
        </div>

        <div className="row g-5">
          <div className="col-lg-6">
            <div className="main-image-card text-center">
              <img
                src={mainImage}
                alt={product.title}
                className="main-image"
                onClick={() => setIsFullscreen(true)}
                style={{ cursor: "zoom-in" }}
              />
            </div>
            <div className="thumbnail-row mt-3 d-flex justify-content-center flex-wrap">
              {product.images?.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`Thumbnail ${i}`}
                  className={`thumbnail ${mainImage === img ? "active" : ""}`}
                  onClick={() => setMainImage(img)}
                />
              ))}
            </div>
          </div>

          <div className="col-lg-6">
            <div className="product-info card p-4">
              <h1 className="product-title">{product.title}</h1>
              {product.brand && (
                <p className="product-brand">Brand: {product.brand}</p>
              )}
              <p className="product-price">{product.price} лв.</p>
              <div className="product-description-container">
                  <h5 className="section-title"></h5>
                  <ul className="product-description-list">
                    {product.description
                      .split(/\r?\n|\./) 
                      .map((sentence, idx) =>
                        sentence.trim() ? <li key={idx}>{sentence.trim()}</li> : null
                      )}
                  </ul>
                </div>


              {Array.isArray(product.options) &&
                product.options.map((opt) => {
                  const values = opt.value.split(",").map((v) => v.trim());
                  return (
                    <div
                      key={opt.key}
                      className="option-box mb-3 p-3 shadow-sm"
                    >
                      <label className="form-label fw-bold">{opt.key}</label>
                      <div className="d-flex flex-wrap gap-2">
                        {values.map((val) => {
                          const isSelected = selectedOptions[opt.key] === val;
                          return (
                            <button
                              key={val}
                              type="button"
                              className={`btn option-btn ${
                                isSelected
                                  ? "btn-success"
                                  : "btn-outline-success"
                              }`}
                              onClick={() => handleOptionSelect(opt.key, val)}
                            >
                              {val}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}           
                 {isAuthenticated ? (
                <>
                  <div className="quantity-control my-4 text-center">
                    <button
                      className="btn btn-outline-dark quantity-btn"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    >
                      −
                    </button>
                    <span className="quantity-value mx-3">{quantity}</span>
                    <button
                      className="btn btn-outline-dark quantity-btn"
                      onClick={() => setQuantity((q) => q + 1)}
                    >
                      +
                    </button>
                  </div>

                  <div className="actions d-flex gap-3">
                    <button
                      className="btn btn-success flex-fill"
                      onClick={handleAddToCart}
                    >
                      🛒 Add to Cart
                    </button>
                    {inWishlist ? (
                      <button
                        className="btn btn-danger flex-fill"
                        onClick={() => onLoveDelete(loveEntry._id)}
                      >
                        ❤️ Remove from Wishlist
                      </button>
                    ) : (
                      <button
                        className="btn btn-outline-danger flex-fill"
                        onClick={() => onClickLove(product._id)}
                      >
                        🤍 Add to Wishlist
                      </button>
                    )}
                  </div>
                </>
              ) : (
                <div className="w-100 text-center py-2">
                  <span className="signin-message">
                    Please{" "}
                    <Link
                      to="/login"
                      className="fw-semibold text-decoration-none"
                    >
                      sign in
                    </Link>{" "}
                    to order.
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {Array.isArray(product.specifications) &&
          product.specifications.length > 0 && (
            <div className="specifications card shadow-sm mt-5 p-4">
              <h3 className="spec-title">Specifications</h3>
              <table className="table table-striped">
                <tbody>
                  {product.specifications.map(({ key, value }) => (
                    <tr key={key}>
                      <th scope="row">{key}</th>
                      <td>{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
      </div>

      {isFullscreen && (
        <div
          className="fullscreen-overlay"
          onClick={() => setIsFullscreen(false)}
        >
          <img
            src={mainImage}
            alt={product.title}
            className="fullscreen-image"
          />
        </div>
      )}
      <ConfirmModal
        open={confirmOpen}
        message="Are you sure you want to delete the product?"
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </section>
  );
};

export default Details;