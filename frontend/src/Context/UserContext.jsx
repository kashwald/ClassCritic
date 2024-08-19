// UserContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";
import { parseCookies, setCookie, destroyCookie } from 'nookies'; // Use 'nookies' for cookie handling

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [email, setEmail] = useState('');

  useEffect(() => {
    // Retrieve the token from cookies
    const cookies = parseCookies();
    const token = cookies.token;

    if (token) {
      // Decode the token to get the email
      try {
        const decodedToken = jwtDecode(token);
        const email = decodeURIComponent(decodedToken.emailAddr);
        setEmail(email);
      } catch (error) {
        console.error('Invalid token:', error);
      }
    }
  }, []);

  return (
    <UserContext.Provider value={{ email, setEmail }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

export default UserProvider;