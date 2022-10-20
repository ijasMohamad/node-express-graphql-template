import { insertStudentSubjects, insertSubject } from '@server/daos/studentSubjects';
import db from '@server/database/models';
import { transformSQLError } from '@server/utils';
import { GraphQLID, GraphQLNonNull, GraphQLString } from 'graphql';
import { subject } from './query';

export const subjectMutationFields = {
  id: { type: new GraphQLNonNull(GraphQLID) },
  name: { type: GraphQLString },
  studentId: { type: GraphQLID }
};

const customCreateResolver = async (model, args, context) => {
  try {
    const res = await insertSubject(args);

    args.subjectId = res?.id;
    delete args.name;

    await insertStudentSubjects(args);
    return res;
  } catch (err) {
    throw transformSQLError(err);
  }
};

export const subjectMutation = {
  args: subjectMutationFields,
  type: subject,
  model: db.subjects,
  customCreateResolver
};
