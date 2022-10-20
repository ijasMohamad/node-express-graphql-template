import db from '@database/models';
import { insertStudent, insertStudentSubjects } from '@server/daos/studentSubjects';
import { transformSQLError } from '@server/utils';
import { GraphQLID, GraphQLNonNull, GraphQLString } from 'graphql';
import { student } from './query';

export const studentsMutationFields = {
  id: { type: new GraphQLNonNull(GraphQLID) },
  name: { type: GraphQLString },
  subjectId: { type: GraphQLID }
};

const customCreateResolver = async (model, args, context) => {
  try {
    const res = await insertStudent(args);

    args.studentId = res?.id;
    delete args.name;

    await insertStudentSubjects(args);
    return res;
  } catch (err) {
    throw transformSQLError(err);
  }
};

export const studentMutation = {
  args: studentsMutationFields,
  type: student,
  model: db.students,
  customCreateResolver
};
