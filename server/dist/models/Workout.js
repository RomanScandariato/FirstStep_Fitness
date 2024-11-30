import { Schema, model } from 'mongoose';
const ExerciseSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    muscle: {
        type: String,
        required: true
    },
    equipment: {
        type: String,
        required: true
    },
    difficulty: {
        type: String,
        required: true
    },
    instructions: {
        type: String,
        required: true
    }
});
const WorkoutSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    exercises: {
        type: [ExerciseSchema],
        required: true
    }
});
const Workout = model('Workout', WorkoutSchema);
export default Workout;
