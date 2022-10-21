import { insertStudentSubjects, insertSubject } from '@server/daos/studentSubjects';
import { transformSQLError } from '@server/utils';

export const customCreateResolver = async (model, args, context) => {
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
