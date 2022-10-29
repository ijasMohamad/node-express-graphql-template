import { GraphQLSubject } from './model';
import { subjectConnection } from './list';
import { SubjectQueries } from './query';
import { subjectMutation } from './mutation';

export const Subject = GraphQLSubject;

export const SubjectConnection = subjectConnection;

export const subjectQueries = SubjectQueries;

export const subjectMutations = subjectMutation;
