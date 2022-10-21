import db from '@database/models';
import {
  insertStudent,
  insertStudentSubjects,
  insertSubject,
  updateStudent,
  updateStudentSubject,
  updateSubject
} from '../studentSubjects';
import { updateUsingId } from '@database/dbUtils';
import { mockDBClient, resetAndMockDB } from '@server/utils/testUtils';

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
  const studentName = 'john';
  const subjectId = 1;
  const subjectName = 'software';
  const student = {
    id: studentId,
    name: studentName
  };
  const subject = {
    id: subjectId,
    name: subjectName
  };
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
  it('should update a student call with correct params', async () => {
    jest.spyOn(dbClient.models.students, 'update');
    const mockStudent = await updateUsingId(dbClient.models.students, student);
    const expectedStudent = await updateStudent(student);
    expect(mockStudent).toBeTruthy();
    expect(expectedStudent).toBeTruthy();
  });
  it('should update a subject call with correct params', async () => {
    jest.spyOn(dbClient.models.subjects, 'update');
    const mockSubject = await updateUsingId(dbClient.models.subjects, subject);
    const expectedSubject = await updateSubject(subject);
    expect(mockSubject).toBeTruthy();
    expect(expectedSubject).toBeTruthy();
  });
  it('should update studentSubjects call with correct params', async () => {
    jest.spyOn(dbClient.models.studentSubjects, 'update');
    const mockStudentSubject = await updateUsingId(dbClient.models.studentSubjects, studentSubject);
    const expectedStudentSubject = await updateStudentSubject(studentSubject);
    expect(mockStudentSubject).toBeTruthy();
    expect(expectedStudentSubject).toBeTruthy();
  });
});
