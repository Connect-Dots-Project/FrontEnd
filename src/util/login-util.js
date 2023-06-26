
// 토큰 및 로그인 유저 데이터를 브라우저에 저장하는 함수
export const setLoginUserInfo = ({ token, account, nickname }) => {
    localStorage.setItem('ACCESS_TOKEN', token);
    localStorage.setItem('ACCOUNT', account);
    localStorage.setItem('NICKNAME', nickname);
  };
  
  // 로그인한 유저의 데이터 객체를 반환하는 함수
  export const getLoginUserInfo = () => {
    return {
      token: localStorage.getItem('ACCESS_TOKEN'),
      username: localStorage.getItem('ACCOUNT'),
      usernickname: localStorage.getItem('NICKNAME')
    };
  };
  
  // 로그인 여부를 확인하는 함수
  export const isLogin = () => !!localStorage.getItem('ACCESS_TOKEN');