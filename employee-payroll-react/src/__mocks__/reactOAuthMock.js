export const GoogleOAuthProvider = ({ children }) => <>{children}</>;

export const GoogleLogin = ({ onSuccess }) => (
  <button data-testid="google-login" onClick={() => onSuccess({ credential: "mocked-jwt-token" })}>
    Google Login
  </button>
);
