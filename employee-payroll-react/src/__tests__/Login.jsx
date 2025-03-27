import { render, screen } from "@testing-library/react";
import Login from "../pages/login/Login";

jest.mock("jwt-decode", () => ({
  jwtDecode: jest.fn(),
}));

jest.mock("@react-oauth/google", () => ({
  GoogleOAuthProvider: ({ children }) => <div>{children}</div>,
  GoogleLogin: ({ onSuccess, onError }) => (
    <button onClick={() => onSuccess({ credential: "fake-token" })}>
      Mock Google Login
    </button>
  ),
}));

describe("Login Component Testing", () => {
  
  test("renders the login heading", () => {
    render(<Login />);
    expect(screen.getByText(/SSO Login with Google/i)).toBeInTheDocument();
  });

  test("renders the Google login button", () => {
    render(<Login />);
    expect(screen.getByRole("button", { name: /mock google login/i })).toBeInTheDocument();
  });
});
