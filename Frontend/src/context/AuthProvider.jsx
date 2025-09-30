import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';
// import Cookies from "js-cookie"
export const AuthContext = createContext();
import { BACKEND_URL } from "../utils";

export const AuthProvider = ({ children }) => {
  const [blogs, setBlogs] = useState();
  const [profile, setProfile] = useState();
   const[isAuthenticated,setIsAuthenticated]=useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        let token = localStorage.getItem("jwt"); // Retrieve the token directly from the localStorage (Go to login.jsx)
        console.log(token);
        //  const token = Cookies.getItem('token');
        //  const parsedToken=token?JSON.parse(token):undefined;
        // Making an API call with withCredentials set to true
        if(token){
          const { data } = await axios.get(
            `${BACKEND_URL}/api/users/my-profile`
            // "http://localhost:4001/api/users/my-profile"
            , {
            withCredentials: true, // Allows cookies to be sent with the request
            headers: {
                      'Content-Type':'application/json'} // For token-based authentication
          
    
          });
          console.log(data);
          setProfile(data);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.log(error);
      }
    };
    const fetchBlogs = async () => {
      try {
        // const token = localStorage.getItem('token');
        // Making an API call with withCredentials set to true
        const { data } = await axios.get("http://localhost:4001/api/blogs/all-blogs", {
          withCredentials: true, // Allows cookies to be sent with the request
        //   headers: {
                        // Authorization: `Bearer ${token}`} // For token-based authentication
        
  
        });
        console.log(data);
        setBlogs(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBlogs();
    fetchProfile();
  }, []);

  return (
    <AuthContext.Provider value={{ blogs,profile,setProfile,isAuthenticated,setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);






// import axios from 'axios';
// import React, { createContext, useContext, useEffect, useState } from 'react';

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [blogs, setBlogs] = useState();
//   const [profile, setProfile] = useState();
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   // base URL for API
//   const API_URL = import.meta.env.VITE_API_URL;

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const token = localStorage.getItem("jwt");
//         if (token) {
//           const { data } = await axios.get(`${API_URL}/api/users/my-profile`, {
//             withCredentials: true,
//             headers: {
//               'Content-Type': 'application/json',
//               // Authorization: `Bearer ${token}` // uncomment if backend expects JWT header
//             }
//           });
//           console.log(data);
//           setProfile(data);
//           setIsAuthenticated(true);
//         }
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     const fetchBlogs = async () => {
//       try {
//         const { data } = await axios.get(`${API_URL}/api/blogs/all-blogs`, {
//           withCredentials: true
//         });
//         console.log(data);
//         setBlogs(data);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchBlogs();
//     fetchProfile();
//   }, [API_URL]);

//   return (
//     <AuthContext.Provider value={{ blogs, profile, setProfile, isAuthenticated, setIsAuthenticated }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);
