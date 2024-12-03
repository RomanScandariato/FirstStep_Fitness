import React, { useState } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_EXERCISE } from '../graphql/mutations';
import { GET_USER_EXERCISES } from '../graphql/queries';

const initialFormData = {
  name: '',
  muscle: '',
  difficulty: '',
  instructions: '',
  errorMessage: ''
};

const AddExercise = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState('');

  const [addExercise] = useMutation(ADD_EXERCISE, {
    refetchQueries: [{ query: GET_USER_EXERCISES }],
  });

  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, muscle, difficulty, instructions } = formData;

    if (!name || !muscle || !difficulty || !instructions) {
      setError('Please fill out all fields.');
      return;
    }

    try {
      await addExercise({ variables: formData });
      setFormData(initialFormData);

      navigate('/plan');
    } catch (error: any) {
      setFormData({
        ...formData,
        errorMessage: error.message
      });
    }

  };

  return (
    <section className='centered-section'>
      <Form className='workout-form' onSubmit={handleSubmit}>
        <h2 className='form-heading'>Add Exercise to Plan</h2>
        {error && <p className="error-message">{error}</p>}
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridName">
            <Form.Label>Exercise Name</Form.Label>
            <Form.Control type="text" placeholder="Ex: Bench Press" name="name" value={formData.name} onChange={handleInputChange} className="form-control-placeholder" />
          </Form.Group>
        </Row>

        <Form.Group className="mb-3" controlId="formGridMuscle">
          <Form.Label>Muscle</Form.Label>
          <Form.Control type="text" placeholder="Ex: Chest" name="muscle" value={formData.muscle} onChange={handleInputChange} className="form-control-placeholder" />
        </Form.Group>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridDifficulty">
            <Form.Label>Difficulty</Form.Label>
            <Form.Control type="text" placeholder="Ex: Beginner" name="difficulty" value={formData.difficulty} onChange={handleInputChange} className="form-control-placeholder" />
          </Form.Group>
        </Row>

        <Form.Group className="mb-3" controlId="formGridInstructions">
          <Form.Label>Instructions</Form.Label>
          <Form.Control as="textarea" rows={3} placeholder="Ex: Bring bar down to chest, then press upwards" name="instructions" value={formData.instructions} onChange={handleInputChange} className="form-control-placeholder" />
        </Form.Group>

        <div className="d-flex gap-2 mb-2">
          <Button variant="dark" size="lg" type="submit">
            Add
          </Button>
        </div>
      </Form>
    </section>
  );
}

export default AddExercise;