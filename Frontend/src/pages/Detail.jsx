// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import { useParams } from "react-router-dom";

// function Detail() {
//   const { id } = useParams();
//   const [blogs, setblogs] = useState({});
//   console.log(blogs);
//   useEffect(() => {
//     const fetchblogs = async () => {
//       try {
//         const { data } = await axios.get(
//           `http://localhost:4001/api/blogs/single-blog/${id}`,
//           // `https://bloged-11.onrender.com/api/blogs/single-blog/${id}`,

//           {
//             withCredentials: true,
//             headers: {
//                 "Content-Type": "application/json",
//             },
//           }
//         );
//         console.log(data);
//         setblogs(data);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     fetchblogs();
//   }, [id]);
//   return (
//     <div>
//       <div>
//         {blogs && (
//           <section className="container mx-auto p-4">
//             <div className="text-blue-500 uppercase text-xs font-bold mb-4">
//               {blogs?.category}
//             </div>
//             <h1 className="text-4xl font-bold mb-6">{blogs?.title}</h1>
//             <div className="flex items-center mb-6">
//               <img
//                 src={blogs?.adminPhoto}
//                 alt="author_avatar"
//                 className="w-12 h-12 rounded-full mr-4"
//               />
//               <p className="text-lg font-semibold">{blogs?.adminName}</p>
//             </div>

//             <div className="flex flex-col md:flex-row">
//               {blogs?.blogImage && (
//                 <img
//                   src={blogs?.blogImage?.url}
//                   alt="mainblogsImg"
//                   className="md:w-1/2 w-full h-[500px] mb-6 rounded-lg shadow-lg cursor-pointer border"
//                 />
//               )}
//               <div className="md:w-1/2 w-full md:pl-6">
//                 <p className="text-lg mb-6">{blogs?.about}</p>
//                 {/* Add more content here if needed */}
//               </div>
//             </div>
//           </section>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Detail;



////////11111111//////////////


// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import { useParams } from "react-router-dom";
// import { BACKEND_URL } from "../utils"; // ✅ import backend URL

// function Detail() {
//   const { id } = useParams();
//   const [blogs, setBlogs] = useState({});
//   console.log(blogs);

//   useEffect(() => {
//     const fetchBlogs = async () => {
//       try {
//         const { data } = await axios.get(
//           `${BACKEND_URL}/api/blogs/single-blog/${id}`, // ✅ updated URL
//           {
//             withCredentials: true,
//             headers: {
//               "Content-Type": "application/json",
//             },
//           }
//         );
//         console.log(data);
//         setBlogs(data);
//       } catch (error) {
//         console.log(error);
//         toast.error("Failed to fetch blog details");
//       }
//     };
//     fetchBlogs();
//   }, [id]);

//   return (
//     <div>
//       {blogs && (
//         <section className="container mx-auto p-4">
//           <div className="text-blue-500 uppercase text-xs font-bold mb-4">
//             {blogs?.category}
//           </div>
//           <h1 className="text-4xl font-bold mb-6">{blogs?.title}</h1>
//           <div className="flex items-center mb-6">
//             <img
//               src={blogs?.adminPhoto}
//               alt="author_avatar"
//               className="w-12 h-12 rounded-full mr-4"
//             />
//             <p className="text-lg font-semibold">{blogs?.adminName}</p>
//           </div>

//           <div className="flex flex-col md:flex-row">
//             {blogs?.blogImage && (
//               <img
//                 src={blogs?.blogImage?.url}
//                 alt="mainblogsImg"
//                 className="md:w-1/2 w-full h-[500px] mb-6 rounded-lg shadow-lg cursor-pointer border"
//               />
//             )}
//             <div className="md:w-1/2 w-full md:pl-6">
//               <p className="text-lg mb-6">{blogs?.about}</p>
//               {/* Add more content here if needed */}
//             </div>
//           </div>
//         </section>
//       )}
//     </div>
//   );
// }

// export default Detail;


//////////////2/2/////////////
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { BACKEND_URL } from "../utils"; // backend URL

function Detail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const { data } = await axios.get(
          `${BACKEND_URL}/api/blogs/single-blog/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${localStorage.getItem("jwt")}`,
            },
          }
        );

        console.log("API response:", data);
        // handles both shapes { blog: {...} } or direct object
        setBlog(data.blog || data);
      } catch (error) {
        console.error(
          "Blog fetch error:",
          error.response?.data || error.message
        );
        toast.error("Failed to fetch blog details");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-xl">
        Loading blog details...
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="flex items-center justify-center h-screen text-xl text-red-500">
        Blog not found!
      </div>
    );
  }

  return (
    <section className="container mx-auto p-4">
      <div className="text-blue-500 uppercase text-xs font-bold mb-4">
        {blog?.category}
      </div>
      <h1 className="text-4xl font-bold mb-6">{blog?.title}</h1>

      {/* Author */}
      <div className="flex items-center mb-6">
        {blog?.adminPhoto && (
          <img
            src={blog?.adminPhoto}
            alt="author_avatar"
            className="w-12 h-12 rounded-full mr-4"
          />
        )}
        <p className="text-lg font-semibold">{blog?.adminName}</p>
      </div>

      {/* Blog Content */}
      <div className="flex flex-col md:flex-row">
        {blog?.blogImage && (
          <img
            src={blog?.blogImage?.url || blog?.blogImage}
            alt="mainblogsImg"
            className="md:w-1/2 w-full h-[500px] mb-6 rounded-lg shadow-lg cursor-pointer border"
          />
        )}
        <div className="md:w-1/2 w-full md:pl-6">
          <p className="text-lg mb-6">{blog?.about}</p>
        </div>
      </div>
    </section>
  );
}

export default Detail;
