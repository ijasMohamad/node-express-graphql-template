import { studentMutation } from './mutation';
import { GraphQLID, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { getNode } from '@server/gql/node';
import { getQueryFields, TYPE_ATTRIBUTES } from '@server/utils/gqlFieldUtils';
import { timestamps } from '@server/gql/fields/timestamps';
import { subjectQueries } from '../subjects';
import { StudentConnection, studentQuery } from './query';

// imported GraphQLObjectType of student.
// const Student = student;

const { nodeInterface } = getNode();

export const studentsFields = {
  id: { type: new GraphQLNonNull(GraphQLID) },
  name: { type: GraphQLString }
};

const Student = new GraphQLObjectType({
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

export { StudentConnection, Student };

// exporting queries on the student table.
export const studentQueries = studentQuery;

// exporting mutations on the student table.
export const studentMutations = studentMutation;
