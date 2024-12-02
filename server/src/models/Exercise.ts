import { Schema, model, Document } from 'mongoose';

interface ExerciseDocument extends Document {
  name: string;
  muscle: string;
  difficulty: string;
  instructions: string;
}

const ExerciseSchema = new Schema<ExerciseDocument>({
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


const Exercise = model<ExerciseDocument>('Exercise', ExerciseSchema);

export default Exercise;