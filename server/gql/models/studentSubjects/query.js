import { GraphQLInt, GraphQLNonNull } from 'graphql';
import { GraphQLStudentSubject } from './model';
import { studentSubjectConnection } from './list';
import db from '@server/database/models';

export const StudentSubjectQueries = {
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLInt)
    }
  },
  query: {
    type: GraphQLStudentSubject
  },
  list: {
    ...studentSubjectConnection,
    resolve: studentSubjectConnection.resolve,
    type: studentSubjectConnection.connectionType,
    args: studentSubjectConnection.connectionArgs
  },
  model: db.studentSubjects
};
