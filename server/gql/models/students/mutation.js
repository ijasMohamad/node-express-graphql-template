import { GraphQLID, GraphQLNonNull, GraphQLString } from 'graphql';
import { GraphQLStudent } from './model';
import db from '@database/models';
import { customCreateResolver } from './customCreateResolver';

export const studentsMutationFields = {
  id: { type: new GraphQLNonNull(GraphQLID) },
  name: { type: GraphQLString },
  subjectId: { type: GraphQLID }
};

export const studentMutation = {
  args: studentsMutationFields,
  type: GraphQLStudent,
  model: db.students,
  customCreateResolver
};
