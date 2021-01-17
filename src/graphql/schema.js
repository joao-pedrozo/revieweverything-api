import { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLList } from 'graphql';
import ReviewGraphQLType from './types/review';
import Review from '../models/review';
import Mutations from './mutations';

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    review: {
      type: ReviewGraphQLType,
      args: { id: { type: GraphQLString }},
      resolve(parent, args) {
        return Review.findById(args.id)
      }
    },
    reviews: {
      type: new GraphQLList(ReviewGraphQLType),
      resolve(parent, args){
        const reviews = Review.aggregate([{
          $lookup: {
            from: 'users',
            localField: 'by_user',
            foreignField: '_id',
            as: 'user'
          }
        }
      ]).then(res => console.log(res))
      }
    }
  }
})

export default new GraphQLSchema({ query: RootQuery, mutation: Mutations});