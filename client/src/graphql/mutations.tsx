import { gql } from '@apollo/client';

// Auth Mutations
export const REGISTER_USER = gql`
  mutation RegisterUser($username: String, $email: String, $password: String) {
    registerUser(username: $username, email: $email, password: $password) {
      errors
      user {
        _id
        username
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation LoginUser($email: String, $password: String) {
    loginUser(email: $email, password: $password) {
      errors
      user {
        _id
        username
      }
    }
  }
`;

export const LOGOUT_USER = gql`
  mutation LogoutUser {
    logoutUser {
      message
    }
  }
`;


// Workout Mutations


export const ADD_EXERCISE = gql`
  mutation AddExercise($name: String!, $muscle: String!, $difficulty: String!, $instructions: String!) {
    addExercise(name: $name, muscle: $muscle, difficulty: $difficulty, instructions: $instructions) {
      message
    }
  }
`;