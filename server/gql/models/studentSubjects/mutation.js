import db from '@server/database/models';
import { GraphQLID, GraphQLNonNull } from 'graphql';
import { studentSubject } from './query';

export const studentSubjectMutationFields = {
  id: { type: new GraphQLNonNull(GraphQLID) },
  studentId: { type: new GraphQLNonNull(GraphQLID) },
  subjectId: { type: new GraphQLNonNull(GraphQLID) }
};

export const studentSubjectMutation = {
  args: studentSubjectMutationFields,
  type: studentSubject,
  model: db.studentSubjects
};
