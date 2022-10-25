import db from '@database/models';
import { limitAndOffset } from '@server/gql/fields/limitAndOffset';
import { GraphQLInt, GraphQLNonNull } from 'graphql';
import { Student, StudentConnection } from '.';

export const studentQuery = {
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLInt)
    }
  },
  query: {
    type: Student
  },
  list: {
    ...StudentConnection,
    resolve: StudentConnection.resolve,
    type: StudentConnection.connectionType,
    args: {
      ...StudentConnection.connectionArgs,
      ...limitAndOffset
    }
  },
  model: db.students
};
