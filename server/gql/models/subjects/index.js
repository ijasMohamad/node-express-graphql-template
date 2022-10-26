import { subject } from './query';
import { subjectConnection } from './list';
import { GraphQLInt, GraphQLNonNull } from 'graphql';
import { limitAndOffset } from '@server/gql/fields/limitAndOffset';
import db from '@server/database/models';
import { subjectMutation } from './mutation';

export const Subject = subject;

export const SubjectConnection = subjectConnection;

export const subjectQueries = {
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLInt)
    }
  },
  query: {
    type: subject
  },
  list: {
    ...SubjectConnection,
    resolve: SubjectConnection.resolve,
    type: SubjectConnection.connectionType,
    args: {
      ...SubjectConnection.connectionArgs,
      ...limitAndOffset
    }
  },
  model: db.subjects
};

// mutations on the subject table
export const subjectMutations = subjectMutation;
