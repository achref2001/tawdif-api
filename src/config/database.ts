import mongoose from 'mongoose';

// Function to connect to the database
export const connectDatabase = async () => {
  // Check if the MongoDB URI is defined
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.error('MongoDB connection URI is not defined in environment variables.');
    process.exit(1); // Exit the process if the URI is not defined
  }

  try {
    await mongoose.connect(uri);
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1); // Exit the process if the connection fails
  }
};
