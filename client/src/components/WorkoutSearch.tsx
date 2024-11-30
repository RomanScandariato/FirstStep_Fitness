import { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { SEARCH_EXERCISES } from '../graphql/queries';
import { SAVE_WORKOUT } from '../graphql/mutations';

function WorkoutSearch({ query }: { query: string }) {
  const [selectedExercises, setSelectedExercises] = useState<any[]>([]);
  const { loading, data, refetch } = useQuery(SEARCH_EXERCISES, {
    variables: { muscle: query },
    skip: !query, // Skip the query initially
  });
  const [saveWorkout] = useMutation(SAVE_WORKOUT);

  useEffect(() => {
    if (query) {
      refetch({ muscle: query });
    }
  }, [query, refetch]);

  const handleSaveWorkout = () => {
    const workoutName = prompt('Enter a name for your workout:');
    if (workoutName) {
      saveWorkout({ variables: { name: workoutName, exercises: selectedExercises } });
    }
  };

  const handleSelectExercise = (exercise: any) => {
    setSelectedExercises([...selectedExercises, exercise]);
  };

  return (
    <div>
      {loading && <p>Loading...</p>}
      {data && (
        <ul>
          {data.searchExercises.map((exercise: any) => (
            <li key={exercise.name}>
              {exercise.name} - {exercise.muscle}
              <button onClick={() => handleSelectExercise(exercise)}>Select</button>
            </li>
          ))}
        </ul>
      )}
      {selectedExercises.length > 0 && (
        <div>
          <h3>Selected Exercises</h3>
          <ul>
            {selectedExercises.map((exercise: any, index: number) => (
              <li key={index}>{exercise.name}</li>
            ))}
          </ul>
          <button onClick={handleSaveWorkout}>Save Workout</button>
        </div>
      )}
    </div>
  );
}

export default WorkoutSearch;