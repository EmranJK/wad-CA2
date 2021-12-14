import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "./authContext";

const LoginPage = (props) => {
  const context = useContext(AuthContext);

  const login = () => {
    const username = Math.random().toString(36).substring(7);
    const user = document.getElementById('uname').value
    // console.log(user)
    const pass = document.getElementById('psw').value
    context.authenticate(user, pass);
  };

  // Set 'from' to the path where browser is redirected after a successful login.
  // Either / or the protected path user tried to access.
  const { from } = props.location.state || { from: { pathname: "/" } };

  return context.isAuthenticated ? (
    <Redirect to={from} />
  ) : (
    <>
      <h2>Login page</h2>
      <p>You must log in to view the protected pages </p>
      {/* Login web form  */}
      
      <input type="text" placeholder="Enter Username" name="uname" id="uname" required></input>
      <input type="password" placeholder="Enter Password" name="psw" id="psw" required></input>
      <button onClick={login}>Submit</button>
    </>
  );
};

export default LoginPage;
