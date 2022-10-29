import get from 'lodash/get';
import { getResponse, mockDBClient, resetAndMockDB } from '@utils/testUtils';
import { studentsTable, subjectsTable } from '@utils/testUtils/mockData';

describe('Student graphql-server-db customCreateResolver test', () => {
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
  it('should have mutation to create a new student with subject', async () => {
    jest.spyOn(dbClient.models.sequelize, 'transaction');

    jest.spyOn(dbClient.models.students, 'create');

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
    jest.spyOn(dbClient.models.sequelize, 'transaction');
    jest.spyOn(studentSubjects, 'insertStudentSubjects').mockImplementation(() => {
      throw new Error();
    });
    const throwSpy = jest.spyOn(utils, 'transformSQLError');
    await getResponse(createStudentWithSubjectMutation);
    expect(throwSpy).toBeCalled();
  });
});
