import mongoose from 'mongoose';
import './ping'
import User from '../models/user'
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define MONGODB_URI in .env.local');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

try {
  // Attempt to connect to the database
  const conn = await dbConnect();

  console.log('Database connection successful! 🌟');
  
  // Perform a quick ping (find one document in a dummy collection)
  const result = await User.findOne({});
  
  if (result) {
    console.log('✅ Quick test query was successful. 🚀');
  } else {
    console.warn('⚠️ The test query returned no results. This is expected with a fresh connection. 🎉');
  }
} catch (error) {
  console.error('❌ Failed to connect to the database:', error);
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => {
      return mongoose;
    });
  }


  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;