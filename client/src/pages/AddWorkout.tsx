import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';


import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_WORKOUT } from '../graphql/mutations'; 
import { GET_EXERCISES } from '../graphql/queries';


const initialFormData = {
  name: '',
  muscle: '',
  difficulty: '',
  instructions: '',
  errorMessage: ''
};



function AddWorkout() {
  const [formData, setFormData] = useState(initialFormData);
  
  const [addWorkout] = useMutation(ADD_WORKOUT, {
    refetchQueries: [{ query: GET_EXERCISES }],
  });
  const navigate = useNavigate();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await addWorkout({ variables: formData });
      setFormData(initialFormData);
     
      navigate('/plan');
    } catch (error: any) {
      setFormData({
        ...formData,
        errorMessage: error.message
      });
    }
  }
  

  return (
    <section className='centered-section'>
      <Form className='workout-form' onSubmit={handleSubmit}>
        <h2 className='form-heading'>Add Workout to Plan</h2>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridName">
            <Form.Control type="text" placeholder="Ex: Bench Press" name="name" onChange={handleInputChange} className="form-control-placeholder" />
          </Form.Group>
        </Row>

        <Form.Group className="mb-3" controlId="formGridMuscle">
          <Form.Control type="text" placeholder="Ex: Chest" name="muscle" onChange={handleInputChange} className="form-control-placeholder" />
        </Form.Group>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridDifficulty">
            <Form.Control type="text" placeholder="Ex: Beginner" name="difficulty" onChange={handleInputChange} className="form-control-placeholder" />
          </Form.Group>
        </Row>

        <Form.Group className="mb-3" controlId="formGridInstructions">
          <Form.Control as="textarea" rows={3} placeholder="Ex: Bring bar down to chest, then press upwards" name="instructions" onChange={handleInputChange} className="form-control-placeholder" />
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

export default AddWorkout;