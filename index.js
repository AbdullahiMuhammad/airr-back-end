// Importing required modules
import dotenv from "dotenv";
dotenv.config(); // Loading environment variables from .env file
import express from "express";
import cors from "cors"; // CORS middleware
import connectDB from "./db/db.js"; // MongoDB connection handler
import authRoute from "./routes/authRouter.js"; // Authentication routes
import userRouter from "./routes/userRouter.js"; // User routes
import organizationRoutes from "./routes/organizationRoutes.js"; // Organization routes
import investigationRoutes from "./routes/investigationRoutes.js"; // Investigation routes
import roleRoutes from "./routes/roleRoutes.js"; // Role routes
import incidentReportRoutes from "./routes/incidentReportRoutes.js"; // Incident report routes
import incidentRoutes from "./routes/incidentRoutes.js"; // Incident routes
import incidentAlertRouter from "./routes/incidentAlertsRoutes.js"; // Incident alert routes
import branchRouter from "./routes/branchRoutes.js"; // Branch routes
import agencyRoutes from "./routes/agencyRoutes.js"; // Agency routes

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware to parse incoming JSON requests
app.use(express.json());

// Define allowed origins for CORS
const allowedOrigins = [
  "https://airr-front.vercel.app", // Your frontend domain (add others if needed)
];

// CORS configuration to allow only specified origins
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      // If the request comes from an allowed origin, proceed
      callback(null, true);
    } else {
      // If not allowed, reject the request
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  credentials: true, // Allow cookies or authorization headers
};

// Enable CORS for all routes and allow preflight requests
app.options("*", cors(corsOptions)); // Handle preflight requests (OPTIONS)
app.use(cors(corsOptions)); // Enable CORS middleware

// Define your routes here
app.use("/api/auth", authRoute);
app.use("/api/user", userRouter);
app.use("/api/organizations", organizationRoutes);
app.use("/api/investigations", investigationRoutes);
app.use("/api/roles", roleRoutes);
app.use("/api/reports", incidentReportRoutes);
app.use("/api/incident", incidentRoutes);
app.use("/api/agency", agencyRoutes);
app.use("/api/branch", branchRouter);
app.use("/api/incident-alerts", incidentAlertRouter);

// Test route to check if server is working
app.get("/", (req, res) => {
  res.status(200).json({ success: true });
});

// Global error handling middleware (to catch all errors)
app.use((err, req, res, next) => {
  console.error("Error:", err); // Log the error for debugging
  res.status(500).json({ message: "Internal Server Error" }); // Send error response
});

// Export the app to use in serverless environments like Vercel
export default app;

