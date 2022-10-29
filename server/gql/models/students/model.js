import { getNode } from '@server/gql/node';
import { GraphQLID, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { getQueryFields, TYPE_ATTRIBUTES } from '@server/utils/gqlFieldUtils';
import { timestamps } from '@gqlFields/timestamps';
import { subjectQueries } from '../subjects';

const { nodeInterface } = getNode();

export const studentsFields = {
  id: { type: new GraphQLNonNull(GraphQLID) },
  name: { type: GraphQLString }
};

export const GraphQLStudent = new GraphQLObjectType({
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
