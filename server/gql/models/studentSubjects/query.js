import { getNode } from '@server/gql/node';
import { getQueryFields, TYPE_ATTRIBUTES } from '@server/utils/gqlFieldUtils';
import { GraphQLID, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { timestamps } from '@gqlFields/timestamps';

const { nodeInterface } = getNode();

export const studentSubjectFields = {
  id: { type: new GraphQLNonNull(GraphQLID) },
  studentId: { type: new GraphQLNonNull(GraphQLID) },
  subjectId: { type: new GraphQLNonNull(GraphQLID) }
};

export const studentSubject = new GraphQLObjectType({
  name: 'StudentSubject',
  interfaces: [nodeInterface],
  fields: () => ({
    ...getQueryFields(studentSubjectFields, TYPE_ATTRIBUTES.isNonNull),
    ...timestamps
  })
});
