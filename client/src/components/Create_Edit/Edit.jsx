import { useContext, useEffect } from "react";
import { useParams } from "react-router";
import { ProductsContext } from "../../contexts/ProductsContext";
import { useForm } from "../../hooks/useForm";
import { ProductForm } from "./ProductForm";
import ErrorContainer from "../Error/ErrorContainer";

export const EditPage = () => {
  const { productId } = useParams();
  const { getProduct, onEditProductSubmit } = useContext(ProductsContext);

  const initialValues = {
    _id: "",
    title: "",
    brand: "",
    price: "",
    pieces: "",
    category: "",
    description: "",
    images: [""],
    specifications: [],
    options: [],
    mainImageIndex: 0,
  };

  const { values, changeHandler, setFieldValue, onSubmit, changeValues } = useForm(
    initialValues,
    onEditProductSubmit,
    { resetOnSubmit: false }
  );

  useEffect(() => {
    const product = getProduct(productId);
    if (product) {
      changeValues(product);
    }
  }, []);

  return (
  <div className="edit-page-wrapper">
    <ErrorContainer />
    <ProductForm
      mode="edit"
      values={values}
      changeHandler={changeHandler}
      setFieldValue={setFieldValue}
      onSubmit={onSubmit}
      />
  </div>
  );
};