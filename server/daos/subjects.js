import db from '@database/models';
import { updateUsingId } from '@server/database/dbUtils';

// Inserting subject into subjectsTable.
export const insertSubject = args => db.subjects.create(args);

// Updating subject in subjectsTable.
export const updateSubject = args => updateUsingId(db.subjects, args);
