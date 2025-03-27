import React, { Component } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import "../login/Login.scss"; 
import toast, { Toaster } from "react-hot-toast";
import Navbar from "../../components/Navbar/Navbar";

const clientId = "618248214889-qd4nlr31ko28ghslq5pi17986ihtvaav.apps.googleusercontent.com";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
    };
  }

  handleSuccess = (response) => {
    const decode = jwtDecode(response.credential);
    console.log("Login Success:", decode);

    const userData = {
      name: decode.name,
      email: decode.email
  };
  // Store only name and email in localStorage
  localStorage.setItem("user", JSON.stringify(userData));

    toast.success("Login Successful!");
    setTimeout(() => {
      this.setState({ redirect: true });
    }, 2000);
  };

  handleError = () => {
    console.log("Login Failed");
  };

  render() {
    if (this.state.redirect) {
      window.location.href = "/homePage/dashboard";
      return null;
    }

    return (
      <GoogleOAuthProvider clientId={clientId}>
        {/* <Navbar user={this.state.user} /> */}
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
