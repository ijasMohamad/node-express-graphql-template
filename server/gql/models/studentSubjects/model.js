import { getNode } from '@server/gql/node';
import { GraphQLID, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { getQueryFields, TYPE_ATTRIBUTES } from '@server/utils/gqlFieldUtils';
import { timestamps } from '@gqlFields/timestamps';

const { nodeInterface } = getNode();

export const studentSubjectFields = {
  id: { type: new GraphQLNonNull(GraphQLID) },
  studentId: { type: new GraphQLNonNull(GraphQLID) },
  subjectId: { type: new GraphQLNonNull(GraphQLID) }
};

export const GraphQLStudentSubject = new GraphQLObjectType({
  name: 'StudentSubject',
  interfaces: [nodeInterface],
  fields: () => ({
    ...getQueryFields(studentSubjectFields, TYPE_ATTRIBUTES.isNonNull),
    ...timestamps
  })
});
