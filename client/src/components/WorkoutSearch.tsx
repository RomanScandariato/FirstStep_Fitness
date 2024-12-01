import { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { SEARCH_EXERCISES } from '../graphql/queries';
import { SAVE_WORKOUT } from '../graphql/mutations';

function WorkoutSearch({ query, isLoggedIn }: { query: string; isLoggedIn: boolean }) {
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
      <h1 className="exercise-title">Chest Exercises</h1>
      {loading && <p>Loading...</p>}
      {data && (
        <div className="exercise-list" style={{ paddingBottom: '20px' }}>
          {data.searchExercises.map((exercise: any) => (
            <div key={exercise.name} className="exercise-card">
              <h4>{exercise.name}</h4>
              <p>Muscle: {exercise.muscle}</p>
              <p>Difficulty: {exercise.difficulty}</p>
              <button onClick={() => handleSelectExercise(exercise)}>
                {isLoggedIn ? 'Add to Workout Plan' : 'Log in to Add'}
              </button>
            </div>
          ))}
        </div>
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