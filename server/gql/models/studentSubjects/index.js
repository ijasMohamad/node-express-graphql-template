import { studentSubject, studentSubjectQuery, StudentSubjectConnection } from './query';
import { studentSubjectMutation } from './mutation';

const StudentSubject = studentSubject;

// export const StudentSubjectConnection = studentSubjectConnection;
export { StudentSubjectConnection, StudentSubject };

// queries on the studentSubjects table
export const studentSubjectQueries = studentSubjectQuery;

export const studentSubjectMutations = studentSubjectMutation;
