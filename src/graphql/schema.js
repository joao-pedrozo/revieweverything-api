import { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLList } from 'graphql';
import mongoose from 'mongoose';
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
        const reviews = Review.aggregate([{
           $match : { _id : mongoose.Types.ObjectId(args.id)  } }, { 
           $lookup: { from: 'users', localField: 'by_user', foreignField: '_id', as: 'user'  } 
          }
        ]
      ).then(res => { return res }).catch(err => console.log(err))
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
      ]);
      return reviews;
      }
    }
  }
})

export default new GraphQLSchema({ query: RootQuery, mutation: Mutations});