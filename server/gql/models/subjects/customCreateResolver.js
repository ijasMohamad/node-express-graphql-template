import db from '@database/models';
import { insertStudentSubjects } from '@server/daos/studentSubjects';
import { insertSubject } from '@server/daos/subjects';
// import { getClient } from '@server/database';
import { transformSQLError } from '@server/utils';

export const customCreateResolver = async (model, args, context) => {
  // const s = getClient();
  // this.connection = new sequelize(s);
  try {
    const t = await db.connection.transaction();
    const res = await insertSubject(args, { transaction: t });

    args.subjectId = res?.id;
    delete args.name;

    await insertStudentSubjects(args, { transaction: t });
    return res;
  } catch (err) {
    throw transformSQLError(err);
  }
};
