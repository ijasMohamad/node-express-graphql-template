import get from 'lodash/get';
import { getResponse, mockDBClient, resetAndMockDB } from '@utils/testUtils';
import { studentsTable } from '@utils/testUtils/mockData';

describe('Student graphQL-server-DB mutation tests', () => {
  let dbClient;
  beforeEach(() => {
    dbClient = mockDBClient();
    resetAndMockDB(null, {}, dbClient);
  });

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
