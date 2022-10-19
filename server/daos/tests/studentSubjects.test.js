import db from '@database/models';
import { insertStudent, insertStudentSubjects, insertSubject } from '../studentSubjects';

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
