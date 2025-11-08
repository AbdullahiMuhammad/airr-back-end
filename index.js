import dotenv from "dotenv";
dotenv.config();
import express from 'express';
import cors from 'cors';
import connectDB from './db/db.js';
import authRoute from './routes/authRouter.js';
import userRouter from "./routes/userRouter.js";
import organizationRoutes from './routes/organizationRoutes.js';
import investigationRoutes from "./routes/investigationRoutes.js";
import roleRoutes from "./routes/roleRoutes.js";
import incidentReportRoutes from './routes/incidentReportRoutes.js';
import incidentRoutes from './routes/incidentRoutes.js';
import incidentAlertRouter from "./routes/incidentAlertsRoutes.js";
import branchRouter from "./routes/branchRoutes.js";
import agencyRoutes from "./routes/agencyRoutes.js";

const app = express();
connectDB();
app.use(express.json());
// Define allowed origins
const allowedOrigins = [
  'https://airr-front.vercel.app', // Your frontend domain
];

// CORS configuration
const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin)) {
      callback(null, true);  // Allow the request
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Allow specific HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'],  // Allow specific headers
  credentials: true, // If you want to allow cookies or authentication headers
};

// Use the CORS middleware
app.use(cors(corsOptions));





app.use('/api/auth', authRoute);
app.use('/api/user', userRouter);
app.use('/api/organizations', organizationRoutes);
app.use("/api/investigations", investigationRoutes);
app.use("/api/roles", roleRoutes);
app.use('/api/reports', incidentReportRoutes);
app.use('/api/incident', incidentRoutes);
app.use('/api/agency', agencyRoutes);
app.use('/api/branch', branchRouter);
app.use('/api/incident-alerts', incidentAlertRouter);

app.get('/', (req, res) => {
  res.status(200).json({ success: true });
});

export default app;
