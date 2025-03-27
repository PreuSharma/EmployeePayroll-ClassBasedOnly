import { fireEvent, render, screen } from "@testing-library/react";
import Dashboard from "../pages/Dashboard/Dashboard";

jest.mock("jquery", () => ({
  ajax: jest.fn(),
  get: jest.fn(),
}));

describe("Employee Dashboard Testing", () => {

  test("Employee Payroll Dashboard title", () => {
    render(<Dashboard />);
    const titleElement = screen.getByText(/Employee Details/i);
    expect(titleElement).toBeInTheDocument();
  });

  test("Employee Payroll Dashboard AddUser", () => {
    render(<Dashboard />);
    const addUser = screen.getByText(/ADD USER/i);
    expect(addUser).toBeInTheDocument();
  });


  test("renders Search button", () => {
    render(<Dashboard />);
    const searchButton = screen.getByRole("button", { name: /Search/i });
    expect(searchButton).toBeInTheDocument();
  });

  test("renders Employee table", () => {
    render(<Dashboard />);
    const tableElement = screen.getByRole("table");
    expect(tableElement).toBeInTheDocument();
  });


  test("shows search input when search button is clicked and updates state", () => {
    render(<Dashboard />);
    const searchButton = screen.getByRole("button", { name: /search/i });
    fireEvent.click(searchButton);
    const searchInput = screen.getByPlaceholderText("Search");
    expect(searchInput).toBeInTheDocument();
    fireEvent.change(searchInput, { target: { value: "Alice" } });
    expect(searchInput.value).toBe("Alice");
  });

});
