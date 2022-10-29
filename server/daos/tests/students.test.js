import db from '@database/models';
import { insertStudent, updateStudent } from '../students';
import { updateUsingId } from '@database/dbUtils';
import { mockDBClient, resetAndMockDB } from '@server/utils/testUtils';
import { insertStudentSubjects } from '../studentSubjects';

describe('Inserting a student with subject', () => {
  const name = 'jhonDoe';
  const studentId = 1;
  const subjectId = 1;
  const student = {
    name
  };
  const studentSubject = {
    studentId,
    subjectId
  };
  it('should insert a student with subject and call with correct params', async () => {
    const mockStudent = jest.spyOn(db.students, 'create');
    await insertStudent(student);
    expect(mockStudent).toHaveBeenCalledWith(student);

    const mockStudentSubject = jest.spyOn(db.studentSubjects, 'create');
    await insertStudentSubjects(studentSubject);
    expect(mockStudentSubject).toHaveBeenCalledWith(studentSubject);
  });
});

describe('Updating student', () => {
  const studentId = 1;
  const studentName = 'john';
  const student = {
    id: studentId,
    name: studentName
  };
  let dbClient;
  beforeEach(() => {
    dbClient = mockDBClient();
    resetAndMockDB(null, {}, dbClient);
  });
  it('should update a student call with correct params', async () => {
    jest.spyOn(dbClient.models.students, 'update');
    const mockStudent = await updateUsingId(dbClient.models.students, student);
    const expectedStudent = await updateStudent(student);
    expect(mockStudent).toBeTruthy();
    expect(expectedStudent).toBeTruthy();
  });
});
