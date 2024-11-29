

import { Row, Col, Container } from 'react-bootstrap';




function Landing() {

  return (
    <Container fluid={true}>
      <Row>
        <Col className="landing-hero-image" xs="12" sm="6"></Col>
        <Col className="d-flex flex-column justify-content-center mt-md-4" xs="12" md="6">
          <h1 className="text-center">Elevate Your Fitness Journey</h1>
          {/* <h3 className="text-center fw-light">Embrace the burn, for every drop of sweat is a step closer to strength, resilience, and the best version of yourself!</h3> */}
        </Col>
      </Row>
      <Container>
       


      </Container>
    </Container>


  )
}

export default Landing;