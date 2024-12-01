import React, { useEffect, useRef } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import WorkoutSearch from '../components/WorkoutSearch';

function Landing() {
  const searchFormRef = useRef<HTMLFormElement>(null);
  const [query, setQuery] = React.useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-slide-in-left');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (searchFormRef.current) {
      observer.observe(searchFormRef.current);
    }

    return () => {
      if (searchFormRef.current) {
        observer.unobserve(searchFormRef.current);
      }
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Trigger the search in WorkoutSearch component
  };


  return (
    <Container>
      <Row>
        <Col className="landing-hero-image" xs="12"></Col>
        <Col  xs="12">
          <h1 className="text-center landing-text">Elevate Your Fitness Journey</h1>

          <form ref={searchFormRef} className="d-flex text-center justify-content-center mt-3" onSubmit={handleSearch}>
            <input
              className="search-form-control form me-2"
              type="search"
              placeholder="Search For Exercises"
              aria-label="Search"
              onChange={handleInputChange}
            />
            <button className="btn btn-outline-dark" type="submit">Search</button>
          </form>

        </Col>
      </Row>
      <WorkoutSearch query={query} />
      <Container>

      <h1>HEYYYY</h1>

      </Container>
    </Container>


  )
}

export default Landing;