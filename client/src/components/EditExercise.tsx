import React, { useState, useEffect  } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { UPDATE_EXERCISE } from '../graphql/mutations';

function EditExercise({ show, handleClose, exercise, refetch }: any) {
  const [formData, setFormData] = useState(exercise);
  const [updateExercise] = useMutation(UPDATE_EXERCISE);

  useEffect(() => {
    setFormData(exercise);
  }, [exercise]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(exercise);
    try {
      await updateExercise({ variables: { id: exercise._id, ...formData } });
      refetch();
      handleClose();
    } catch (error) {
      console.error('Error updating exercise:', error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Exercise</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formMuscle">
            <Form.Label>Muscle</Form.Label>
            <Form.Control
              type="text"
              name="muscle"
              value={formData.muscle}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formDifficulty">
            <Form.Label>Difficulty</Form.Label>
            <Form.Control
              type="text"
              name="difficulty"
              value={formData.difficulty}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formInstructions">
            <Form.Label>Instructions</Form.Label>
            <Form.Control
              as="textarea"
              name="instructions"
              value={formData.instructions}
              onChange={handleChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default EditExercise;