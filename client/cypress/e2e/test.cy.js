import { faker } from "@faker-js/faker";

const username = faker.person.firstName();

function loginUser(cy) {
  cy.visit('/login');
  
  cy.get('input[name="email"]').type(username + '@test.com');
  cy.get('input[name="password"]').type('password123');

  cy.get('form button').click();
}

function addExerciseToPlan(cy) {
  cy.get('nav a[href="/workout"]').click();

  cy.get('input[name="name"]').type('Custom Bench');

  cy.get('input[name="muscle"]').type('Chest');

  cy.get('input[name="difficulty"]').type('Beginner');

  cy.get('textarea[name="instructions"]').type('Custom Bench Instructions');

  cy.get('form button').click();

  cy.get('h4').contains('Custom Bench');
}

describe('Tests', () => {
  it('Should show the homepage hero', () => {
    cy.visit('/')

    cy.get('h1').contains('Elevate Your Fitness Journey');
  });

  it('should be able to navigate to the register page', () => {
    cy.visit('/')

    cy.get('nav a[href="/register"]').click();

    cy.get('form h2').contains('Register');

  });

  it('Should register a new user', () => {

    cy.visit('/register');

    cy.get('input[name="username"]').type(username);

    cy.get('input[name="email"]').type(username + '@test.com');

    cy.get('input[name="password"]').type('password123');

    cy.get('form button').click();
  });

  it('Should log out a user', () => {
    loginUser(cy);

    cy.get('nav a').contains('Profile Menu').click();

    cy.get('nav a').contains('Log Out').click();

    cy.get('h1').contains('Elevate Your Fitness Journey');
  })

  it('Should log in an existing user', () => {
    loginUser(cy);

    cy.get('h1').contains('My Workout Plan');
  });

  it('Should search for an exercise', () => {
    loginUser(cy);

    cy.contains('nav a', 'Home').click();

    cy.get('input[name="search"]').type('chest');

    cy.get('button').contains('Search').click();

    cy.get('h4').contains('Chest');

  });

  it('Should allow user to add exercise through form', () => {
    loginUser(cy);

    addExerciseToPlan(cy);
  });

  it('Should allow user to edit exercise in plan', () => {
    loginUser(cy);

    cy.get('button').contains('Edit').click();

    cy.get('input[name="name"]').type(' 1');

    cy.get('button').contains('Save Changes').click();

    cy.get('h4').contains('Custom Bench 1');
  });

  it('Should allow user to delete exercise in plan', () => {
    loginUser(cy);

    cy.get('button').contains('Delete').click();

    cy.get('p').contains('No workouts added yet!');
  });
});
