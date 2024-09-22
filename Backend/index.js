import express from 'express';
import dotenv from "dotenv";
import mongoose from 'mongoose';
import fileUpload from 'express-fileupload';
import { v2 as cloudinary } from 'cloudinary';
import cookieParser from 'cookie-parser';
import cors from"cors";

import userRoute from "./routes/user.route.js"
import blogRoute from "./routes/blog.route.js"

const app = express();
dotenv.config();

const port =process.env.PORT;
const MONOGO_URL=process.env.MONOG_URI;

//middleware
app.use(express.json());
app.use(cookieParser());
// app.use(
//   cors({
//   origin:process.env.FRONTEND_URL||'http://localhost:5173',
//   credentials:true,
//   methods:["GET","POST","PUT","DELETE"],
// })
// );
// app.options('*', cors());
// const cors = require('cors');
// require('dotenv').config();  // Load environment variables from .env

const allowedOrigins = [
  'http://localhost:5173',  // Development origin
  'https://bloged-olive.vercel.app'  // Production origin
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like curl requests or mobile apps)
      if (!origin) return callback(null, true);
      
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,  // Allow cookies and credentials
    methods: ["GET", "POST", "PUT", "DELETE"]
  })
);

// Handle preflight OPTIONS requests
app.options('*', cors());


app.use(fileUpload({
  useTempFiles:true,
 tempFileDir:"/tmp/"
}))

// DB CODE
try{
 mongoose.connect(MONOGO_URL);
 console.log("Connected to Mongo db");
}catch(error){
  console.log(error);
}

//defining routes
app.use("/api/users",userRoute);
app.use("/api/blogs",blogRoute);

//CLOUDINAARY
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.CLOUD_API_KEY, 
  api_secret: process.env.CLOUD_SECRET_KEY // Click 'View API Keys' above to copy your API secret
});


app.listen(port, () => {
  console.log(`Server is  running on port ${port}`)
})