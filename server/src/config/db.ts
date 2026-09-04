import mongoose from 'mongoose';
import dns from 'dns';

// Fix for Node.js SRV record lookup failures on local ISP DNS
try {
  dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
} catch (e) {
  // Ignore if not permitted
}

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
