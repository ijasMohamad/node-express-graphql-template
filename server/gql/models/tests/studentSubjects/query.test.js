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
      expect(get(response, 'body.data.studentSubject')).toBeTruthy();
    });
  });
  const studentSubjectAll = `
  query {
    studentSubjects {
      edges {
        node {
          id
          studentId
          subjectId
        }
      }
    }
  }
  `;
  it('should request for students and subjects related to the studentSubjects with offset', async () => {
    const dbClient = mockDBClient();
    resetAndMockDB(null, {}, dbClient);
    await getResponse(studentSubjectAll).then(response => {
      console.log('Response => ', response);
      expect(get(response, 'body.errors')).toBeTruthy();
    });
  });
});
