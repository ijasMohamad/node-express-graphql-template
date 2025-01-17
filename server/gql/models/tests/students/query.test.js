import get from 'lodash/get';
import { getResponse, mockDBClient, resetAndMockDB } from '@utils/testUtils';
import { studentsTable, subjectsTable } from '@server/utils/testUtils/mockData';

describe('Student graphQL-server-DB query tests', () => {
  const studentId = 1;
  const offset = 0;
  const limit = 1;
  const studentOne = `
    query {
      student (id: ${studentId}) {
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
  it('should request for subjects related to the students with offset and limit', async () => {
    const dbClient = mockDBClient();
    resetAndMockDB(null, {}, dbClient);

    jest.spyOn(dbClient.models.subjects, 'findAll').mockImplementation(() => [subjectsTable[0]]);

    await getResponse(studentOne).then(response => {
      const result1 = get(response, 'body.data.student');
      expect(result1).toBeTruthy();

      expect(result1).toEqual(
        expect.objectContaining({
          id: studentsTable[0].id,
          name: studentsTable[0].name
        })
      );
      const result2 = get(response, 'body.data.student.subjects.edges[0].node');
      expect(result2).toEqual(
        expect.objectContaining({
          id: subjectsTable[0].id,
          name: subjectsTable[0].name
        })
      );
      expect(dbClient.models.subjects.findAll.mock.calls.length).toBe(1);
      expect(dbClient.models.subjects.findAll.mock.calls[0][0].include[0].where).toEqual({ studentId });
      expect(dbClient.models.subjects.findAll.mock.calls[0][0].include[0].model.name).toEqual('student_subjects');
    });
  });
  const studentTest = `
  query {
    student (id: ${studentId}) {
      id
      name
      subjects {
        edges {
          node {
            id
          }
        }
      }
    }
  }
  `;
  it('should request for subjects related to the students with limit and offset', async () => {
    const dbClient = mockDBClient();
    resetAndMockDB(null, {}, dbClient);

    jest.spyOn(dbClient.models.subjects, 'findAll').mockImplementation(() => [subjectsTable[0]]);

    await getResponse(studentTest).then(response => {
      expect(get(response, 'body.errors')).toBeTruthy();
    });
  });
  const studentDepthLimitTest = `
  query {
    student (id: ${studentId}) {
      id
      name
      subjects (limit: ${limit}, offset: ${offset}) {
        edges {
          node {
            id
            students (limit: ${limit}, offset: ${offset}) {
              edges {
                node {
                  id
                }
              }
            }
          }
        }
      }
    }
  }
  `;
  it('should be the depth limit is less than or equal to 6', async () => {
    const dbClient = mockDBClient();
    resetAndMockDB(null, {}, dbClient);

    jest.spyOn(dbClient.models.subjects, 'findAll').mockImplementation(() => [subjectsTable[0]]);

    await getResponse(studentDepthLimitTest).then(response => {
      expect(get(response, 'body.errors')).toBeTruthy();
    });
  });
});
