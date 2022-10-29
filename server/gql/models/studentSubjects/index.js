import { GraphQLStudentSubject } from './model';
import { studentSubjectConnection } from './list';
import { StudentSubjectQueries } from './query';
import { studentSubjectMutation } from './mutation';

export const StudentSubject = GraphQLStudentSubject;

export const StudentSubjectConnection = studentSubjectConnection;

export const studentSubjectQueries = StudentSubjectQueries;

export const studentSubjectMutations = studentSubjectMutation;
