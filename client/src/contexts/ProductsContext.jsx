import {
  createContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { useNavigate } from "react-router";
import * as productsService from "../services/productsService";
import { useError } from "./ErrorContext"; 

export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const navigate = useNavigate();
  const { addError } = useError();

  const [page, setPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [action, setAction] = useState("");
  const [totalProducts, setTotalProducts] = useState(0);
  const [maxPage, setMaxPage] = useState(1);

 
  useEffect(() => {
    productsService
      .getAll()
      .then((all) => {
        const count = all.length;
        setTotalProducts(count);
        setMaxPage(Math.max(1, Math.ceil(count / 12)));
      })
      .catch((err) => addError(err.message));
  }, []);

  
  useEffect(() => {
    if (!action) {
      productsService
        .getAllByPage(page)
        .then(setProducts)
        .catch((err) => addError(err.message));

      productsService
        .getAll()
        .then((all) => {
          const count = all.length;
          setTotalProducts(count);
          setMaxPage(Math.max(1, Math.ceil(count / 12)));
        })
        .catch((err) => addError(err.message));
      return;
    }

    const [method, criteria, match] = action.split("-");

    if (method === "sort") {
      productsService
        .getAll()
        .then((data) => {
          let sorted = [...data];
          if (criteria === "price") {
            sorted.sort((a, b) =>
              match === "desc"
                ? Number(b.price) - Number(a.price)
                : Number(a.price) - Number(b.price)
            );
          } else if (criteria === "_createdOn") {
            sorted.sort((a, b) =>
              match === "desc"
                ? Number(b._createdOn) - Number(a._createdOn)
                : Number(a._createdOn) - Number(b._createdOn)
            );
          } else if (criteria === "title") {
            sorted.sort((a, b) =>
            match === "desc"
            ? b.title.localeCompare(a.title) // Z → A
            : a.title.localeCompare(b.title) // A → Z
           );
        }

          const start = (page - 1) * 12;
          const end = start + 12;
          setProducts(sorted.slice(start, end));
          setTotalProducts(sorted.length);
          setMaxPage(Math.max(1, Math.ceil(sorted.length / 12)));
        })
        .catch((err) => addError(err.message));
    } else if (method === "filter") {
      productsService
        .filter(page, criteria, match)
        .then((data) => {
          setProducts(data);
          setTotalProducts(data.length);
          setMaxPage(Math.max(1, Math.ceil(data.length / 12)));
        })
        .catch((err) => addError(err.message));
    }
  }, [page, action]);

  const addProduct = (newProduct) => {
    setProducts((prev) => [...prev, newProduct]);
  };

  
  const onCreateProductSubmit = useCallback(
    async (data) => {
      try {
        if (Object.values(data).includes("")) {
          throw new Error("All fields are required!");
        }
        const newProduct = await productsService.create(data);
        setProducts((state) => [...state, newProduct]);

        const all = await productsService.getAll();
        const count = all.length;
        setTotalProducts(count);
        setMaxPage(Math.max(1, Math.ceil(count / 12)));

        navigate("/products");
      } catch (error) {
        addError(error.message);
      }
    },
    [navigate, addError]
  );

  const onEditProductSubmit = useCallback(
    async (data) => {
      try {
        if (Object.values(data).includes("")) {
          throw new Error("All fields are required!");
        }
        const result = await productsService.edit(data._id, data);
        setProducts((state) =>
          state.map((x) => (x._id === data._id ? result : x))
        );
        navigate(`/products/details/${data._id}`);
      } catch (error) {
        addError(error.message);
      }
    },
    [navigate,addError]
  );

  const onDeleteClick = useCallback(
    async (productId) => {
      try {
        await productsService.deleteProduct(productId);
        setProducts((state) => state.filter((x) => x._id !== productId));
        navigate("/products");
      } catch (error) {
        addError(error.message);
      }
    },
    [navigate,addError]
  );

  const onOptionChangeHandler = useCallback((value) => {
    let criteria = "";
    let order = "";

    switch (value) {
      case "":
      case "none":
        setAction("");
        return;
      case "alphabetically":
        criteria = "title";
        break;
      case "price-asc":
        criteria = "price";
        break;
      case "price-desc":
        criteria = "price";
        order = "desc";
        break;
      case "newest":
        criteria = "_createdOn";
        order = "desc";
        break;
      case "oldest":
        criteria = "_createdOn";
        order = "asc";
        break;
      default:
        break;
    }

    setAction(`sort-${criteria}-${order}`);
  }, []);

  const onCategoryClickHandler = useCallback((value) => {
    if (value === "none" || value === "all") {
      setAction("");
      return;
    }
    setAction(`filter-category-${value}`);
  }, []);

  const onBrandClickHandler = useCallback((brand) => {
  if (brand === "none" || brand === "all") {
    setAction("");
    return;
  }
  setAction(`filter-brand-${brand}`);
}, []);


  const onSearchSubmit = useCallback((values) => {
    const { search } = values;
    if (search) {
      setAction(`filter-title-${search}`);
    } else {
      setAction("");
    }
  }, []);

  const onPageChange = useCallback(
    (value) => {
      setPage((state) => {
        let newPage = state + value;
        if (newPage < 1) return 1;
        if (newPage > maxPage) return maxPage;
        return newPage;
      });
    },
    [maxPage]
  );

  const getProduct = useCallback(
    (productId) => products.find((product) => product._id === productId),
    [products]
  );

  const productsContextValues = useMemo(
    () => ({
      products,
      page,
      maxPage,
      totalProducts,
      onCreateProductSubmit,
      onEditProductSubmit,
      onDeleteClick,
      onOptionChangeHandler,
      onCategoryClickHandler,
      onBrandClickHandler,
      onSearchSubmit,
      onPageChange,
      getProduct,
      addProduct,
    }),
    [
      products,
      page,
      maxPage,
      totalProducts,
      onCreateProductSubmit,
      onEditProductSubmit,
      onDeleteClick,
      onOptionChangeHandler,
      onCategoryClickHandler,
      onBrandClickHandler,
      onSearchSubmit,
      onPageChange,
      getProduct,
      addProduct,
    ]
  );

  return (
    <ProductsContext.Provider value={productsContextValues}>
      {children}
    </ProductsContext.Provider>
  );
};