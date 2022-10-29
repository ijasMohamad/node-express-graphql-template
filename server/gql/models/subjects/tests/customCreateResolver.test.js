import get from 'lodash/get';
import { getResponse, mockDBClient, resetAndMockDB } from '@server/utils/testUtils';
import { studentsTable, subjectsTable } from '@server/utils/testUtils/mockData';

describe('Subject graphQL-server-DB mutation tests', () => {
  let dbClient;
  beforeEach(() => {
    dbClient = mockDBClient();
    resetAndMockDB(null, {}, dbClient);
  });
  const limit = 1;
  const offset = 0;
  const createSubjectWithStudentMutation = `
    mutation {
      createSubject (
        name: "${subjectsTable[0].name}",
        studentId: ${studentsTable[0].id}
      ) {
        id
        name
        students (limit: ${limit}, offset: ${offset}) {
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
  it('should have mutation to create a new subject with student', async () => {
    jest.spyOn(dbClient.models.sequelize, 'transaction');

    jest.spyOn(dbClient.models.subjects, 'create');

    await getResponse(createSubjectWithStudentMutation).then(response => {
      const result = get(response, 'body.data.createSubject');
      expect(result).toMatchObject({
        id: subjectsTable[0].id,
        name: subjectsTable[0].name,
        students: { edges: [{ node: { id: studentsTable[0].id, name: studentsTable[0].name } }] }
      });
    });
  });
  it('should throw custom error when there is error in creatingSubjectWithStudent', async () => {
    const studentSubjects = require('@daos/studentSubjects');
    const utils = require('@utils');
    jest.spyOn(studentSubjects, 'insertStudentSubjects').mockImplementation(() => {
      throw new Error();
    });
    const throwSpy = jest.spyOn(utils, 'transformSQLError');
    await getResponse(createSubjectWithStudentMutation);
    expect(throwSpy).toBeCalled();
  });
});
