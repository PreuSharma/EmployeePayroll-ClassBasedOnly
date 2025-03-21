import { render,screen } from "@testing-library/react";

test('render dashboard container', () => {
    render(<EmployeePayrollDashboard/>);
    const element=screen.getByText(/Dashboard container/i);
    expect(element).toBeInTheDocument();
  
})
