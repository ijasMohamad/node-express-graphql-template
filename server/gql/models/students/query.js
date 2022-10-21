import db from '@database/models';
import { sequelizedWhere } from '@server/database/dbUtils';
import { getNode } from '@server/gql/node';
import { totalConnectionFields } from '@server/utils';
import { getQueryFields, TYPE_ATTRIBUTES } from '@server/utils/gqlFieldUtils';
import { GraphQLID, GraphQLInt, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { createConnection } from 'graphql-sequelize';
import { limitAndOffset } from '../../fields/limitAndOffset';
import { subjectQueries } from '../subjects';
import { timestamps } from '../../fields/timestamps';

const { nodeInterface } = getNode();

export const studentsFields = {
  id: { type: new GraphQLNonNull(GraphQLID) },
  name: { type: GraphQLString }
};

export const student = new GraphQLObjectType({
  name: 'Student',
  interfaces: [nodeInterface],
  fields: () => ({
    ...getQueryFields(studentsFields, TYPE_ATTRIBUTES.isNonNull),
    ...timestamps,
    subjects: {
      ...subjectQueries.list,
      resolve: (source, args, context, info) =>
        subjectQueries.list.resolve(source, args, { ...context, student: source.dataValues }, info)
    }
  })
});

export const StudentConnection = createConnection({
  name: 'students',
  target: db.students,
  nodeType: student,
  before: (findOptions, args, context) => {
    findOptions.include = findOptions.include || [];

    if (context?.subject?.id) {
      console.log('SubjectId => ', context.subject.id);
      findOptions.include.push({
        model: db.studentSubjects,
        where: {
          subjectId: context.subject.id
        }
      });
    }
    findOptions.where = sequelizedWhere(findOptions.where, args.where);
    return findOptions;
  },
  ...totalConnectionFields
});

export const studentQuery = {
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLInt)
    }
  },
  query: {
    type: student
  },
  list: {
    ...StudentConnection,
    resolve: StudentConnection.resolve,
    type: StudentConnection.connectionType,
    args: {
      ...StudentConnection.connectionArgs,
      ...limitAndOffset
    }
  },
  model: db.students
};
