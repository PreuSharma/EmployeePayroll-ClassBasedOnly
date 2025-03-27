import { fireEvent, render,screen, waitFor } from "@testing-library/react";
import Registration from "../pages/Registration/Registration";

jest.mock("axios",()=>
({
    post: jest.fn(),
    put: jest.fn(),
}));

describe("Employee Registration Testing",()=>{

    test('employee payroll form title', () => {
        render(<Registration/>);
        const element=screen.getByText(/Employee Payroll Form/i);
        expect(element).toBeInTheDocument();
    })   
    
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
  
      test("submits the form", () => {
        render(<Registration />);
        const submitButton = screen.getByText("Submit");
        fireEvent.click(submitButton);
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
    
})