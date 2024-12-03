import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { useStore } from '../store';
import { LOGOUT_USER } from '../graphql/mutations';
// import { client } from '../main';

function Header() {
  const { state, setState } = useStore()!;
  const [logoutUser] = useMutation(LOGOUT_USER);
  const navigate = useNavigate();

  const handleLogout = async (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    event.preventDefault();

    await logoutUser();

    localStorage.removeItem('workout_token');

    setState((oldState) => ({
      ...oldState,
      user: null
    }));

    navigate('/');
    window.location.reload();
  }
  return (
    <Container>
      <Navbar style={{ paddingTop: '18px', paddingBottom: '18px' }}>
        <Container className="nav-wrap">
          <Navbar.Brand as={NavLink} to="/">FirstStep Fitness</Navbar.Brand>
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/">Home</Nav.Link>

            {state.user ? (
              <>
                <Nav.Link as={NavLink} to="/plan">My Workout Plan</Nav.Link>
                <Nav.Link as={NavLink} to="/workout">Add Exercise</Nav.Link>
                <NavDropdown title="Profile Menu">
                  <NavDropdown.ItemText className="border-bottom mb-2">Welcome, {state.user.username}</NavDropdown.ItemText>
                  <NavDropdown.Item onClick={handleLogout} href="/logout">Log Out</NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <>
                <Nav.Link as={NavLink} to="/about">About</Nav.Link>
                <Nav.Link as={NavLink} to="/contact">Contact</Nav.Link>
                <Nav.Link as={NavLink} to="/register">Register</Nav.Link>
                <Nav.Link as={NavLink} to="/login">Log In</Nav.Link>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>
    </Container>
  )
}

export default Header;
