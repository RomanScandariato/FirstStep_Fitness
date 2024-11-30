import dotenv from 'dotenv';
import axios from 'axios';
import Workout from '../models/Workout.js';

dotenv.config();

import auth_resolvers from './resolvers/auth_resolvers.js';



const resolvers = {
  Query: {
    ...auth_resolvers.Query,
    async searchExercises(_: any, { muscle }: { muscle: string }) {
      try {
        const response = await axios.get(`https://api.api-ninjas.com/v1/exercises?muscle=${muscle}`, {
          headers: { 'X-Api-Key': process.env.API_NINJAS_KEY }
        });
        return response.data;
      } catch (error) {
        console.error('Error fetching exercises:', error);
        throw new Error('Failed to fetch exercises');
      }
    }
  },

  Mutation: {
    ...auth_resolvers.Mutation,
    async saveWorkout(_: any, { name, exercises }: { name: string, exercises: any[] }) {
      try {
        const workout = new Workout({ name, exercises });
        await workout.save();
        return workout;
      } catch (error) {
        console.error('Error saving workout:', error);
        throw new Error('Failed to save workout');
      }
    }
  }
};

export default resolvers;