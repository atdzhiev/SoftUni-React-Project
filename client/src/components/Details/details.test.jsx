import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { vi } from "vitest";
import Details from "./Details";

vi.mock("react-router", () => ({
  Link: ({ children, to, ...props }) => (
    <a href={to} {...props}>
      {children}
    </a>
  ),
  useNavigate: () => vi.fn(),
  useParams: () => ({ productId: "123" }),
}));


import * as productsService from "../../services/productsService";
const fakeProduct = {
  _id: "123",
  _ownerId: "user1",
  title: "Test Product",
  brand: "Test Brand",
  price: 42,
  description: "Line one. Line two.",
  images: ["img1.jpg", "img2.jpg"],
  mainImageIndex: 0,
  options: [{ key: "Color", value: "Red,Blue" }],
  specifications: [{ key: "Weight", value: "1kg" }],
};
vi.spyOn(productsService, "getOne").mockResolvedValue(fakeProduct);


import { AuthContext } from "../../contexts/AuthContext";
import { CartContext } from "../../contexts/CartContext";
import { LovesContext } from "../../contexts/LovesContext";
import { ProductsContext } from "../../contexts/ProductsContext";
import { ErrorProvider } from "../../contexts/ErrorContext";

const renderWithProviders = (
    ui,
    {
        auth = {
        isAuthenticated: true,
        isAdmin: true,
        userId: "user1",
        onLogin: vi.fn(),
        onLogout: vi.fn(),
        onRegister: vi.fn(),
        },
        cart = { onCartSubmit: vi.fn() },
        loves = { loves: [], onClickLove: vi.fn(), onLoveDelete: vi.fn() },
        products = { onDeleteClick: vi.fn() },
    } = {}
    ) => {
    return render(
        <AuthContext.Provider value={auth}>
        <CartContext.Provider value={cart}>
            <LovesContext.Provider value={loves}>
            <ProductsContext.Provider value={products}>
                <ErrorProvider>{ui}</ErrorProvider>
            </ProductsContext.Provider>
            </LovesContext.Provider>
        </CartContext.Provider>
        </AuthContext.Provider>
    );
    };

describe("Details Component", () => {
  it("shows loading state initially", async () => {
    vi.spyOn(productsService, "getOne").mockImplementationOnce(
      () => new Promise(() => {})
    );
    renderWithProviders(<Details />);
    expect(screen.getByText(/Loading product.../i)).toBeInTheDocument();
  });

  it("renders product info after load", async () => {
    renderWithProviders(<Details />);
    await waitFor(() =>
      expect(screen.getByText("Test Product")).toBeInTheDocument()
    );
    expect(screen.getByText("Brand: Test Brand")).toBeInTheDocument();
    expect(screen.getByText("42.00 лв.")).toBeInTheDocument();
    expect(screen.getByText("Line one")).toBeInTheDocument();
    expect(screen.getByText("Line two")).toBeInTheDocument();
  });

  it("allows option selection", async () => {
    renderWithProviders(<Details />);
    const button = await screen.findByRole("button", { name: "Red" });
    fireEvent.click(button);
    expect(button).toHaveClass("btn-success");
  });

  it("handles quantity increment", async () => {
    renderWithProviders(<Details />);
    const plusBtn = await screen.findByText("+");
    fireEvent.click(plusBtn);
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("handles quantity decrement", async () => {
    renderWithProviders(<Details />);
    const plusBtn = await screen.findByText("+");
    fireEvent.click(plusBtn);
    expect(screen.getByText("2")).toBeInTheDocument();
  
 
    const minusBtn = await screen.findByText("−"); 
    fireEvent.click(minusBtn);
    expect(screen.getByText("1")).toBeInTheDocument();

  });

  it("calls add to cart", async () => {
    const cartMock = { onCartSubmit: vi.fn() };
    renderWithProviders(<Details />, { cart: cartMock });
    const addBtn = await screen.findByRole("button", { name: /Add to Cart/i });
    fireEvent.click(addBtn);
    expect(cartMock.onCartSubmit).toHaveBeenCalled();
  });

  it("shows wishlist button", async () => {
    renderWithProviders(<Details />);
    const loveBtn = await screen.findByRole("button", {
      name: /Add to Wishlist/i,
    });
    expect(loveBtn).toBeInTheDocument();
  });

  it("calls add to wishlist", async () => {
  const lovesMock = { loves: [], onClickLove: vi.fn(), onLoveDelete: vi.fn() };
  renderWithProviders(<Details />, { loves: lovesMock });

  const addBtn = await screen.findByRole("button", { name: /Add to Wishlist/i });
  fireEvent.click(addBtn);

  expect(lovesMock.onClickLove).toHaveBeenCalled();
  });


  it("shows admin toolbar for admin", async () => {
    renderWithProviders(<Details />);
    const editBtn = await screen.findByRole("button", { name: /Edit/i });
    expect(editBtn).toBeInTheDocument();
  });

  it("shows fullscreen overlay when image clicked", async () => {
    renderWithProviders(<Details />);
    const [mainImg] = await screen.findAllByAltText("Test Product");
    fireEvent.click(mainImg);

    const imgs = await screen.findAllByAltText("Test Product");
    const overlayImg = imgs.find(img => img.classList.contains("fullscreen-image"));

    expect(overlayImg).toBeInTheDocument();
    expect(overlayImg).toHaveClass("fullscreen-image");
  });
});