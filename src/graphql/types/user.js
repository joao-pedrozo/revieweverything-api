import { GraphQLObjectType, GraphQLString, GraphQLInt } from 'graphql';

const ReviewType = new GraphQLObjectType({
    name: 'Review',
    fields: () => ({
        _id: { type: GraphQLString },
        nome: { type: GraphQLString }
    })
});

export default ReviewType;