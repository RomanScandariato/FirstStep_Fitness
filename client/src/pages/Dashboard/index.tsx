import { Button, Container, ListGroup } from 'react-bootstrap';
import { Workout } from '../../interfaces';
import { useEffect, useState } from 'react';

import { useQuery } from '@apollo/client';
import { GET_USER_EXERCISES } from '../../graphql/queries';
import { useMutation } from '@apollo/client';
import { DELETE_EXERCISE } from '../../graphql/mutations';
import EditExercise from '../../components/EditExercise';


function WorkoutPlan() {

  const { loading, error, data, refetch } = useQuery(GET_USER_EXERCISES);
  const [showModal, setShowModal] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState<Workout | null>(null);
  const [deleteExercise] = useMutation(DELETE_EXERCISE);

  useEffect(() => {
    refetch();
  }, []);

  const handleShowModal = (exercise: Workout) => {
    setSelectedExercise(exercise);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedExercise(null);
  };

  const handleDelete = async (id: string) => {
    try {
      const { data } = await deleteExercise({ variables: { id } });
      if (data.deleteExercise.success) {
        refetch();
      } else {
        console.log('Failed to delete exercise:', data.deleteExercise.message);
      }
    } catch (error) {
      console.log('Error deleting exercise:', error);
    }
  };


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Container fluid style={{ backgroundImage: 'url(/images/add_workout_image.png)', backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh', marginTop: '-50px' }}>
      <h1 className="workout-plan-header text-center my-5" style={{ fontWeight: 'bold', color: 'black' }}>My Workout Plan</h1>

      {data.getUserExercises && data.getUserExercises.length > 0 ? (
        <ListGroup className="exercise-list" style={{ paddingBottom: '20px' }}>
        {data.getUserExercises.map((workout: Workout, index: number) => (
          <ListGroup.Item key={index} className="exercise-card">
          <h4 style={{ fontWeight: 'bold' }}>{workout.name}</h4>
          <p>Muscle: {workout.muscle}</p>
          <p>Difficulty: {workout.difficulty}</p>
          <details className="flex-fill" style={{ marginBottom: '10px' }}>
            <summary>Instructions: </summary>
            {workout.instructions}
          </details>
          <Button variant="secondary" onClick={() => handleShowModal(workout)} className="plan-button edit-button" style={{ padding: '10px 20px', fontSize: '14px' }}>Edit</Button>
          <span style={{ margin: '0 10px' }}></span>
          <button className="plan-button delete-button" style={{ padding: '10px 20px', fontSize: '14px' }} onClick={() => handleDelete(workout._id)}>Delete</button>
          </ListGroup.Item>
        ))}
        </ListGroup>
      ) : (
        <p>No workouts added yet!</p>
      )}
      {selectedExercise && (
        <EditExercise
        show={showModal}
        handleClose={handleCloseModal}
        exercise={selectedExercise}
        refetch={refetch}
        />
      )}
      </Container>
    );
}

export default WorkoutPlan;
