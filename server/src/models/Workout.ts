import { Schema, model, Document } from 'mongoose';

interface Exercise {
  name: string;
  type: string;
  muscle: string;
  equipment: string;
  difficulty: string;
  instructions: string;
}

interface WorkoutDocument extends Document {
  name: string;
  exercises: Exercise[];
}

const ExerciseSchema = new Schema<Exercise>({
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

const WorkoutSchema = new Schema<WorkoutDocument>({
  name: {
    type: String,
    required: true
  },
  exercises: {
    type: [ExerciseSchema],
    required: true
  }
});

const Workout = model<WorkoutDocument>('Workout', WorkoutSchema);

export default Workout;