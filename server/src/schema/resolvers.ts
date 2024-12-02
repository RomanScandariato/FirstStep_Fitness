import dotenv from 'dotenv';
import axios from 'axios';
import Exercise from '../models/Exercise.js';

dotenv.config();

import auth_resolvers from './resolvers/auth_resolvers.js';
import { GraphQLError } from 'graphql';



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
  
  async addExercise(_: any, { name, muscle, difficulty, instructions }: { name: string, muscle: string, difficulty: string, instructions: string }, context: any) {
    if (!context.req.user) {
      throw new GraphQLError('You must be logged in to add a workout');
    }
    try {
      const exercise = await Exercise.create({ name, muscle, difficulty, instructions });
      context.req.user.exercises.push(exercise._id);
      await context.req.user.save();
     

      return { success: true, message: 'Workout added successfully' };
    } catch (error) {
      console.error('Error adding workout:', error);
      throw new Error('Failed to add workout');
    }
  }
}
};

export default resolvers;