
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

mongoose.connect(process.env.MONGODB_URL ||'mongodb://localhost:27017/firststep_fitness');

export default mongoose.connection;