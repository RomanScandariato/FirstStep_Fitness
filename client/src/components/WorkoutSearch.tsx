import { useEffect} from 'react';
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

  useEffect(() => {
    if (query) {
      refetch({ muscle: query });
    }
  }, [query]);

  const handleSaveExercise = (exercise: any) => {
    if (!state.user) {
      navigate('/login');
    }
   
    addExercise({ variables: exercise });
  };



  return (
    <div>
      <h1 className="exercise-title">{query ? `${query.charAt(0).toUpperCase() + query.slice(1)} Exercises` : 'Exercises'}</h1>
      {loading && <p>Loading...</p>}
      {data && (
        <div className="exercise-list" style={{ paddingBottom: '20px' }}>
          {data.searchExercises.map((exercise: any) => (
            <div key={exercise.name} className="exercise-card">
              <h4>{exercise.name}</h4>
              <p>Muscle: {exercise.muscle}</p>
              <p>Difficulty: {exercise.difficulty}</p>
              <button onClick={() => handleSaveExercise(exercise)}>
                {state.user ? 'Add Exercise' : 'Log in to Add'}
              </button>
            </div>
          ))}
        </div>
      )}
    
    </div>
  );
}

export default WorkoutSearch;