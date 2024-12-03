import { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { SEARCH_EXERCISES } from '../graphql/queries';
import { ADD_EXERCISE } from '../graphql/mutations';
import { useStore } from '../store';
import { useNavigate } from 'react-router-dom';

function WorkoutSearch({ query }: { query: string; }) {
  const { loading, data, refetch } = useQuery(SEARCH_EXERCISES, {
    variables: { muscle: query },
    skip: !query, // Skip the query initially
  });
  const [addExercise] = useMutation(ADD_EXERCISE);
  const navigate = useNavigate();
  const { state } = useStore()!;
  const [addedExercise, setAddedExercise] = useState<string[]>([]);

  useEffect(() => {
    if (query) {
      refetch({ muscle: query });
    }
  }, [query]);

  const handleSaveExercise = async (exercise: any) => {
    if (!state.user) {
      navigate('/login');
    }

    try {
      await addExercise({ variables: exercise });
      setAddedExercise([...addedExercise, exercise.name]);
    } catch {
      console.error('Failed to save exercise');
    }
  };



  return (
    <div>
      <h1 className="exercise-search-all exercise-title mt-5">{query ? `${query.charAt(0).toUpperCase() + query.slice(1)} Exercises` : 'Exercises'}</h1>
      <h5 className='pre-search-text'>Your exercise results will display here after you enter a muscle into the search bar and click 'Search'</h5>
      {loading && <p>Loading...</p>}
      {data && (
        <div className="exercise-list" style={{ paddingBottom: '20px' }}>
          {data.searchExercises.map((exercise: any) => (
            <div key={exercise.name} className="exercise-card">
              <h4>{exercise.name}</h4>
              <p>Muscle: {exercise.muscle}</p>
              <p>Difficulty: {exercise.difficulty}</p>
              <button
                onClick={() => handleSaveExercise(exercise)}
                disabled={addedExercise.includes(exercise.name) || !state.user}
              >
                {!state.user ? 'Log in to Add' : addedExercise.includes(exercise.name) ? 'Added!' : 'Add Exercise'}
              </button>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}

export default WorkoutSearch;