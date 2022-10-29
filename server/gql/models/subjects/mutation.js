import { GraphQLID, GraphQLNonNull, GraphQLString } from 'graphql';
import { GraphQLSubject } from './model';
import db from '@server/database/models';
import { customCreateResolver } from './customCreateResolver';

export const subjectMutationFields = {
  id: { type: new GraphQLNonNull(GraphQLID) },
  name: { type: GraphQLString },
  studentId: { type: GraphQLID }
};

export const subjectMutation = {
  args: subjectMutationFields,
  type: GraphQLSubject,
  model: db.subjects,
  customCreateResolver
};
