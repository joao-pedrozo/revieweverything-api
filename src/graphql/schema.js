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
       async resolve(parent, args) {
        const [{ _id, title, text, overall, url, created_at, by_user, user }] = await Review.aggregate([{
           $match : { _id : mongoose.Types.ObjectId(args.id) } }, { 
           $lookup: { from: 'users', localField: 'by_user', foreignField: '_id', as: 'user'  } 
          }
        ]
      )
      const review = {
        _id,
        title,
        text,
        overall,
        url,
        created_at,
        by_user,
        user: user[0],
      }

      return review;
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