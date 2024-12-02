import { gql } from '@apollo/client';

export const GET_USER = gql`
  query GetUser {
    getUser {
      user {
        _id
        username
      }
    }
  }
`;

export const SEARCH_EXERCISES = gql`
  query SearchExercises($muscle: String!) {
    searchExercises(muscle: $muscle) {
      name
      muscle
      difficulty
      instructions
    }
  }
`;

export const GET_USER_EXERCISES = gql`
  query GetUserExercises {
    getUserExercises {
        _id
        name
        muscle
        difficulty
        instructions
      }
    }
  
`;