import { fireEvent, render,screen } from "@testing-library/react";
import Registration from "../pages/Registration/Registration";

describe("Employee Registration Testing",()=>{

    test('employee payroll form title', () => {
        render(<Registration/>);
        const element=screen.getByText(/Employee Payroll Form/i);
        expect(element).toBeInTheDocument();
    })   


    test("allows user to enter name", () => {
        render(<Registration />);
        const nameInput = screen.getByLabelText("Name:");
        fireEvent.change(nameInput, { target: { value: "John Doe" } });
        expect(nameInput.value).toBe("John Doe");
      });
    
      test("allows user to select a profile image", () => {
        render(<Registration />);
        const profileImage = screen.getByDisplayValue("img1");
        fireEvent.click(profileImage);
        expect(profileImage.checked).toBe(true);
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
    

      test("allows user to select salary", () => {
        render(<Registration />);
        const salarySelect = screen.getByLabelText("Salary:");
        fireEvent.change(salarySelect, { target: { value: "20,000" } });
        expect(salarySelect.value).toBe("20,000");
      });
    
      test("allows user to select start date", () => {
        render(<Registration />);
        const daySelect = screen.getByLabelText("Start Date:");
        fireEvent.change(daySelect, { target: { value: "5" } });
        expect(daySelect.value).toBe("5");
      });
    
      test("allows user to enter notes", () => {
        render(<Registration />);
        const notesTextarea = screen.getByLabelText("Notes:");
        fireEvent.change(notesTextarea, { target: { value: "This is a note." } });
        expect(notesTextarea.value).toBe("This is a note.");
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
    

      
})