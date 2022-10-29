import db from '@server/database/models';
import { GraphQLID, GraphQLNonNull, GraphQLString } from 'graphql';
import { customUpdateResolver } from './customUpdateResolver';
import { GraphQLStudentSubject } from './model';

export const studentSubjectMutationFields = {
  id: { type: new GraphQLNonNull(GraphQLID) },
  studentId: { type: new GraphQLNonNull(GraphQLID) },
  studentName: { type: GraphQLString },
  subjectId: { type: new GraphQLNonNull(GraphQLID) },
  subjectName: { type: GraphQLString }
};

export const studentSubjectMutation = {
  args: studentSubjectMutationFields,
  type: GraphQLStudentSubject,
  model: db.studentSubjects,
  customUpdateResolver
};
