// import React, { useState } from 'react'
// import { useAuth } from '../context/AuthProvider'
// import Sidebar from '../dashboard/Sidebar';
// import MyProfile from "../dashboard/MyProfile";
// import MyBlogs from "../dashboard/MyBlogs";
// import CreateBlog from "../dashboard/CreateBlog";
// import UpdateBlog from "../dashboard/UpdateBlog";
// import { Navigate } from "react-router-dom";

// function Dashboard() {
//   const {profile,isAuthenticated}=useAuth();
//   const [component, setComponent] = useState("My Blogs");
//   console.log(profile);
//   console.log(isAuthenticated);

//   if (!isAuthenticated) {
//     return <Navigate to={"/"} />;
//   }g
//   return (
//     <div>
//       <div>
//         <Sidebar component={component} setComponent={setComponent} />
//         {component === "My Profile" ? (
//           <MyProfile />
//         ) : component === "Create Blog" ? (
//           <CreateBlog />
//         ) : component === "Update Blog" ? (
//           <UpdateBlog />
//         ) : (
//           <MyBlogs />
//         )}
//       </div>
//     </div>
//   );
// }

// export default Dashboard



import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthProvider';
import Sidebar from '../dashboard/Sidebar';
import MyProfile from "../dashboard/MyProfile";
import MyBlogs from "../dashboard/MyBlogs";
import CreateBlog from "../dashboard/CreateBlog";
import UpdateBlog from "../dashboard/UpdateBlog";
import { Navigate } from "react-router-dom";

function Dashboard() {
  const { profile, isAuthenticated } = useAuth();
  const [component, setComponent] = useState("My Blogs");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // simulate waiting for AuthProvider to fetch profile
    setTimeout(() => setLoading(false), 500);
  }, []);

  if (loading) {
    return <p>Loading Dashboard...</p>;
  }

  if (!isAuthenticated && !localStorage.getItem("jwt")) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="dashboard">
      <Sidebar component={component} setComponent={setComponent} />

      {component === "My Profile" ? (
        <MyProfile />
      ) : component === "Create Blog" ? (
        <CreateBlog />
      ) : component === "Update Blog" ? (
        <UpdateBlog />
      ) : (
        <MyBlogs />
      )}
    </div>
  );
}

export default Dashboard;
