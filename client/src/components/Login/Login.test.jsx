
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { vi } from "vitest";
import Login from "./Login";

vi.mock("react-router", () => ({
  Link: ({ children, to, ...props }) => (
    <a href={to} {...props}>
      {children}
    </a>
  ),
}));

import { AuthContext } from "../../contexts/AuthContext";
import { ErrorProvider } from "../../contexts/ErrorContext";

const renderWithProviders = (ui, { auth = { onLogin: vi.fn() } } = {}) => {
  return render(
    <AuthContext.Provider value={auth}>
      <ErrorProvider>{ui}</ErrorProvider>
    </AuthContext.Provider>
  );
};

describe("Login Component", () => {
 it("renders heading, inputs, button, and register link", () => {
    renderWithProviders(<Login />);
    expect(screen.getByRole("heading", { name: /login/i })).toBeInTheDocument();

    expect(document.querySelector('input[name="email"]')).toBeInTheDocument();
    expect(document.querySelector('input[name="password"]')).toBeInTheDocument();

    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /register here/i })).toHaveAttribute(
      "href",
      "/register"
    );
  });



  it("shows error when fields are empty", async () => {
    renderWithProviders(<Login />);
    fireEvent.click(screen.getByRole("button", { name: /login/i }));
    expect(
      await screen.findByText("Email and password are required!")
    ).toBeInTheDocument();
  });

  it("calls onLogin with valid credentials", async () => {
  const authMock = { onLogin: vi.fn().mockResolvedValue({}) };
  renderWithProviders(<Login />, { auth: authMock });

  const emailInput = document.querySelector('input[name="email"]');
  const passwordInput = document.querySelector('input[name="password"]');

  fireEvent.change(emailInput, { target: { value: "test@example.com" } });
  fireEvent.change(passwordInput, { target: { value: "secret" } });
  fireEvent.click(screen.getByRole("button", { name: /login/i }));

  await waitFor(() =>
    expect(authMock.onLogin).toHaveBeenCalledWith({
      email: "test@example.com",
      password: "secret",
    })
  );
});

  it("shows error when onLogin throws", async () => {
  const authMock = {
    onLogin: vi.fn().mockRejectedValue(new Error("Invalid credentials")),
  };
  renderWithProviders(<Login />, { auth: authMock });

  const emailInput = document.querySelector('input[name="email"]');
  const passwordInput = document.querySelector('input[name="password"]');

  fireEvent.change(emailInput, { target: { value: "test@example.com" } });
  fireEvent.change(passwordInput, { target: { value: "secret" } });

  fireEvent.click(screen.getByRole("button", { name: /login/i }));

  expect(await screen.findByText("Invalid credentials")).toBeInTheDocument();
});
});