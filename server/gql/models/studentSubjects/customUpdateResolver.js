import { updateStudent, updateSubject, updateStudentSubject } from '@server/daos/studentSubjects';
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
    const res = await updateStudentSubject(args);
    return res;
  } catch (err) {
    return transformSQLError(err);
  }
};
