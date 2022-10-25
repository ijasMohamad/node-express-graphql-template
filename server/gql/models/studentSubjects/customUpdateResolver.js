import { updateStudent } from '@server/daos/students';
import { updateStudentSubject } from '@server/daos/studentSubjects';
import { updateSubject } from '@server/daos/subjects';
import { transformSQLError } from '@server/utils';

export const customUpdateResolver = async (model, args, context) => {
  try {
    if (args?.studentName) {
      const studentArgs = {
        id: args.studentId,
        name: args.studentName
      };
      delete args.studentName;
      await updateStudent(studentArgs);
    }
    if (args?.subjectName) {
      const subjectArgs = {
        id: args.subjectId,
        name: args.subjectName
      };
      delete args.subjectName;
      await updateSubject(subjectArgs);
    }
    return updateStudentSubject(args);
  } catch (err) {
    return transformSQLError(err);
  }
};
