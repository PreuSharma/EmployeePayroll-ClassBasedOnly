import { fireEvent, render, screen, waitFor } from "@testing-library/react";


import jquery from "jquery";
import Dashboard from "../pages/Dashboard/Dashboard";
jest.mock("jquery", () => ({
  ajax: jest.fn((options) => options.success && options.success()), // Mock success response for DELETE
  get: jest.fn((url, callback) => callback(mockEmployees)), // Mock GET request
}));

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(mockEmployees),
  })
);

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
  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockEmployees),
      })
    );
  
    jquery.get.mockImplementation((url, callback) => callback(mockEmployees));
  
    // Mock window.confirm to always return true (simulate clicking "OK")
    global.confirm = jest.fn(() => true);
  });
  

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

  test("toggles search input visibility", () => {
    render(<Dashboard />);
    const searchButton = screen.getByRole("button", { name: /search/i });

    fireEvent.click(searchButton);
    expect(screen.getByPlaceholderText("Search")).toBeInTheDocument();

    fireEvent.click(searchButton);
    expect(screen.queryByPlaceholderText("Search")).not.toBeInTheDocument();
  });

  test("filters employees based on search query", async () => {
    // Mock both jQuery.get (for initial fetch) and fetch (for search filtering)
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockEmployees),
      })
    );
  
    jquery.get.mockImplementation((url, callback) => callback(mockEmployees));
  
    render(<Dashboard />);
  
    await waitFor(() => {
      expect(screen.getByText("Alice")).toBeInTheDocument();
      expect(screen.getByText("Bob")).toBeInTheDocument();
    });
  
    // Click search button to show the input field
    const searchButton = screen.getByRole("button", { name: /search/i });
    fireEvent.click(searchButton);
  
    // Search for "Alice"
    const searchInput = screen.getByPlaceholderText("Search");
    fireEvent.change(searchInput, { target: { value: "Alice" } });
  
    await waitFor(() => {
      expect(screen.getByText("Alice")).toBeInTheDocument();
    });
  
    // Bob should be filtered out
    await waitFor(() => {
      expect(screen.queryByText("Bob")).not.toBeInTheDocument();
    });
  });


  test("Displays 'No image' if profileImage is missing", async () => {
    jquery.get.mockImplementation((url, callback) => callback(mockEmployees));

    render(<Dashboard />);
    await waitFor(() => {
      expect(screen.getByText("No image")).toBeInTheDocument();
    });
  });
  

  test("Formats startDate correctly in DD/MM/YYYY format", async () => {
    jquery.get.mockImplementation((url, callback) => callback(mockEmployees));

    render(<Dashboard />);
    await waitFor(() => {
      expect(screen.getByText("1/1/2024")).toBeInTheDocument();
      expect(screen.getByText("15/5/2023")).toBeInTheDocument();
    });
  });

  test("navigates to the registration page with employee data when Edit button is clicked", () => {
    render(<Dashboard />);
    
    const editButton = screen.getAllByRole("button", { name: /edit/i })[0];
    fireEvent.click(editButton);

    expect(localStorage.getItem("editEmployee")).toBeTruthy();
    expect(JSON.parse(localStorage.getItem("editEmployee")).name).toBe("Bob");
  });

  
  test("does not delete employee if confirmation is canceled", async () => {
    global.confirm = jest.fn(() => false);
    render(<Dashboard />);

    const deleteButton = screen.getAllByRole("button", { name: /delete/i })[0];
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(jquery.ajax).not.toHaveBeenCalled();
    });
  });

  test("stores employee data in localStorage when edit button is clicked", () => {
    render(<Dashboard />);

    const editButton = screen.getAllByRole("button", { name: /edit/i })[0];
    fireEvent.click(editButton);

    expect(localStorage.getItem("editEmployee")).toBeTruthy();
    expect(JSON.parse(localStorage.getItem("editEmployee")).name).toBe("Bob");
  });
  

  test("logs error and sets employees to an empty array if API response is not an array", async () => {

    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    jquery.get.mockImplementation((url, callback) => callback({ message: "Invalid response" }));
  
    render(<Dashboard />);
  
    await waitFor(() => {

      expect(consoleErrorSpy).toHaveBeenCalledWith("Unexpected response:", { message: "Invalid response" });
      expect(screen.queryByText("Alice")).not.toBeInTheDocument();
      expect(screen.queryByText("Bob")).not.toBeInTheDocument();
      expect(screen.getByText(/No employee data found/i)).toBeInTheDocument();
    });
    consoleErrorSpy.mockRestore();
  });
  
  
});