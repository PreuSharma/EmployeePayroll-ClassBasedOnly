import React, { Component } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import "./Login.scss"; 
import toast, { Toaster } from "react-hot-toast";
import Navbar from "../../components/Navbar/Navbar";



const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
    };
  }

  handleSuccess = (response) => {
    const decode = jwtDecode(response.credential);

    const userData = {
      name: decode.name,
      email: decode.email
  };

  localStorage.setItem("user", JSON.stringify(userData));

    toast.success("Login Successful!");
    setTimeout(() => {
      this.setState({ redirect: true });
    }, 2000);
  };

  handleError = () => {
    toast.error("Login Failed");
  };

  render() {
    if (this.state.redirect) {
      window.location.href = "/homePage/dashboard"; 
      return null;
    }

    return (
      <GoogleOAuthProvider clientId={clientId}>

        {this.state.user && <Navbar user={this.state.user} />}
        <div className="login-container">
          <h2>SSO Login with Google</h2>
          <div className="google-login">
            <GoogleLogin onSuccess={this.handleSuccess} onError={this.handleError} />
          </div>
        </div>
        <Toaster position="top-right" reverseOrder={false} />
      </GoogleOAuthProvider>
    );
  }
}


export default Login;

