import db from '@server/database/models';
import { GraphQLID, GraphQLNonNull, GraphQLString } from 'graphql';
import { subject } from './query';
import { customCreateResolver } from './customCreateResolver';

export const subjectMutationFields = {
  id: { type: new GraphQLNonNull(GraphQLID) },
  name: { type: GraphQLString },
  studentId: { type: GraphQLID }
};

export const subjectMutation = {
  args: subjectMutationFields,
  type: subject,
  model: db.subjects,
  customCreateResolver
};
