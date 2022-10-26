import { studentSubject } from './query';
import { studentSubjectConnection } from './list';
import { GraphQLInt, GraphQLNonNull } from 'graphql';
import db from '@server/database/models';
import { studentSubjectMutation } from './mutation';

export const StudentSubject = studentSubject;

// export const StudentSubjectConnection = studentSubjectConnection;
export const StudentSubjectConnection = studentSubjectConnection;

// queries on the studentSubjects table
export const studentSubjectQueries = {
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLInt)
    }
  },
  query: {
    type: studentSubject
  },
  list: {
    ...StudentSubjectConnection,
    resolve: StudentSubjectConnection.resolve,
    type: StudentSubjectConnection.connectionType,
    args: StudentSubjectConnection.connectionArgs
  },
  model: db.studentSubjects
};

export const studentSubjectMutations = studentSubjectMutation;
