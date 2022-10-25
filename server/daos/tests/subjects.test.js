import db from '@database/models';
import { insertStudentSubjects } from '../studentSubjects';
import { updateUsingId } from '@database/dbUtils';
import { mockDBClient, resetAndMockDB } from '@server/utils/testUtils';
import { insertSubject, updateSubject } from '../subjects';

describe('Inserting a subject with student', () => {
  const name = 'software';
  const subjectId = 1;
  const studentId = 1;
  const subject = {
    name
  };
  const studentSubject = {
    studentId,
    subjectId
  };
  it('should insert a subject with student and call with correct params', async () => {
    const mockSubject = jest.spyOn(db.subjects, 'create');
    await insertSubject(subject);
    expect(mockSubject).toHaveBeenCalledWith(subject);

    const mockStudentSubject = jest.spyOn(db.studentSubjects, 'create');
    await insertStudentSubjects(studentSubject);
    expect(mockStudentSubject).toHaveBeenCalledWith(studentSubject);
  });
});

describe('Updating student', () => {
  const subjectId = 1;
  const subjectName = 'software';
  const subject = {
    id: subjectId,
    name: subjectName
  };
  let dbClient;
  beforeEach(() => {
    dbClient = mockDBClient();
    resetAndMockDB(null, {}, dbClient);
  });
  it('should update a subject call with correct params', async () => {
    jest.spyOn(dbClient.models.subjects, 'update');
    const mockSubject = await updateUsingId(dbClient.models.subjects, subject);
    const expectedSubject = await updateSubject(subject);
    expect(mockSubject).toBeTruthy();
    expect(expectedSubject).toBeTruthy();
  });
});
