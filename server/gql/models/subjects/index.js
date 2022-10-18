import { subject, SubjectConnection, subjectQuery } from './query';
import { subjectMutation } from './mutation';

const Subject = subject;

export { SubjectConnection, Subject };

// queries on the subject table
export const subjectQueries = subjectQuery;

// mutations on the subject table
export const subjectMutations = subjectMutation;
