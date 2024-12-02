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
      type
      muscle
      equipment
      difficulty
      instructions
    }
  }
`;

export const GET_EXERCISES = gql`
  query GetExercises {
    getExercises {
      name
        name
        muscle
        difficulty
        instructions
      }
    }
  
`;