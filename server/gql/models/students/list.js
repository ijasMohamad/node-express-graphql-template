import { createConnection } from 'graphql-sequelize';
import db from '@database/models';
import { GraphQLStudent } from './model';
import { sequelizedWhere } from '@server/database/dbUtils';
import { totalConnectionFields } from '@server/utils';

export const studentConnection = createConnection({
  name: 'students',
  target: db.students,
  nodeType: GraphQLStudent,
  before: (findOptions, args, context) => {
    findOptions.include = findOptions.include || [];

    if (context?.subject?.id) {
      findOptions.include.push({
        model: db.studentSubjects,
        where: {
          subjectId: context.subject.id
        }
      });
    }
    findOptions.where = sequelizedWhere(findOptions.where, args.where);
    return findOptions;
  },
  ...totalConnectionFields
});
