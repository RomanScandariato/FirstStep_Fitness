import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

function AddWorkout() {
  return (
    <section className='centered-section'>
      <Form className='workout-form'>
        <h2 className='form-heading'>Add Workout to Plan</h2>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridName">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Ex: Bench Press" className="form-control-placeholder" />
          </Form.Group>
        </Row>

        <Form.Group className="mb-3" controlId="formGridMuscle">
          <Form.Label>Muscle</Form.Label>
          <Form.Control type="text" placeholder="Ex: Chest" className="form-control-placeholder" />
        </Form.Group>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridDifficulty">
            <Form.Label>Difficulty</Form.Label>
            <Form.Control type="text" placeholder="Ex: Beginner" className="form-control-placeholder" />
          </Form.Group>
        </Row>

        <Form.Group className="mb-3" controlId="formGridInstructions">
          <Form.Label>Instructions</Form.Label>
          <Form.Control as="textarea" rows={3} placeholder="Ex: Bring bar down to chest, then press upwards" className="form-control-placeholder" />
        </Form.Group>
        
        <div className="d-flex gap-2 mb-2">
          <Button variant="dark" size="lg">
            Add
          </Button>
        </div>
      </Form>
    </section>
  );
}

export default AddWorkout;