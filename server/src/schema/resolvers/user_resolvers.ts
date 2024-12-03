import dotenv from 'dotenv';
import axios from 'axios';
import Exercise from '../../models/Exercise.js';
import User from '../../models/User.js';
import { GraphQLError } from 'graphql';

dotenv.config();


const user_resolvers = {
    Query: {
        async searchExercises(_: any, { muscle }: { muscle: string }, context: any) {

            try {
                const response = await axios.get(`https://api.api-ninjas.com/v1/exercises?muscle=${muscle}`, {
                    headers: { 'X-Api-Key': process.env.API_NINJAS_KEY }
                });
                // const user = await User.findById(context.req.user._id).populate('exercises');

                // const exercises = response.data.filter((exercise: any) => !user?.exercises.find((e: any) => e.name === exercise.name));

                let exercises = response.data;

                if (context.req.user) {
                    const user = await User.findById(context.req.user._id).populate('exercises');
                    exercises = exercises.filter((exercise: any) => user && !user.exercises.find((e: any) => e.name === exercise.name));
                }
                return exercises;
            } catch (error) {
                console.error('Error fetching exercises:', error);
                throw new Error('Failed to fetch exercises');
            }
        },
        async getUserExercises(_: any, __: any, context: any) {
            if (!context.req.user) {
                throw new GraphQLError('You must be logged in to view your workouts');
            }
            try {
                await context.req.user.populate('exercises');
                return context.req.user.exercises;
            } catch (error) {
                console.error('Error fetching user workouts:', error);
                throw new Error('Failed to fetch user workouts');
            }
        }
    },

    Mutation: {
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
        },
        async deleteExercise(_: any, { id }: { id: string }, context: any) {
            if (!context.req.user) {
                throw new GraphQLError('You must be logged in to delete a workout');
            }
            try {
                const exercise = await Exercise.findById(id);
                if (!exercise) {
                    throw new GraphQLError('Exercise not found');
                }

                await Exercise.findByIdAndDelete(id);
                context.req.user.exercises = context.req.user.exercises.filter((exerciseId: string) => exerciseId !== id);
                await context.req.user.save();

                return { success: true, message: 'Exercise deleted successfully' };
            } catch (error) {
                console.error('Error deleting exercise:', error);
                throw new Error('Failed to delete exercise');
            }
        },

        async updateExercise(_: any, { id, name, muscle, difficulty, instructions }: { id: string, name: string, muscle: string, difficulty: string, instructions: string }, context: any) {
            if (!context.req.user) {
                throw new GraphQLError('You must be logged in to update a workout');
            }
            try {
                const exercise = await Exercise.findById(id);
                if (!exercise) {
                    throw new GraphQLError('Exercise not found');
                }
                exercise.name = name;
                exercise.muscle = muscle;
                exercise.difficulty = difficulty;
                exercise.instructions = instructions;
                await exercise.save();

                return { success: true, message: 'Exercise updated successfully' };
            } catch (error) {
                console.error('Error updating exercise:', error);
                throw new Error('Failed to update exercise');
            }
        }
    }
}

export default user_resolvers;