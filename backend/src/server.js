import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js"; // Importing the auth routes
import userRoutes from "./routes/user.route.js"; // Importing the user routes
import { connectDB } from "./lib/db.js"; // Importing the database connection function
import cookieParser from "cookie-parser"; // Importing the cookie parser middleware
import chatRoutes from "./routes/chat.route.js"; // Importing the chat routes
import cors from "cors"; // Importing the CORS middleware
import path from "path"; // Importing the path module

//to use environment variables in the project
dotenv.config();

const app = express();
const PORT = process.env.PORT;
const __dirname = path.resolve(); // Getting the current directory name

app.use(express.json()); // Middleware to parse JSON requests
app.use(cookieParser()); // Middleware to parse cookies

app.use(
  cors({
    origin: "http://localhost:5173", // Allow requests from this origin
    credentials: true, // Allow credentials (cookies, authorization headers, etc.) to be sent with requests
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);

if(process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist"))); // Serve static files from the frontend build directory
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html")); // Serve the index.html file for all other routes
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
