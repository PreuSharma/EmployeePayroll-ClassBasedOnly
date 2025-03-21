import { render,screen } from "@testing-library/react";

describe("Employee Registration Testing",()=>{
    test('employee payroll form', () => {
        render(<EmployeePayrollRegistration/>);
        const element=screen.getByText(/Employee Payroll Form/i);
        expect(element).toBeInTheDocument();
      
    })
    
})