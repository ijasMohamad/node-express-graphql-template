import get from 'lodash/get';
import { getResponse, mockDBClient, resetAndMockDB } from '@server/utils/testUtils';
import { studentsTable, subjectsTable } from '@server/utils/testUtils/mockData';

describe('Subject graphQL-server-DB query tests', () => {
  const subjectId = 1;
  const subjectOne = `
    query {
      subject (id: ${subjectId}) {
        id
        name
        students {
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
  it('should request for subjects', async () => {
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
});
