import get from 'lodash/get';
import { getResponse, mockDBClient, resetAndMockDB } from '@utils/testUtils';
import { studentsTable, subjectsTable } from '@utils/testUtils/mockData';

describe('Student graphQL-server-DB mutation tests', () => {
  let dbClient;
  beforeEach(() => {
    dbClient = mockDBClient();
    resetAndMockDB(null, {}, dbClient);
  });
  const limit = 1;
  const offset = 0;
  const createStudentWithSubjectMutation = `
  mutation {
    createStudent (
      name: "${studentsTable[0].name}",
      subjectId: ${subjectsTable[0].id}
    ) {
      id
      name
      subjects (limit: ${limit}, offset: ${offset}) {
        edges {
          node {
            id
            name
          }
        }
      }
    }
  }
  `;

  const updateStudentMutation = `
    mutation {
      updateStudent (
        id: ${studentsTable[0].id},
        name: "${studentsTable[0].name}"
      ) {
        id
      }
    }
  `;

  const deleteStudentMutation = `
    mutation {
      deleteStudent (
        id: ${studentsTable[0].id}
      ) {
        id
      }
    }
  `;
  it('should have mutation to create a new student with subject', async () => {
    await getResponse(createStudentWithSubjectMutation).then(response => {
      const result = get(response, 'body.data.createStudent');
      expect(result).toMatchObject({
        id: studentsTable[0].id,
        name: studentsTable[0].name,
        subjects: { edges: [{ node: { id: subjectsTable[0].id, name: subjectsTable[0].name } }] }
      });
    });
  });
  it('should throw custom error when there is error in creatingStudentWithSubject', async () => {
    const studentSubjects = require('@daos/studentSubjects');
    const utils = require('@utils');
    jest.spyOn(studentSubjects, 'insertStudentSubjects').mockImplementation(() => {
      throw new Error();
    });
    const throwSpy = jest.spyOn(utils, 'transformSQLError');
    await getResponse(createStudentWithSubjectMutation);
    expect(throwSpy).toBeCalled();
  });
  it('should have a mutation to update a new student', async () => {
    jest.spyOn(dbClient.models.students, 'update');
    const response = await getResponse(updateStudentMutation);
    const result = get(response, 'body.data.updateStudent');
    expect(result).toBeTruthy();
    expect(dbClient.models.students.update.mock.calls.length).toBe(1);
    expect(dbClient.models.students.update.mock.calls[0][0]).toEqual({
      id: studentsTable[0].id.toString(),
      name: studentsTable[0].name
    });
    expect(dbClient.models.students.update.mock.calls[0][1]).toEqual({
      where: {
        id: studentsTable[0].id.toString(),
        deletedAt: null
      }
    });
  });
  it('should have a mutation to delete a student', async () => {
    jest.spyOn(dbClient.models.students, 'destroy');
    const response = await getResponse(deleteStudentMutation);
    const result = get(response, 'body.data.deleteStudent');
    expect(result).toBeTruthy();
    expect(dbClient.models.students.destroy.mock.calls.length).toBe(1);
    expect(dbClient.models.students.destroy.mock.calls[0][0]).toEqual({
      where: {
        deletedAt: null,
        id: parseInt(studentsTable[0].id)
      }
    });
  });
});
