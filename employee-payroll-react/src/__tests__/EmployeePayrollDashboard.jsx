import { render, screen } from "@testing-library/react";
import EmployeePayrollDashboard from "../components/EmployeePayrollDashboard/EmployeePayrollDashboard";

test("render logo", () => {
  render(<EmployeePayrollDashboard />);
  const logoImage = screen.getByAltText("Company Logo");
  expect(logoImage).toBeInTheDocument();
});

test("render employee", () => {
  render(<EmployeePayrollDashboard />);
  const element = screen.getByText(/EMPLOYEE/i);
  expect(element).toBeInTheDocument();
});

test("render payroll", () => {
  render(<EmployeePayrollDashboard />);
  const element2 = screen.getByText(/PAYROLL/i);
  expect(element2).toBeInTheDocument();
});
