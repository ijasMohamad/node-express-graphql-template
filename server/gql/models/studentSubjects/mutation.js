import db from '@server/database/models';
import { GraphQLID, GraphQLNonNull } from 'graphql';
import { studentSubject } from './query';

export const studentSubjectMutationFields = {
  id: { type: GraphQLNonNull(GraphQLID) },
  studentId: { type: GraphQLNonNull(GraphQLID) },
  subjectId: { type: GraphQLNonNull(GraphQLID) }
};

export const studentSubjectMutation = {
  args: studentSubjectMutationFields,
  type: studentSubject,
  model: db.studentSubjects
};
