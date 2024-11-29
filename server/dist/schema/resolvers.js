import dotenv from 'dotenv';
dotenv.config();
import auth_resolvers from './resolvers/auth_resolvers.js';
const resolvers = {
    Query: {
        ...auth_resolvers.Query
    },
    Mutation: {
        ...auth_resolvers.Mutation
    }
};
export default resolvers;
