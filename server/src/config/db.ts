import mongoose from 'mongoose';
import FloodReport from '../models/FloodReport';
import { INITIAL_FLOOD_REPORTS } from '../data/seedData';

let isConnected = false;

export const isDBConnected = (): boolean => {
  return mongoose.connection.readyState === 1;
};

export const connectDB = async (): Promise<void> => {
  const uri = process.env.MONGODB_URI;

  if (!uri || uri.includes('<username>')) {
    console.log('[Database Notice]: No valid MongoDB Atlas URI found in .env. Operating in resilient embedded storage mode.');
    return;
  }

  try {
    const conn = await mongoose.connect(uri);
    isConnected = true;
    console.log(`[MongoDB Atlas Connected]: ${conn.connection.host} (${conn.connection.name})`);

    // Auto seed if empty
    const count = await FloodReport.countDocuments();
    if (count === 0) {
      console.log('[Database Seeder]: No reports found. Seeding initial Sri Lankan flood reports...');
      await FloodReport.insertMany(INITIAL_FLOOD_REPORTS);
      console.log(`[Database Seeder]: Successfully seeded ${INITIAL_FLOOD_REPORTS.length} flood reports.`);
    } else {
      console.log(`[Database Ready]: Found ${count} flood reports in MongoDB.`);
    }
  } catch (error: any) {
    console.warn(`[MongoDB Connection Notice]: ${error.message}`);
    console.log('[Database Fallback]: Operating with embedded Sri Lankan flood dataset.');
  }
};
