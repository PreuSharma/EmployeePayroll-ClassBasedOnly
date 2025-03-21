import { render,screen } from "@testing-library/react";
import EmployeePayrollDashboard from "../components/EmployeePayrollDashboard/EmployeePayrollDashboard";

test('render dashboard container', () => {
    render(<EmployeePayrollDashboard/>);

    const element=screen.getByText(/Dashboard container/i);
    expect(element).toBeInTheDocument();
})


test('render navbar container', () => {
    render(<Navbar/>);

    const logoImage = screen.getByAltText("Company Logo");
    expect(logoImage).toBeInTheDocument();

    const element=screen.getByText(/EMPLOYEE PAYROLL/i);
    expect(element).toBeInTheDocument();
})

