import mongoose from 'mongoose';

export const connectDB = async (): Promise<void> => {
  const uri = process.env.MONGODB_URI;

  if (!uri || uri.includes('<username>')) {
    console.warn('[Database Notice]: No valid MongoDB Atlas URI found in .env.');
    return;
  }

  try {
    const conn = await mongoose.connect(uri);
    console.log(`[MongoDB Atlas Connected]: ${conn.connection.host} (${conn.connection.name})`);
  } catch (error: any) {
    console.error(`[MongoDB Connection Error]: ${error.message}`);
  }
};
