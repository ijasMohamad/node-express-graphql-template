import db from '@database/models';
import { GraphQLID, GraphQLNonNull, GraphQLString } from 'graphql';
import { student } from './query';
import { customCreateResolver } from './customCreateResolver';

export const studentsMutationFields = {
  id: { type: new GraphQLNonNull(GraphQLID) },
  name: { type: GraphQLString },
  subjectId: { type: GraphQLID }
};

export const studentMutation = {
  args: studentsMutationFields,
  type: student,
  model: db.students,
  customCreateResolver
};
