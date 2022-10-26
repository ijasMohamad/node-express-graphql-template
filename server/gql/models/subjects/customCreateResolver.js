import db from '@database/models';
import { insertStudentSubjects } from '@server/daos/studentSubjects';
import { insertSubject } from '@server/daos/subjects';
import { transformSQLError } from '@server/utils';

export const customCreateResolver = async (model, args, context) => {
  const t = await db.sequelize.transaction();
  try {
    const res = await insertSubject(args, { transaction: t });

    args.subjectId = res?.id;
    delete args.name;

    await insertStudentSubjects(args, { transaction: t });
    await t.commit();
    return res;
  } catch (err) {
    await t.rollback();
    throw transformSQLError(err);
  }
};
