import { vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import "@testing-library/jest-dom";


vi.mock("react-router", () => ({
  Link: ({ children, to, ...props }) => (
    <a href={to} {...props}>
      {children}
    </a>
  ),
}));

import AboutUs from "./About";

describe("AboutUs Component", () => {
   it("renders section with title and subtitle", () => {
    render(<AboutUs />);
    const heroHeading = screen.getByRole("heading", { level: 1, name: "About Us" });
    expect(heroHeading).toBeInTheDocument();
    expect(screen.getByText(/Where paper meets imagination ✨/i)).toBeInTheDocument();
  });


  it("renders the story section with heading and paragraph", () => {
    render(<AboutUs />);
    expect(screen.getByRole("heading", { level: 2, name: "Our Story" })).toBeInTheDocument();
    expect(
      screen.getByText(/Born from a love of ink, paper, and creativity/i)
    ).toBeInTheDocument();
  });

  it("renders all highlight cards with correct headings", () => {
    render(<AboutUs />);
    const highlightSection = document.querySelector(".about-highlights");
    expect(highlightSection).toBeInTheDocument();

    const utils = within(highlightSection);
    ["Premium Quality", "Creative Spark", "Eco-Friendly"].forEach((title) => {
      expect(utils.getByRole("heading", { level: 3, name: title })).toBeInTheDocument();
    });
  });

  it("renders footer with heading, text, and link", () => {
    render(<AboutUs />);
    expect(
      screen.getByRole("heading", { level: 2, name: "Join Our Creative Community" })
    ).toBeInTheDocument();

    expect(
      screen.getByText(/Whether you’re sketching, journaling, or planning/i)
    ).toBeInTheDocument();

    const link = screen.getByRole("link", { name: /Explore Our Collection/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/products");
    expect(link).toHaveClass("btn-discover");
  });

  it("applies correct section class name", () => {
    render(<AboutUs />);
    const section = document.querySelector("section.about-us");
    expect(section).toBeInTheDocument();
    expect(section).toHaveClass("about-us");
  });
});