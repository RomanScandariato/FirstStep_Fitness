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
export const SAVE_WORKOUT = gql`
  mutation SaveWorkout($name: String!, $exercises: [ExerciseInput]!) {
    saveWorkout(name: $name, exercises: $exercises) {
      _id
      name
      exercises {
        name
        type
        muscle
        equipment
        difficulty
        instructions
      }
    }
  }
`;


export const ADD_WORKOUT = gql`
  mutation AddWorkout($name: String!, $muscle: String!, $difficulty: String!, $instructions: String!) {
    addWorkout(name: $name, muscle: $muscle, difficulty: $difficulty, instructions: $instructions) {
      _id
      name
      muscle
      difficulty
      instructions
    }
  }
`;