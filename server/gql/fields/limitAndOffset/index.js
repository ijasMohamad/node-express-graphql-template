import { GraphQLInt, GraphQLNonNull } from 'graphql';

export const limitAndOffset = {
  limit: {
    type: new GraphQLNonNull(GraphQLInt),
    description: 'Use with offset to get paginated results with total'
  },
  offset: {
    type: new GraphQLNonNull(GraphQLInt),
    description: 'Use with offset to get paginated results with total'
  }
};
