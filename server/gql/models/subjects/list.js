import db from '@server/database/models';
import { subject } from './query';
import { createConnection } from 'graphql-sequelize';
import { sequelizedWhere } from '@server/database/dbUtils';
import { totalConnectionFields } from '@server/utils';

export const subjectConnection = createConnection({
  name: 'subjects',
  target: db.subjects,
  nodeType: subject,
  before: (findOptions, args, context) => {
    findOptions.include = findOptions.include || [];

    if (context?.student?.id) {
      findOptions.include.push({
        model: db.studentSubjects,
        where: {
          studentId: context.student.id
        }
      });
    }
    findOptions.where = sequelizedWhere(findOptions.where, args.where);
    return findOptions;
  },
  ...totalConnectionFields
});
