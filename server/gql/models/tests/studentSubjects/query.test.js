import { studentSubjectsTable } from '@server/utils/testUtils/mockData';
import { getResponse, mockDBClient, resetAndMockDB } from '@utils/testUtils';
import get from 'lodash/get';

describe('student_subject graphQL-server-DB query tests', () => {
  const id = 1;
  const studentSubjectOne = `
  query {
    studentSubject (id: ${id}) {
      id 
      studentId
      subjectId
    }
  }
  `;
  it('should request for students and subjects related to the studentSubjects', async () => {
    const dbClient = mockDBClient();
    resetAndMockDB(null, {}, dbClient);
    await getResponse(studentSubjectOne).then(response => {
      const result = get(response, 'body.data.studentSubject');
      expect(result).toBeTruthy();
      expect(result).toEqual(
        expect.objectContaining({
          id: studentSubjectsTable[0].id,
          studentId: studentSubjectsTable[0].studentId.toString(),
          subjectId: studentSubjectsTable[0].subjectId.toString()
        })
      );
    });
  });
});
