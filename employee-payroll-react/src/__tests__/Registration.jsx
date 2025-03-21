import { render,screen } from "@testing-library/react";
import Registration from "../pages/Registration/Registration";

describe("Employee Registration Testing",()=>{
    test('employee payroll form', () => {
        render(<Registration/>);
        const element=screen.getByText(/Employee Payroll Form/i);
        expect(element).toBeInTheDocument();
    })   
})