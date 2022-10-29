import { updateStudent } from '@server/daos/students';
import { updateStudentSubject } from '@server/daos/studentSubjects';
import { updateSubject } from '@server/daos/subjects';
import db from '@server/database/models';
import { transformSQLError } from '@server/utils';

export const customUpdateResolver = async (model, args, context) => {
  const t = await db.sequelize.transaction();
  try {
    if (args?.studentName) {
      const studentArgs = {
        id: args.studentId,
        name: args.studentName
      };
      delete args.studentName;
      await updateStudent(studentArgs, { transaction: t });
    }
    if (args?.subjectName) {
      const subjectArgs = {
        id: args.subjectId,
        name: args.subjectName
      };
      delete args.subjectName;
      await updateSubject(subjectArgs, { transaction: t });
    }
    const res = updateStudentSubject(args, { transaction: t });
    await t.commit();
    return res;
  } catch (err) {
    await t.rollback();
    return transformSQLError(err);
  }
};
