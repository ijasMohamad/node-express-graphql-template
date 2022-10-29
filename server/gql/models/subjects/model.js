import { getNode } from '@server/gql/node';
import { GraphQLID, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { getQueryFields, TYPE_ATTRIBUTES } from '@server/utils/gqlFieldUtils';
import { timestamps } from '@server/gql/fields/timestamps';
import { studentQueries } from '../students';

const { nodeInterface } = getNode();

export const subjectFields = {
  id: { type: new GraphQLNonNull(GraphQLID) },
  name: { type: GraphQLString }
};

export const GraphQLSubject = new GraphQLObjectType({
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
