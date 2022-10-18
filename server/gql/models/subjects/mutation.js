import db from '@server/database/models';
import { GraphQLID, GraphQLNonNull, GraphQLString } from 'graphql';
import { subject } from './query';

export const subjectMutationFields = {
  id: { type: GraphQLNonNull(GraphQLID) },
  name: { type: GraphQLString },
  studentId: { type: GraphQLID }
};

export const subjectMutation = {
  args: subjectMutationFields,
  type: subject,
  model: db.subjects
};
