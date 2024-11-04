import mongoose from 'mongoose';

export const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log('Database connected successfully successfully');
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  }
};
