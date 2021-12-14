import React, { useState, useEffect, createContext } from "react";

export const AuthContext = createContext(null);

const AuthContextProvider = (props) => {
  const [user, setUser] = useState({ username: null, password: null });

  const authenticate = (username, password) => {
    setUser({ username, password });
  };

  const isAuthenticated = ((user.username === "mark" && user.password === "mark123") || (user.username === "john"  && user.password === "john123" ) || (user.username === "clark" && user.password === "clark123") ) ? true : false

  const signout = () => {
    setTimeout(() => setUser( { username: null, password: null } ), 100);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        authenticate,
        signout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
