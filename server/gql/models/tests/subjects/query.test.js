import get from 'lodash/get';
import { getResponse, mockDBClient, resetAndMockDB } from '@server/utils/testUtils';
import { studentsTable, subjectsTable } from '@server/utils/testUtils/mockData';

describe('Subject graphQL-server-DB query tests', () => {
  const subjectId = 1;
  const offset = 0;
  const limit = 1;
  const subjectOne = `
    query {
      subject (id: ${subjectId}) {
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
  it('should request for students relate to the subjects with offset and limit', async () => {
    const dbClient = mockDBClient();
    resetAndMockDB(null, {}, dbClient);

    jest.spyOn(dbClient.models.students, 'findAll').mockImplementation(() => [studentsTable[0]]);

    await getResponse(subjectOne).then(response => {
      const result1 = get(response, 'body.data.subject');
      expect(result1).toBeTruthy();

      expect(result1).toEqual(
        expect.objectContaining({
          id: subjectsTable[0].id,
          name: subjectsTable[0].name
        })
      );
      const result2 = get(response, 'body.data.subject.students.edges[0].node');
      expect(result2).toEqual(
        expect.objectContaining({
          id: studentsTable[0].id,
          name: studentsTable[0].name
        })
      );
      expect(dbClient.models.students.findAll.mock.calls.length).toBe(1);
      expect(dbClient.models.students.findAll.mock.calls[0][0].include[0].where).toEqual({ subjectId });
      expect(dbClient.models.students.findAll.mock.calls[0][0].include[0].model.name).toEqual('student_subjects');
    });
  });
  const subjectTest = `
  query {
    subject (id: ${subjectId}) {
      id
      name
      students {
        edges {
          node {
            id
          }
        }
      }
    }
  }
  `;
  it('should request for studets relate to the subjects with offset and limit', async () => {
    const dbClient = mockDBClient();
    resetAndMockDB(null, {}, dbClient);

    jest.spyOn(dbClient.models.students, 'findAll').mockImplementation(() => [studentsTable[0]]);

    await getResponse(subjectTest).then(response => {
      expect(get(response, 'body.errors')).toBeTruthy();
    });
  });
  const subjectDepthLimitTest = `
  query {
    subject (id: ${subjectId}) {
      id
      name
      students (limit: ${limit}, offset: ${offset}) {
        edges {
          node {
            id
            subjects (limit: ${limit}, offset: ${offset}) {
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

    jest.spyOn(dbClient.models.students, 'findAll').mockImplementation(() => [studentsTable[0]]);

    await getResponse(subjectDepthLimitTest).then(response => {
      expect(get(response, 'body.errors')).toBeTruthy();
    });
  });
});
