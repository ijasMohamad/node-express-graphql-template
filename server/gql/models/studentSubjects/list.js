import { createConnection } from 'graphql-sequelize';
import { GraphQLStudentSubject } from './model';
import db from '@server/database/models';
import { sequelizedWhere } from '@server/database/dbUtils';
import { totalConnectionFields } from '@server/utils';

export const studentSubjectConnection = createConnection({
  nodeType: GraphQLStudentSubject,
  name: 'studentSubjects',
  target: db.studentSubjects,
  before: (findOptions, args, context) => {
    findOptions.include = findOptions.include || [];

    findOptions.where = sequelizedWhere(findOptions.where, args.where);
    return findOptions;
  },
  ...totalConnectionFields
});
