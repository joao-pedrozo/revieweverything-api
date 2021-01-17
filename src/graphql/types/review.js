import { GraphQLObjectType, GraphQLString, GraphQLInt } from 'graphql';
import UserGraphQLType from './user';

const ReviewType = new GraphQLObjectType({
    name: 'Review',
    fields: () => ({
        id: { type: GraphQLString },
        title: { type: GraphQLString },
        text: { type: GraphQLString },
        url: { type: GraphQLString },
        by_user: { type: GraphQLString },
        overall: { type: GraphQLInt },
    })
});

export default ReviewType;