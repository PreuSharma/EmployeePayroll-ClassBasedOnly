import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Login from "../pages/login/Login";
import { jwtDecode } from "jwt-decode";
import "@testing-library/jest-dom";

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
    expect(
      screen.getByRole("button", { name: /mock google login/i })
    ).toBeInTheDocument();
  });

  test("calls jwtDecode when Google login button is clicked", async () => {
    jwtDecode.mockReturnValue({ name: "John Doe", email: "john@example.com" });

    render(<Login />);
    const googleButton = screen.getByRole("button", { name: /mock google login/i });
    fireEvent.click(googleButton);

    await waitFor(() => {
      expect(jwtDecode).toHaveBeenCalledWith("fake-token");
    });
  });

  test("stores user info in localStorage upon successful login", async () => {
    jwtDecode.mockReturnValue({ name: "John Doe", email: "john@example.com" });
    Storage.prototype.setItem = jest.fn(); 

    render(<Login />);
    fireEvent.click(screen.getByRole("button", { name: /mock google login/i }));

    await waitFor(() => {
      expect(localStorage.setItem).toHaveBeenCalledWith(
        "user",
        JSON.stringify({ name: "John Doe", email: "john@example.com" })
      );
    });
  });

});
