import db from '@database/models';
import { updateUsingId } from '@server/database/dbUtils';

// Inserting studentId and subjectId into studentSubjectsTable.
export const insertStudentSubjects = args => db.studentSubjects.create(args);

// Updating studentId and subjectId in studentSubjectsTable.
export const updateStudentSubject = args => updateUsingId(db.studentSubjects, args);
