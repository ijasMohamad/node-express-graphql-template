import db from '@database/models';
import { sequelizedWhere } from '@server/database/dbUtils';
import { getNode } from '@server/gql/node';
import { totalConnectionFields } from '@server/utils';
import { getQueryFields, TYPE_ATTRIBUTES } from '@server/utils/gqlFieldUtils';
import { GraphQLID, GraphQLInt, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { createConnection } from 'graphql-sequelize';
import { studentQueries } from '../students';
import { timestamps } from '../timestamps';

const { nodeInterface } = getNode();

export const subjectFields = {
  id: { type: GraphQLNonNull(GraphQLID) },
  name: { type: GraphQLString }
};

export const subject = new GraphQLObjectType({
  name: 'Subject',
  interfaces: [nodeInterface],
  fields: () => ({
    ...getQueryFields(subjectFields, TYPE_ATTRIBUTES.isNonNull),
    ...timestamps,
    students: {
      ...studentQueries.list,
      resolve: (source, args, context, info) =>
        studentQueries.list.resolve(source, args, { ...context, subject: source.dataValues }, info)
    }
  })
});

export const SubjectConnection = createConnection({
  name: 'subjects',
  target: db.subjects,
  nodeType: subject,
  before: (findOptions, args, context) => {
    findOptions.include = findOptions.include || [];

    // If the offset is not provided, then it will return response as null.
    if (args?.offset === undefined) {
      console.log('Subject offset is null, add offset');
      return null;
    }
    if (context?.student?.id) {
      findOptions.include.push({
        model: db.studentSubjects,
        where: {
          studentId: context.student.id
        }
      });
    }
    findOptions.where = sequelizedWhere(findOptions.where, args.where);
    return findOptions;
  },
  ...totalConnectionFields
});

export const subjectQuery = {
  args: {
    id: {
      type: GraphQLNonNull(GraphQLInt)
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
      limit: { type: GraphQLInt, description: 'Use with offset to get paginated results with total' },
      offset: { type: GraphQLInt, description: 'Use with limit to get paginated results with total' }
    }
  },
  model: db.subjects
};
