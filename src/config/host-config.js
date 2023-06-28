

// 브라우저가 현재 클라이언트의 호스트 이름 얻어오기
const clientHostName = window.location.hostname;

let backEndHostName; // 백엔드 서버 호스트 이름

// if (clientHostName === 'localhost') {
  backEndHostName = 'http://localhost:8181';
// } else if (clientHostName === '330-special-bucket.s3-website.ap-northeast-2.amazonaws.com') {
  // backEndHostName = 'http://13.125.104.141';
// }

export const API_BASE_URL = backEndHostName;
export const TODO = '/api/todos';
export const USER = '/api/auth';