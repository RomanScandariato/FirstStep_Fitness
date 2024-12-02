import { Container, ListGroup } from 'react-bootstrap';
import { Workout } from '../../interfaces';

import { useQuery } from '@apollo/client';
import { GET_USER_EXERCISES } from '../../graphql/queries';


function WorkoutPlan() {
 
const { loading, error, data } = useQuery(GET_USER_EXERCISES);
 

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Container>
      <h1>Your Workout Plan</h1>
    
     
      {data.getUserExercises && data.getUserExercises.length > 0 ? (
        <ListGroup>
          {data.getUserExercises.map((workout: Workout, index: number) => (
            <ListGroup.Item key={index}>
              <h4>{workout.name}</h4>
              <p>Muscle: {workout.muscle}</p>
              <p>Difficulty: {workout.difficulty}</p>
              <p>Instructions: {workout.instructions}</p>
            </ListGroup.Item>
          ))}
        </ListGroup>
      ) : (
        <p>No workouts added yet!</p>
      )}
    </Container>
  );
}

export default WorkoutPlan;
