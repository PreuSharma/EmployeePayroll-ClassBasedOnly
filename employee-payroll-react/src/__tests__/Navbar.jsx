import { render, screen } from "@testing-library/react";
import Navbar from "../components/Navbar/Navbar";


describe("Navbar Component Testing", () => {
test("render logo", () => {
  render(<Navbar />);
  const logoImage = screen.getByAltText("Company Logo");
  expect(logoImage).toBeInTheDocument();
});

test("render employee", () => {
  render(<Navbar />);
  const element = screen.getByText(/EMPLOYEE/i);
  expect(element).toBeInTheDocument();
});

test("render payroll", () => {
  render(<Navbar />);
  const element2 = screen.getByText(/PAYROLL/i);
  expect(element2).toBeInTheDocument();
});
});