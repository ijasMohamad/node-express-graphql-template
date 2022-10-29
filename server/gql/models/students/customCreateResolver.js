import { insertStudent } from '@server/daos/students';
import { insertStudentSubjects } from '@server/daos/studentSubjects';
import { transformSQLError } from '@server/utils';
import db from '@database/models';

export const customCreateResolver = async (model, args, context) => {
  // First, we start a transaction from connection and save it into a variable
  const transaction = await db.sequelize.transaction();
  try {
    // Then, do some calls passing this transaction as an option:
    const res = await insertStudent(args, { transaction });

    args.studentId = res?.id;
    delete args.name;

    await insertStudentSubjects(args, { transaction });
    // If the execution reaches this line, no errors were thrown.
    // We commit the transaction.
    await transaction.commit();
    return res;
  } catch (err) {
    // If the execution reaches this line, an error was thrown.
    // We rollback the transaction.
    await transaction.rollback();
    throw transformSQLError(err);
  }
};
