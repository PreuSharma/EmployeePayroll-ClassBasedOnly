import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Registration from "../pages/Registration/Registration";
import toast from "react-hot-toast";
const axios = require("axios");

jest.mock("axios");
jest.mock("axios", () => ({
  post: jest.fn(),
  get: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
}));


jest.mock("react-hot-toast", () => {
  const toast = {
    success: jest.fn(),
    error: jest.fn(),
  };
  return {
    ...toast,
    Toaster: () => <div data-testid="mock-toaster" />,
    default: toast,
  };
});

describe("Employee Registration Testing", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("employee payroll form title", () => {
    render(<Registration />);
    const element = screen.getByText(/Employee Payroll Form/i);
    expect(element).toBeInTheDocument();
  });

  test("allows user to select gender", () => {
    render(<Registration />);
    const maleRadio = screen.getByDisplayValue("male");
    fireEvent.click(maleRadio);
    expect(maleRadio.checked).toBe(true);
  });

  test("allows user to select department(s)", () => {
    render(<Registration />);
    const hrCheckbox = screen.getByDisplayValue("HR");
    fireEvent.click(hrCheckbox);
    expect(hrCheckbox.checked).toBe(true);
  });

  

  test("resets the form when reset button is clicked", () => {
    render(<Registration />);
    const resetButton = screen.getByText("Reset");
    fireEvent.click(resetButton);
  });

  test("validates required fields", () => {
    render(<Registration />);
    const submitButton = screen.getByText("Submit");
    fireEvent.click(submitButton);
    
    expect(screen.getByText("*Name is required.")).toBeInTheDocument();
    expect(screen.getByText("*Please select a profile image.")).toBeInTheDocument();
    expect(screen.getByText("*Please select a gender.")).toBeInTheDocument();
    expect(screen.getByText("*Select at least one department.")).toBeInTheDocument();
    expect(screen.getByText("*Please select a salary.")).toBeInTheDocument();
    expect(screen.getByText("*Start date is required.")).toBeInTheDocument();
  });

  test("allows user to enter a name", () => {
    render(<Registration />);
    const nameInput = screen.getByRole("textbox", { name: /name/i });
    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    expect(nameInput.value).toBe("John Doe");
  });

  test("prevents submission if name is less than 3 characters", () => {
    render(<Registration />);
    const nameInput = screen.getByRole("textbox", { name: /name/i });
    fireEvent.change(nameInput, { target: { value: "Jo" } });
    
    const submitButton = screen.getByText("Submit");
    fireEvent.click(submitButton);
    
    expect(screen.getByText("*Name must be at least 3 characters.")).toBeInTheDocument();
  });

  test("renders the Toaster component", () => {
    render(<Registration />);
    expect(screen.getByTestId("mock-toaster")).toBeInTheDocument();
  });

  test("handles edit mode and pre-fills values", () => {
    localStorage.setItem("editEmployee", JSON.stringify({ name: "Alice" }));
    render(<Registration />);
    const nameInput = screen.getByRole("textbox", { name: /name/i });
    expect(nameInput.value).toBe("Alice");
  });









  test("shows success toast on successful submission", async () => {
    axios.post.mockResolvedValueOnce({ data: { message: "Success" } });
    render(<Registration />);

    fireEvent.change(screen.getByRole("textbox", { name: /name/i }), { target: { value: "John Doe" } });
    fireEvent.click(screen.getByDisplayValue("img1.jpg")); 
    fireEvent.click(screen.getByDisplayValue("male")); 
    fireEvent.click(screen.getByDisplayValue("HR")); 
    fireEvent.change(screen.getByRole("combobox", { name: /salary/i }), { target: { value: "10,000" } });
    fireEvent.change(screen.getByLabelText(/Start Date:/i), { target: { value: "2023-01-01" } });
    fireEvent.click(screen.getByText("Submit"));

    await waitFor(() => expect(axios.post).toHaveBeenCalled());
    expect(toast.success).toHaveBeenCalledWith("Employee added successfully!");
  });

  test("shows error toast on submission failure", async () => {
    axios.post.mockRejectedValueOnce(new Error("Submission failed"));
    render(<Registration />);

    fireEvent.change(screen.getByRole("textbox", { name: /name/i }), { target: { value: "John Doe" } });
    fireEvent.click(screen.getByDisplayValue("img1.jpg")); 
    fireEvent.click(screen.getByDisplayValue("male")); 
    fireEvent.click(screen.getByDisplayValue("HR")); 
    fireEvent.change(screen.getByRole("combobox", { name: /salary/i }), { target: { value: "10,000" } });
    fireEvent.change(screen.getByLabelText(/Start Date:/i), { target: { value: "2023-01-01" } });
    fireEvent.click(screen.getByText("Submit"));

    await waitFor(() => expect(axios.post).toHaveBeenCalled());
    expect(toast.error).toHaveBeenCalledWith("Failed to save employee details");
  });
  

  test("shows generic error message if API fails without a message", async () => {
    axios.post.mockRejectedValueOnce({ response: { data: null } });
    render(<Registration />);
    fireEvent.change(screen.getByRole("textbox", { name: /name/i }), { target: { value: "John Doe" } });
    fireEvent.click(screen.getByDisplayValue("img1.jpg")); 
    fireEvent.click(screen.getByDisplayValue("male")); 
    fireEvent.click(screen.getByDisplayValue("HR")); 
    fireEvent.change(screen.getByRole("combobox", { name: /salary/i }), { target: { value: "10,000" } });
    fireEvent.change(screen.getByLabelText(/Start Date:/i), { target: { value: "2023-01-01" } });
    fireEvent.click(screen.getByText("Submit"));
    await waitFor(() => expect(toast.error).toHaveBeenCalledWith(expect.stringContaining("Failed to save employee details")));
  });


  test("handles API response with no data", async () => {
    axios.post.mockRejectedValueOnce({ response: null });
    render(<Registration />);
    
    fireEvent.change(screen.getByRole("textbox", { name: /name/i }), { target: { value: "John Doe" } });
    fireEvent.click(screen.getByDisplayValue("img1.jpg"));
    fireEvent.click(screen.getByDisplayValue("male"));
    fireEvent.click(screen.getByDisplayValue("HR"));
    fireEvent.change(screen.getByRole("combobox", { name: /salary/i }), { target: { value: "10,000" } });
    fireEvent.change(screen.getByLabelText(/Start Date:/i), { target: { value: "2023-01-01" } });
    fireEvent.click(screen.getByText("Submit"));

    await waitFor(() => expect(axios.post).toHaveBeenCalled());
    expect(toast.error).toHaveBeenCalledWith("Failed to save employee details");
  });

});
