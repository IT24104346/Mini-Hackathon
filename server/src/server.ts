import dns from 'dns';
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db';

// Ensure DNS resolves SRV records across all network environments
try {
  dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
} catch (e) {
  // Ignore
}
import floodRoutes from './routes/floodRoutes';
import authRoutes from './routes/authRoutes';
import { notFoundHandler, errorHandler } from './middleware/errorHandler';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoints
app.get(['/api/health', '/health', '/'], (req: Request, res: Response) => {
  res.status(200).json({
    status: 'online',
    system: 'Flood-Safe-LK Community Disaster Management API',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// API Routes (supports both /api/* and root paths)
app.use(['/api/auth', '/auth'], authRoutes);
app.use(['/api/floods', '/floods'], floodRoutes);

// Error Handling
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`🚀 Flood-Safe-LK Server is running on port ${PORT}`);
  console.log(`📡 Health Check: http://localhost:${PORT}/api/health`);
  console.log(`🔐 Auth API:    http://localhost:${PORT}/api/auth/login`);
  console.log(`🌊 Floods API:  http://localhost:${PORT}/api/floods`);
  console.log(`======================================================\n`);
});

export default app;
