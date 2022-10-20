import { studentQuery, StudentConnection, student } from './query';
import { studentMutation } from './mutation';

// imported GraphQLObjectType of student.
const Student = student;

export { StudentConnection, Student };

// exporting queries on the student table.
export const studentQueries = studentQuery;

// exporting mutations on the student table.
export const studentMutations = studentMutation;
