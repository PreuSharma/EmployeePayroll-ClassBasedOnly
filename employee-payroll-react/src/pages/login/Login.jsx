
import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
const clientId = "618248214889-qd4nlr31ko28ghslq5pi17986ihtvaav.apps.googleusercontent.com";

const Login = () => {
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div>
        <h2>SSO Login with Google</h2>
        <GoogleLogin
          onSuccess={(response) =>{ 
            const decode=jwtDecode(response.credential)
            console.log("Login Success:", decode)}}
          onError={() => console.log("Login Failed")}
        />
      </div>
    </GoogleOAuthProvider>
  );
};

export default Login;