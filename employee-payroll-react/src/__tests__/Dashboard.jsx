import { fireEvent, render, screen, waitFor } from "@testing-library/react";


import jquery from "jquery";
import Dashboard from "../pages/Dashboard/Dashboard";

jest.mock("jquery", () => ({
  ajax: jest.fn(),
  get: jest.fn(),
  
}));


const mockEmployees = [
  {
    id: 1,
    name: "Alice",
    gender: "Female",
    departments: ["HR", "Finance"],
    salary: "50000",
    startDate: "2024-01-01",
    profileImage: "https://example.com/profile.jpg",
  },
  {
    id: 2,
    name: "Bob",
    gender: "Male",
    departments: ["Engineering"],
    salary: "70000",
    startDate: "2023-05-15",
    profileImage: "",
  },
];



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

  test("displays 'No employee data found' when list is empty", async () => {
    jest.mocked(jquery.get).mockImplementation((url, callback) => callback([])); 
    render(<Dashboard />);
    await waitFor(() => {
      expect(screen.getByText(/No employee data found/i)).toBeInTheDocument();
    });
  });


  test("toggling search button hides search input", async () => {
    render(<Dashboard />);
    const searchButton = screen.getByRole("button", { name: /search/i });
    fireEvent.click(searchButton);
    expect(screen.getByPlaceholderText("Search")).toBeInTheDocument();

    fireEvent.click(searchButton);
    expect(screen.queryByPlaceholderText("Search")).not.toBeInTheDocument();
  });


  
  test("fetches and displays employee data", async () => {
    jest.mocked(jquery.get).mockImplementation((url, callback) => callback(mockEmployees));

    render(<Dashboard />);

    await waitFor(() => {
      expect(screen.getByText("Alice")).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText("Bob")).toBeInTheDocument();
    });
  });

  
  test("filters employees based on search query", async () => {
    jquery.get.mockImplementation((url, callback) => callback(mockEmployees));
  
    render(<Dashboard />);
  
    await waitFor(() => {
      expect(screen.getByText("Alice")).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText("Bob")).toBeInTheDocument();
    });
  
    const searchButton = screen.getByRole("button", { name: /search/i });
    fireEvent.click(searchButton);
    
    const searchInput = screen.getByPlaceholderText("Search");
    fireEvent.change(searchInput, { target: { value: "Alice" } });
  
    await waitFor(() => {
      expect(screen.getByText("Alice")).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.queryByText("Bob")).not.toBeInTheDocument(); 
    });
  });

});
