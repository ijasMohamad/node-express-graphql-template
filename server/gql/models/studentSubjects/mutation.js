import db from '@server/database/models';
import { GraphQLID, GraphQLNonNull, GraphQLString } from 'graphql';
import { studentSubject } from './query';
import { customUpdateResolver } from './customUpdateResolver';

export const studentSubjectMutationFields = {
  id: { type: new GraphQLNonNull(GraphQLID) },
  studentId: { type: new GraphQLNonNull(GraphQLID) },
  studentName: { type: GraphQLString },
  subjectId: { type: new GraphQLNonNull(GraphQLID) },
  subjectName: { type: GraphQLString }
};

export const studentSubjectMutation = {
  args: studentSubjectMutationFields,
  type: studentSubject,
  model: db.studentSubjects,
  customUpdateResolver
};
