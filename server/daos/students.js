import db from '@database/models';
import { updateUsingId } from '@server/database/dbUtils';

// Inserting student into studentsTable.
export const insertStudent = args => db.students.create(args);

// Updating student in studentsTable.
export const updateStudent = args => updateUsingId(db.students, args);
