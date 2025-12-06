import "./ProductCreate.css"

export const ProductForm = ({ mode, values, changeHandler, setFieldValue, onSubmit }) => {
  return (
    <section className="add-product-wrapper py-5">
      <div className="container">
        <h2 className="page-title mb-4 text-center">
          {mode === "create" ? "Add New Product" : "Edit Product"}
        </h2>

        <form onSubmit={onSubmit} className="card p-4 shadow-sm">
          <div className="row g-4">
            <div className="col-lg-5">
              <h5 className="section-title">Images</h5>
              <div className="preview-row d-flex flex-wrap gap-4 mt-3 align-items-start">
                {values.images.map((img, index) => (
                  <div key={index} className="preview-card">
                    <input
                      type="text"
                      className="form-control mb-3"
                      placeholder="Image URL"
                      value={img}
                      onChange={(e) => setFieldValue(`images.${index}`, e.target.value)}
                    />
                    {img && (
                      <>
                        <img
                          src={img}
                          alt={`Preview ${img}`}
                          className={`img-thumbnail ${
                            values.mainImageIndex === index ? "main-selected" : ""
                          }`}
                          style={{ maxHeight: "120px" }}
                          onError={(e) => (e.target.style.display = "none")}
                        />
                        <div className="mt-3 d-flex justify-content-center gap-2">
                          <button
                            type="button"
                            className={`btn btn-sm ${
                              values.mainImageIndex === index
                                ? "btn-success"
                                : "btn-outline-success"
                            }`}
                            onClick={() => setFieldValue("mainImageIndex", index)}
                          >
                            {values.mainImageIndex === index ? "Main ✓" : "Set Main"}
                          </button>
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => {
                              const newImages = values.images.filter((_, i) => i !== index);
                              setFieldValue("images", newImages);
                            }}
                          >
                            ✕
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  className="btn btn-outline-primary add-image-btn"
                  onClick={() => setFieldValue("images", [...values.images, ""])}
                >
                  +
                </button>
              </div>
            </div>

            <div className="col-lg-7">
              <div className="mb-4">
                <h5 className="section-title">Title</h5>
                <input
                  type="text"
                  name="title"
                  className="form-control"
                  value={values.title}
                  onChange={changeHandler}
                  required
                />
              </div>

              <div className="mb-4">
                <h5 className="section-title">Brand</h5>
                <input
                  type="text"
                  name="brand"
                  className="form-control"
                  value={values.brand}
                  onChange={changeHandler}
                  required
                />
              </div>

              <div className="mb-4">
                <h5 className="section-title">Price</h5>
                <input
                  type="number"
                  name="price"
                  className="form-control"
                  value={values.price}
                  onChange={changeHandler}
                  min="0"
                  step= "0.01"
                  required
                />
              </div>

              <div className="mb-4">
                <h5 className="section-title">Quantity</h5>
                <input
                  type="number"
                  name="pieces"
                  className="form-control"
                  value={values.pieces}
                  onChange={changeHandler}
                  min="0"
                  required
                />
              </div>

              <div className="mb-4">
                <h5 className="section-title">Category</h5>
                <input
                  type="text"
                  name="category"
                  className="form-control"
                  value={values.category}
                  onChange={changeHandler}
                  required
                />
              </div>

              <div className="mb-4">
                <h5 className="section-title">Description</h5>
                <textarea
                  name="description"
                  className="form-control"
                  rows="4"
                  value={values.description}
                  onChange={changeHandler}
                  required
                ></textarea>
              </div>

              <div className="mb-4">
                <h5 className="section-title">Specifications</h5>
                {values.specifications.map((spec, index) => (
                  <div key={index} className="row mb-2 align-items-center">
                    <div className="col">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Property"
                        value={spec.key}
                        onChange={(e) =>
                          setFieldValue(`specifications.${index}.key`, e.target.value)
                        }
                      />
                    </div>
                    <div className="col">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Value"
                        value={spec.value}
                        onChange={(e) =>
                          setFieldValue(`specifications.${index}.value`, e.target.value)
                        }
                      />
                    </div>
                    <div className="col-auto">
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => {
                          const newSpecs = values.specifications.filter((_, i) => i !== index);
                          setFieldValue("specifications", newSpecs);
                        }}
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  className="btn btn-outline-primary btn-sm mt-2"
                  onClick={() =>
                    setFieldValue("specifications", [
                      ...values.specifications,
                      { key: "", value: "" },
                    ])
                  }
                >
                  + Add Another Specification
                </button>
              </div>

              <div className="mb-4">
                <h5 className="section-title">Options</h5>
                {values.options.map((opt, index) => (
                  <div key={index} className="row mb-2 align-items-center">
                    <div className="col">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Option Name (e.g. Size)"
                        value={opt.key}
                        onChange={(e) =>
                          setFieldValue(`options.${index}.key`, e.target.value)
                        }
                      />
                    </div>
                    <div className="col">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Option Value (e.g. Large)"
                        value={opt.value}
                        onChange={(e) =>
                          setFieldValue(`options.${index}.value`, e.target.value)
                        }
                      />
                    </div>
                    <div className="col-auto">
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => {
                          const newOpts = values.options.filter((_, i) => i !== index);
                          setFieldValue("options", newOpts);
                        }}
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  className="btn btn-outline-primary btn-sm mt-2"
                  onClick={() =>
                    setFieldValue("options", [...values.options, { key: "", value: "" }])
                  }
                >
                  + Add Another Option
                </button>
              </div>

              <div className="text-center d-flex justify-content-center gap-3 mt-3">
                <button type="submit" className="btn btn-success">
                  {mode === "create" ? "Save Product" : "Update Product"}
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => window.history.back()}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};