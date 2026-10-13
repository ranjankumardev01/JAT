
import express from "express";
import "dotenv/config";
import emailAccountRouter from "./src/routers/email.acount.router.js";
import mongoose from "mongoose";
import userRouter from "./src/routers/user.router.js";
import authRouter from "./src/routers/auth.router.js";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(express.json());


// CORS configuration
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Health check
app.get("/", (req, res) => {
  res.send("Working, health is good");
});

// User routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/email-accounts",emailAccountRouter);

// Connect to MongoDB and start the server
const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGOO_URI );

    console.log("MongoDB connected successfully");

    app.listen(port, () => {
      console.log(`Server is listening on port: ${port}`);
    });
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

startServer();
