import { fireEvent, render, screen } from "@testing-library/react";
import EmployeeDashboard from "../pages/EmployeeDashboard/EmployeeDashboard";
import $ from "jquery";

// Mocking jQuery Ajax method
jest.mock("jquery", () => ({
  ajax: jest.fn(),
}));

describe("Employee Dashboard Testing", () => {

  test("Employee Payroll Dashboard title", () => {
    render(<EmployeeDashboard />);
    const titleElement = screen.getByText(/Employee Details/i);
    expect(titleElement).toBeInTheDocument();
  });

  test("fetch employee data", async () => {
    const mockEmployeeData = [
      { id: 1, name: "John Doe", gender: "Male", department: "Engineering", salary: "$5000", startDate: "2023-01-15" },
    ];

    $.ajax.mockImplementation(({ success }) => success(mockEmployeeData));

    render(<EmployeeDashboard />);
    
    expect(await screen.findByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Engineering")).toBeInTheDocument();
    expect(screen.getByText("$5000")).toBeInTheDocument();
  });

  test("search employee", async () => {
    render(<EmployeeDashboard />);
    const searchInput = screen.getByPlaceholderText("Search");
    fireEvent.change(searchInput, { target: { value: "John" } });

    expect(searchInput.value).toBe("John");
  });

  test("allows user to select a profile image", () => {
    render(<EmployeeDashboard />);
    const profileImage = screen.getByDisplayValue("img1");
    fireEvent.click(profileImage);
    expect(profileImage.checked).toBe(true);
  });

  test("allows user to select gender", () => {
    render(<EmployeeDashboard />);
    const maleRadio = screen.getByDisplayValue("male");
    fireEvent.click(maleRadio);
    expect(maleRadio.checked).toBe(true);
  });

  test("allows user to select department(s)", () => {
    render(<EmployeeDashboard />);
    const hrCheckbox = screen.getByDisplayValue("HR");
    fireEvent.click(hrCheckbox);
    expect(hrCheckbox.checked).toBe(true);
  });

  test("submits the form", () => {
    render(<EmployeeDashboard />);
    const submitButton = screen.getByText("Submit");
    fireEvent.click(submitButton);
  });

  test("resets the form when reset button is clicked", () => {
    render(<EmployeeDashboard />);
    const resetButton = screen.getByText("Reset");
    fireEvent.click(resetButton);
  });

});
