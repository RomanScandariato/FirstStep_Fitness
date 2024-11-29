const gql = String.raw;
const typeDefs = gql `

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

  type Query {
    # Auth Queries
    getUser: Response

  }

  type Mutation {
    # Auth Resolvers
    registerUser(username: String, email: String, password: String): Response
    loginUser(email: String, password: String): Response
    logoutUser: Response

  }
`;
export default typeDefs;
