const gql = String.raw;
const typeDefs = gql `

  type User {
    _id: ID
    username: String
    email: String
   
  }

  type Response {
    _id: ID
    user: User
    message: String
    errors: [String]
    name: String
    muscle: String
    difficulty: String
    instructions: String
  }

  type Exercise {
    _id: ID
    name: String
    muscle: String
    difficulty: String
    instructions: String
  }

  input ExerciseInput {
    name: String
    muscle: String
    difficulty: String
    instructions: String
  }


  type Query {
    # Auth Queries
    getUser: Response
    searchExercises(muscle: String): [Exercise]
    getUserExercises: [Exercise]

  }

  type Mutation {
    # Auth Resolvers
    registerUser(username: String, email: String, password: String): Response
    loginUser(email: String, password: String): Response
    logoutUser: Response
    # Exercise Resolvers
    addExercise(name: String, muscle: String, difficulty: String, instructions: String): Response
  }
`;
export default typeDefs;
