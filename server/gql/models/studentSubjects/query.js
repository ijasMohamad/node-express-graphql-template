import db from '@database/models';
import { sequelizedWhere } from '@server/database/dbUtils';
import { getNode } from '@server/gql/node';
import { totalConnectionFields } from '@server/utils';
import { getQueryFields, TYPE_ATTRIBUTES } from '@server/utils/gqlFieldUtils';
import { GraphQLID, GraphQLInt, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { createConnection } from 'graphql-sequelize';
import { timestamps } from '../timestamps';

const { nodeInterface } = getNode();

export const studentSubjectFields = {
  id: { type: GraphQLNonNull(GraphQLID) },
  studentId: { type: GraphQLNonNull(GraphQLID) },
  subjectId: { type: GraphQLNonNull(GraphQLID) }
};
export const studentSubject = new GraphQLObjectType({
  name: 'StudentSubject',
  interfaces: [nodeInterface],
  fields: () => ({
    ...getQueryFields(studentSubjectFields, TYPE_ATTRIBUTES.isNonNull),
    ...timestamps
  })
});

export const StudentSubjectConnection = createConnection({
  nodeType: studentSubject,
  name: 'studentSubjects',
  target: db.studentSubjects,
  before: (findOptions, args, context) => {
    findOptions.include = findOptions.include || [];

    findOptions.where = sequelizedWhere(findOptions.where, args.where);
    return findOptions;
  },
  ...totalConnectionFields
});

export const studentSubjectQuery = {
  args: {
    id: {
      type: GraphQLNonNull(GraphQLInt)
    }
  },
  query: {
    type: studentSubject
  },
  list: {
    ...StudentSubjectConnection,
    resolve: StudentSubjectConnection.resolve,
    type: StudentSubjectConnection.connectionType,
    args: StudentSubjectConnection.connectionArgs
  },
  model: db.studentSubjects
};
