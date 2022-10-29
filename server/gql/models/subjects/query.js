import { GraphQLInt, GraphQLNonNull } from 'graphql';
import { GraphQLSubject } from './model';
import { subjectConnection } from './list';
import { limitAndOffset } from '@server/gql/fields/limitAndOffset';
import db from '@server/database/models';

export const SubjectQueries = {
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLInt)
    }
  },
  query: {
    type: GraphQLSubject
  },
  list: {
    ...subjectConnection,
    resolve: subjectConnection.resolve,
    type: subjectConnection.connectionType,
    args: {
      ...subjectConnection.connectionArgs,
      ...limitAndOffset
    }
  },
  model: db.subjects
};
