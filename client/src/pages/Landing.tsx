import React, { useEffect, useRef, useState } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import WorkoutSearch from '../components/WorkoutSearch';

function Landing() {
  const searchFormRef = useRef<HTMLFormElement>(null);
  const workoutSearchRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = React.useState('');
  const [searchQuery, setSearchQuery] = useState('');


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchQuery(query);
    if (workoutSearchRef.current) {
      workoutSearchRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

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

  return (
    <Container>
      <Row>
        <Col className="landing-hero-image" xs="12"></Col>
        <Col xs="12">

          <h1 className="text-center landing-text">Elevate Your Fitness Journey</h1>

          <h3 className="text-center landing-text-two mt-5 opacity-75">Start by Searching for your Favorite Exercises!</h3>

          <div className="search-form-container">
            <form ref={searchFormRef} className="d-flex text-center landing-text justify-content-center mt-3" onSubmit={handleSearch}>
              <input
                name="search"
                className="search-form-control form me-2"
                type="search"
                placeholder="Search For Exercises"
                aria-label="Search"
                onChange={handleInputChange}
              />
              <button className="search-button" type="submit">Search</button>
            </form>
          </div>

          <p className="d-flex text-center example-text justify-content-center mt-1 opacity-50">Ex: Biceps, Chest, Quadriceps</p>

        </Col>
      </Row>
      <div ref={workoutSearchRef}>
        <WorkoutSearch query={searchQuery} />
      </div>
    </Container>


  )
}

export default Landing;