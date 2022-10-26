import { sequelizedWhere } from '@server/database/dbUtils';
import db from '@server/database/models';
import { totalConnectionFields } from '@server/utils';
import { createConnection } from 'graphql-sequelize';
import { studentSubject } from './query';

export const studentSubjectConnection = createConnection({
  nodeType: studentSubject,
  name: 'studentSubjects',
  target: db.studentSubjects,
  before: (findOptions, args, context) => {
    findOptions.include = findOptions.include || [];

    findOptions.where = sequelizedWhere(findOptions.where, args.where);
    return findOptions;
  },
  ...totalConnectionFields
});
