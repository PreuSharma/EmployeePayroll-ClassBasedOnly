import { fireEvent, render, screen } from "@testing-library/react";
import Navbar from "../components/Navbar/Navbar";

describe("Navbar Component Testing", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("renders company logo", () => {
    render(<Navbar />);
    const logoImage = screen.getByAltText("Company Logo");
    expect(logoImage).toBeInTheDocument();
  });

  test("renders 'EMPLOYEE' text", () => {
    render(<Navbar />);
    const element = screen.getByText(/EMPLOYEE/i);
    expect(element).toBeInTheDocument();
  });

  test("renders 'PAYROLL' text", () => {
    render(<Navbar />);
    const element2 = screen.getByText(/PAYROLL/i);
    expect(element2).toBeInTheDocument();
  });

  test("renders user icon", () => {
    render(<Navbar />);
    const userIcon = screen.getByRole("img", { hidden: true });
    expect(userIcon).toBeInTheDocument();
  });

  test("dropdown should not be visible initially", () => {
    render(<Navbar />);
    const dropdown = screen.queryByText(/logout/i);
    expect(dropdown).not.toBeInTheDocument();
  });



  test("clears localStorage on logout", () => {
    localStorage.setItem("user", JSON.stringify({ name: "John", email: "john@example.com" }));
    render(<Navbar />);
    fireEvent.click(screen.getByRole("img", { hidden: true })); 
    expect(localStorage.getItem("user")).not.toBeNull();
  });
  

});
