const gql = String.raw;

const typeDefs = gql`

  type User {
    _id: ID
    username: String
    email: String
   
  }

  type Response {
    user: User
    message: String
    errors: [String]
  }

  type Exercise {
    name: String
    type: String
    muscle: String
    equipment: String
    difficulty: String
    instructions: String
  }

  input ExerciseInput {
    name: String
    type: String
    muscle: String
    equipment: String
    difficulty: String
    instructions: String
  }

  type Workout {
    _id: ID
    name: String
    exercises: [Exercise]
  }

  type Query {
    # Auth Queries
    getUser: Response
    searchExercises(muscle: String): [Exercise]

  }

  type Mutation {
    # Auth Resolvers
    registerUser(username: String, email: String, password: String): Response
    loginUser(email: String, password: String): Response
    logoutUser: Response
    saveWorkout(name: String, exercises: [ExerciseInput]): Response
  }
`;

export default typeDefs;