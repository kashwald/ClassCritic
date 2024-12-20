// UserContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { parseCookies, setCookie, destroyCookie } from "nookies"; // Use 'nookies' for cookie handling

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");

  // Retrieve the token from cookies
  const cookies = parseCookies();
  const token = cookies.token;
  useEffect(() => {
    if (token) {
      // Decode the token to get the email
      try {
        const decodedToken = jwtDecode(token);
        const email = decodeURIComponent(decodedToken.emailAddr);
        const role = decodeURIComponent(decodedToken.role);
        const username = decodeURIComponent(decodedToken.username);
        setEmail(email);
        setRole(role);
        setUsername(username);
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }
  }, [token]);

  return (
    <UserContext.Provider
      value={{ email, setEmail, role, setRole, username, setUsername }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

export default UserProvider;
