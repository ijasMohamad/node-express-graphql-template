import { studentsTable, subjectsTable } from '@server/utils/testUtils/mockData';
import { getResponse, mockDBClient, resetAndMockDB } from '@server/utils/testUtils';
import { get } from 'lodash';

describe('StudentSubject graphql-server-db customUpdateResolver tests', () => {
  let dbClient;
  beforeEach(() => {
    dbClient = mockDBClient();
    resetAndMockDB(null, {}, dbClient);
  });
  const id = 1;
  const updateStudentSubjectMutation = `
  mutation {
    updateStudentSubject (
      id: ${id},
      studentId: ${studentsTable[0].id},
      subjectId: ${subjectsTable[0].id}
    ) {
      id
      studentId
      subjectId
    }
  }
  `;
  it('should have mutation to update a new student', async () => {
    jest.spyOn(dbClient.models.studentSubjects, 'update');
    const response = await getResponse(updateStudentSubjectMutation);
    const result = get(response, 'body.data.updateStudentSubject');
    expect(result).toBeTruthy();
    expect(dbClient.models.studentSubjects.update.mock.calls.length).toBe(1);
    expect(dbClient.models.studentSubjects.update.mock.calls[0][0]).toEqual({
      id: id.toString(),
      studentId: studentsTable[0].id,
      subjectId: subjectsTable[0].id
    });
  });
  it('should throw custom error when there is error in updatingStudentSubject', async () => {
    const studentSubject = require('@daos/studentSubjects');
    const utils = require('@utils');
    jest.spyOn(studentSubject, 'updateStudentSubject').mockImplementation(() => {
      throw new Error();
    });
    const throwSpy = jest.spyOn(utils, 'transformSQLError');
    await getResponse(updateStudentSubjectMutation);
    expect(throwSpy).toBeCalled();
  });
  const updateStudentSubjectWithNameMutation = `
  mutation {
    updateStudentSubject (
      id: ${id},
      studentId: ${studentsTable[0].id},
      studentName: "${studentsTable[0].name}",
      subjectId: ${subjectsTable[0].id},
      subjectName: "${subjectsTable[0].name}"
    ) {
      id
      studentId
      subjectId
    }
  }
  `;
  it('should have mutation to update a new student', async () => {
    jest.spyOn(dbClient.models.studentSubjects, 'update');
    const response = await getResponse(updateStudentSubjectWithNameMutation);
    const result = get(response, 'body.data.updateStudentSubject');
    expect(result).toBeTruthy();
    expect(dbClient.models.studentSubjects.update.mock.calls.length).toBe(1);
    expect(dbClient.models.studentSubjects.update.mock.calls[0][0]).toEqual({
      id: id.toString(),
      studentId: studentsTable[0].id,
      subjectId: subjectsTable[0].id
    });
  });
});
