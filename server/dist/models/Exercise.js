import { Schema, model } from 'mongoose';
const ExerciseSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    muscle: {
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
const Exercise = model('Exercise', ExerciseSchema);
export default Exercise;
