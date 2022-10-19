import db from '@database/models';

// Inserting student into studentsTable.
export const insertStudent = args => db.students.create(args);

// Inserting subject into subjectsTable.
export const insertSubject = args => db.subjects.create(args);

// Inserting studentId and subjectId into studentSubjectsTable.
export const insertStudentSubjects = args => db.studentSubjects.create(args);
