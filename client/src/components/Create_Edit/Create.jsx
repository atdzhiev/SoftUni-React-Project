import { useContext } from "react";
import { ProductsContext } from "../../contexts/ProductsContext";
import { useForm } from "../../hooks/useForm";
import { ProductForm } from "./ProductForm";
import ErrorContainer from "../Error/ErrorContainer";

export const CreatePage = () => {
  const { onCreateProductSubmit } = useContext(ProductsContext);

  const initialValues = {
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

  const { values, changeHandler, setFieldValue, onSubmit } = useForm(
    initialValues,
    onCreateProductSubmit,
    { resetOnSubmit: true }
  );

  return (
    <div className="create-page-wrapper">
     
      <ErrorContainer />

    <ProductForm
      mode="create"
      values={values}
      changeHandler={changeHandler}
      setFieldValue={setFieldValue}
      onSubmit={onSubmit}
    />
    </div>
  );
};