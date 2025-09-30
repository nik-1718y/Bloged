// import axios from 'axios';
// import React, { createContext, useContext, useEffect, useState } from 'react';
// // import Cookies from "js-cookie"
// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [blogs, setBlogs] = useState();
//   const [profile, setProfile] = useState();
//    const[isAuthenticated,setIsAuthenticated]=useState(false);

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         let token = localStorage.getItem("jwt"); // Retrieve the token directly from the localStorage (Go to login.jsx)
//         console.log(token);
//         //  const token = Cookies.getItem('token');
//         //  const parsedToken=token?JSON.parse(token):undefined;
//         // Making an API call with withCredentials set to true
//         if(token){
//           const { data } = await axios.get("http://localhost:4001/api/users/my-profile", {
//             withCredentials: true, // Allows cookies to be sent with the request
//             headers: {
//                       'Content-Type':'application/json'} // For token-based authentication
          
    
//           });
//           console.log(data);
//           setProfile(data);
//           setIsAuthenticated(true);
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     const fetchBlogs = async () => {
//       try {
//         // const token = localStorage.getItem('token');
//         // Making an API call with withCredentials set to true
//         const { data } = await axios.get("http://localhost:4001/api/blogs/all-blogs", {
//           withCredentials: true, // Allows cookies to be sent with the request
//         //   headers: {
//                         // Authorization: `Bearer ${token}`} // For token-based authentication
        
  
//         });
//         console.log(data);
//         setBlogs(data);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     fetchBlogs();
//     fetchProfile();
//   }, []);

//   return (
//     <AuthContext.Provider value={{ blogs,profile,setProfile,isAuthenticated,setIsAuthenticated }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);





import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../utils";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(`${BACKEND_URL}/api/users/my-profile`, {
          withCredentials: true,
        });
        setUser(data.user);
      } catch (error) {
        console.error(error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    const fetchBlogs = async () => {
      try {
        const { data } = await axios.get(`${BACKEND_URL}/api/blogs/all-blogs`);
        setBlogs(data.blogs);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
    fetchBlogs();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, blogs, setBlogs, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
