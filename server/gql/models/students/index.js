import { student } from './query';
import { studentConnection } from './list';
import { GraphQLInt, GraphQLNonNull } from 'graphql';
import { limitAndOffset } from '@server/gql/fields/limitAndOffset';
import db from '@server/database/models';
import { studentMutation } from './mutation';

export const Student = student;

// exporting student connection.
export const StudentConnection = studentConnection;

export const studentQueries = {
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLInt)
    }
  },
  query: {
    type: student
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

// exporting mutations on the students table.
export const studentMutations = studentMutation;
