import db from '@database/models';
import { updateUsingId } from '@server/database/dbUtils';

// Inserting student into studentsTable.
export const insertStudent = args => db.students.create(args);

// Inserting subject into subjectsTable.
export const insertSubject = args => db.subjects.create(args);

// Inserting studentId and subjectId into studentSubjectsTable.
export const insertStudentSubjects = args => db.studentSubjects.create(args);

// Updating student in studentsTable.
export const updateStudent = args => updateUsingId(db.students, args);

// Updating subject in subjectsTable.
export const updateSubject = args => updateUsingId(db.subjects, args);

// Updating studentId and subjectId in studentSubjectsTable.
export const updateStudentSubject = args => updateUsingId(db.studentSubjects, args);
