import { Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-light">
      <Container className="d-flex justify-content-between align-items-center py-4">
        <p className="mb-0">
          &copy; {currentYear} - All Rights Reserved
        </p>
        <div className="d-flex align-items-center">
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="me-3 text-dark"
            aria-label="Instagram"
          >
            <FontAwesomeIcon icon={faInstagram} size="lg" />
          </a>
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-dark"
            aria-label="Facebook"
          >
            <FontAwesomeIcon icon={faFacebook} size="lg" />
          </a>
        </div>
        <p className="mb-0">
          Dev & Design by Roman Scandariato, Matt Oshea, Matt Morgan, Razieh Zarrabi
        </p>
      </Container>
    </footer>
  );
}

export default Footer;