import { GraphQLInt, GraphQLNonNull } from 'graphql';
import { GraphQLStudent } from './model';
import { studentConnection } from './list';
import { limitAndOffset } from '@gqlFields/limitAndOffset';
import db from '@server/database/models';

export const StudentQueries = {
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLInt)
    }
  },
  query: {
    type: GraphQLStudent
  },
  list: {
    ...studentConnection,
    resolve: studentConnection.resolve,
    type: studentConnection.connectionType,
    args: {
      ...studentConnection.connectionArgs,
      ...limitAndOffset
    }
  },
  model: db.students
};
