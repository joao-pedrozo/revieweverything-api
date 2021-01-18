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
        const teste = await Review.aggregate([{
           $match : { _id : mongoose.Types.ObjectId(args.id) } }, { 
           $lookup: { from: 'users', localField: 'by_user', foreignField: '_id', as: 'user'  } 
          }
        ]
      )
      const teste2 = {
        _id: teste[0].id,
        title: teste[0].title,
        text: teste[0].text,
        overall: teste[0].overall,
        url: teste[0].url,
        created_at: teste[0].created_at,
        by_user: teste[0].by_user,
        user: teste[0].user[0] 
      }

      console.log(teste[0]);
      return teste2;
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