import graphql, { GraphQLObjectType, GraphQLString, GraphQLInt } from 'graphql';

const ReviewType = new GraphQLObjectType({
    name: 'Review',
    fields: () => ({
        id: { type: GraphQLString },
        text: { type: GraphQLString },
        by_user: { type: GraphQLString },
        overall: { type: GraphQLInt },
    })
});

export default ReviewType;