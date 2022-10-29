import db from '@database/models';
import { insertStudentSubjects, updateStudentSubject } from '../studentSubjects';
import { updateUsingId } from '@database/dbUtils';
import { mockDBClient, resetAndMockDB } from '@server/utils/testUtils';
import { insertSubject } from '../subjects';

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
  const id = 1;
  const studentId = 1;
  const subjectId = 1;
  const studentSubject = {
    id,
    studentId,
    subjectId
  };
  let dbClient;
  beforeEach(() => {
    dbClient = mockDBClient();
    resetAndMockDB(null, {}, dbClient);
  });
  it('should update studentSubjects call with correct params', async () => {
    jest.spyOn(dbClient.models.studentSubjects, 'update');
    const mockStudentSubject = await updateUsingId(dbClient.models.studentSubjects, studentSubject);
    const expectedStudentSubject = await updateStudentSubject(studentSubject);
    expect(mockStudentSubject).toBeTruthy();
    expect(expectedStudentSubject).toBeTruthy();
  });
});
