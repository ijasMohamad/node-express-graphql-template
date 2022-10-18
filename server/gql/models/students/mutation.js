import db from '@database/models';
import { GraphQLID, GraphQLNonNull, GraphQLString } from 'graphql';
import { student } from './query';

export const studentsMutationFields = {
  id: { type: GraphQLNonNull(GraphQLID) },
  name: { type: GraphQLString },
  subjectId: { type: GraphQLID }
};

export const studentMutation = {
  args: studentsMutationFields,
  type: student,
  model: db.students
};
