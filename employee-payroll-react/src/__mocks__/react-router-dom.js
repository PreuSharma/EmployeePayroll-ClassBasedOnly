// src/__mocks__/react-router-dom.js

module.exports = {
    useNavigate: jest.fn(() => jest.fn()),
    useLocation: jest.fn(() => ({ pathname: "/" })), 
    useParams: jest.fn(() => ({})),
    BrowserRouter: ({ children }) => <>{children}</>, 
  };
  