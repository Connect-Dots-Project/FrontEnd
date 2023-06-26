
import React, { useEffect, useState } from 'react'
import { CookiesProvider } from 'react-cookie';

import '../scss/ConnectLogin.scss';
import { Link, unstable_HistoryRouter, useNavigate } from 'react-router-dom';
import { isLogin } from '../../util/login-util';


const ConnectLogin = () => {

    const [isOpenSignInList, setIsOpenSignList] = useState(false);
    const [isOpenSignIn, setIsOpenSignIn] = useState(false);

    const openSignInList = e => {
        setIsOpenSignList(true);
    };  

    const openSignInBtn = e => {
        setIsOpenSignIn(true);
    };

    const handleCheckboxChange = (event) => {
        const checkboxes = document.querySelectorAll('input[name="gender"]');
        
        checkboxes.forEach((checkbox) => {
            if (checkbox !== event.target) {
                checkbox.checked = false;
            }
        });
    };

    const autoHyphen = (e) => {
        e.target.value = e.target.value
          .replace(/[^0-9]/g, '')
          .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, '$1-$2-$3')
          .replace(/(\-{1,2})$/g, '');
      };
    

    // 상태변수로 회원가입 입력값 관리
    const [userValue, setUserValue] = useState({
        account: '',
        password: '',
        passwordCheck: '',
        userName: '',
        birth: '',
        gender: '',
        phoneNumber: '',
        location: '',
        introduction: ''
    });
    
    // 검증 메세지에 대한 상태변수 관리
    const [message, setMessage] = useState({
        account: '',
        password: '',
        passwordCheck: '',
        userName: '',
        birth: '',
        gender: '',
        phoneNumber: '',
        location: '',
        introduction: ''
    });
    
    
    // 검증 완료 체크에 대한 상태변수 관리
    const [correct, setCorrect] = useState({
        account: false,
        password: false,
        passwordCheck: false,
        userName: false,
        birth: false,
        gender: false,
        phoneNumber: false,
        location: false,
        introduction: false
    });



    // 검증데이터를 상태변수에 저장하는 함수
    const saveInputState = ({
        key,
        inputVal,
        flag,
        msg
    }) => {
        inputVal !== 'pass' && setUserValue({
            ...userValue,
            [key]: inputVal
        });

        setMessage({
            ...message,
            [key]: msg
        });

        setCorrect({
            ...correct,
            [key]: flag
        });
    };

    // 이름 입력창 체인지 이벤트 핸들러
    const nameHandler = e => {

        const nameRegex = /^[가-힣]{2,5}$/;

        const inputVal = e.target.value;

        // 입력값 검증
        let msg; // 검증 메시지를 저장할 변수
        let flag; // 입력 검증체크 변수

        if(!inputVal) { // 빈 칸인 경우
            msg = '유저 이름은 필수입니다';
            flag = false;
        } else if (!nameRegex.test(inputVal)) { // 양식에 맞지 않은 경우
            msg = '2 ~ 5글자 사이의 한글로 작성해주세요!';
            flag = false;
        } else {
            msg = '사용 가능한 이름입니다.';
            flag = true;
        }

        saveInputState({
            key: 'userName',
            inputVal,
            msg,
            flag
        });
    };

    // 비밀번호 입력창 체인지 이벤트 핸들러
    const passwordHandler = e => {

        // 비밀번호가 변동되면 확인란 자동 비우기
        // document.getElementById('Password-Check').value = '';
        document.getElementById('Input-second-password').value = '';
        // setUserValue({
        //     ...userValue,
        //     passwordCheck: ''
        // });

        setMessage({...message, passwordCheck: ''});
        setCorrect({...correct, passwordCheck: false});

        const inputVal = e.target.value;

    const pwRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,20}$/;

    // 검증 시작
    let msg, flag;

        if (!e.target.value) { // 패스워드 안적은거
            msg = '비밀번호는 필수값입니다!';
            flag = false;
        } else if (!pwRegex.test(e.target.value)) {
            msg = '8글자 이상의 영문,숫자,특수문자를 포함해주세요!';
            flag = false;
        } else {
            msg = '사용 가능한 비밀번호입니다.';
            flag = true;
        }

        saveInputState({
            key: 'password',
            inputVal,
            msg,
            flag
            });
    };


    // 비밀번호 확인랑 검증 이벤트 핸들러
    const passwordCheckHandler = e => {

        // 검증 시작
            let msg, flag;
        if (!e.target.value) { // 패스워드 안적은거
          msg = '비밀번호 확인란은 필수값입니다!';
          flag = false;
        } else if (userValue.password !== e.target.value) {
          msg = '패스워드가 일치하지 않습니다.';
          flag = false;
        } else {
          msg = '패스워드가 일치합니다.';
          flag = true;
        }

        saveInputState({
              key: 'passwordCheck',
              inputVal: 'pass',
              msg,
              flag
            });
    };


    const openLogin = e => {
        const $loginBox = document.getElementById('LoginModalBox');
        const $back = document.querySelector('.backDrop');

        if ($loginBox.style.height !== '800px') {
          $loginBox.style.animation = 'openLoginModal 1s forwards 1';
        } else {
          $loginBox.style.animation = 'none';
        }

        if ($loginBox && $back && $loginBox.style.display !== 'block') {
            $loginBox.style.display = 'block';
             $back.style.display = 'block';
        } else {
            $loginBox.style.display = 'none';
            $back.style.display = 'none';
        }

    };


    const openSignIn = e => {
        const $signInBox = document.querySelector('.signin-modal-box');

        if ($signInBox && $signInBox.style.display !== 'block') {
            $signInBox.style.display = 'block';
        } else {
            $signInBox.style.display = 'none';
        }

        if($signInBox.style.height !== '800px') {
            $signInBox.style.animation = 'openSignInModal 1s forwards 1';
        } else {
            $signInBox.style.animation = 'none';
        }
        setIsOpenSignIn(true);
    };

    const closeLogin = e => {
        const $loginBox = document.querySelector('.login-modal-box');
        const $back = document.querySelector('.backDrop');

        if ($loginBox && $back && $loginBox.style.display === 'block') {
            $loginBox.style.animation = 'closeLoginModal 1s forwards 1';
            $back.style.display = 'none';
        }
    };

    const closeSignIn = e => {
        const $signBox = document.querySelector('.signin-modal-box');

        if ($signBox && $signBox.style.display === 'block') {
            $signBox.style.animation = 'closeSignInModal 1s forwards 1';
        }
    };



    const openCertifyEmailModal = async() => {

        const $emailModalWrapper = document.getElementById('EmailModalWrapper');
        $emailModalWrapper.style.display = 'block';
        $emailModalWrapper.style.animation = 'openCertifyEmailModal 1s forwards 1';


        const inputEmail = document.getElementById('Input-email');

        const res = await fetch('http://localhost:8181/connects/sign-up/email', {
            method: 'POST',
            headers: { 'content-type': 'application/json'},
            body: JSON.stringify({
                email: inputEmail.value
            })
        });

        const {code} = await res.json();

    };

    const closeCertifyEmailModal = e => {

        const $emailModal = document.querySelector('.certify-email-wrapper');

        if ($emailModal && $emailModal.style.display === 'block') {
            $emailModal.style.animation = 'closeCertifyEmailModal 1s forwards 1';
        }
    };

    const clickCertify = async() => {

        const $inputCode = document.getElementById('Input-code');
        const $signInEmail = document.getElementById('SignInEmail');

        const res = await fetch('http://localhost:8181/connects/sign-up/check', {
            method: 'POST',
            headers: { 'content-type': 'application/json'},
            body: JSON.stringify({
                code: $inputCode.value
            })
        });

        const { checkResult } = await res.json();

        console.log(checkResult + '       <<<<<< sign-up/check');

        if(!checkResult) {
            alert('코드가 일치하지 않습니다!');
            document.querySelector('.certify-email-input').value='';
        } else {
            // 일치했을 때
            alert('코드가 일치합니다!');
            closeCertifyEmailModal();

            if ($signInEmail) {
                $signInEmail.style.transform = 'translateY(-250px)';
                $signInEmail.style.transition = '0.3s';
            }
              
            setIsOpenSignList(true);
        }
    };

    const RequestSignin = async() => {

        const $requestSigninBtn = document.getElementById('RequestSigninBtn');

        const $inputEmail = document.getElementById('Input-email');
        const $inputFirstPW = document.getElementById('Input-first-password');
        const $inputSecondPW = document.getElementById('Input-second-password');
        const $inputName = document.getElementById('Input-name');
        const $inputNickname = document.getElementById('Input-nickname');
        const $inputBirthday = document.getElementById('Input-birthday');
        const $inputGender = document.getElementById('Input-gender');
        const $inputPhone = document.getElementById('Input-phone');
        const $inputLocation = document.getElementById('Input-location');
        const $inputComment = document.getElementById('Input-comment');


        const res = await fetch('http://localhost:8181/connects/sign-up', {
            method: 'POST',
            headers: { 'content-type': 'application/json'},
            body: JSON.stringify({

                    account: $inputEmail.value,
                    firstPassword: $inputFirstPW.value,
                    secondPassword: $inputSecondPW.value,
                    name: $inputName.value,
                    nickName: $inputNickname.value,
                    birthDay: $inputBirthday.value,
                    gender: $inputGender.value,
                    phone: $inputPhone.value,
                    location: $inputLocation.value,
                    comment: $inputComment.value,
                    loginMethod: "COMMON"
            })
        });

        console.log(res);
        // TODO : 창 닫히게 res
        const $signBox = document.querySelector('.signin-modal-box');

        if ($signBox && $signBox.style.display === 'block') {
            $signBox.style.animation = 'closeSignInModal 1s forwards 1';
        }

    };




    const redirection = useNavigate();
    const [isLogInTest, setIsLogInTest] = useState(false);
    // 페이지 로드 시, 로컬 스토리지에서 로그인 상태를 확인하여 설정

    useEffect(() => {
        const storedLoggedInStatus = localStorage.getItem('isLogInTest');
        if (storedLoggedInStatus === 'true') {
            setIsLogInTest(true);
        }
    }, []);

    const REQUEST_URL = 'http://localhost:8181/connects/login';

    // 서버에 AJAX 요청
    const fetchLogin = async() => {

        

        // 이메일, 비밀번호 입력 태그 얻어오기
        const $email = document.getElementById('ID');
        const $password = document.getElementById('PW');


        const MyToken = localStorage.getItem('Authorization');
        // localStorage.setItem('Authorization', token);

        const res = await fetch(REQUEST_URL, {
            method: 'POST',
            headers: { 
                'content-type': 'application/json',
                'Authorization' : MyToken
        },
            credentials: 'include', // 쿠키가 필요하다면 추가하기
            body: JSON.stringify({
                account: $email.value,
                password: $password.value,
                isAutoLogin: true              
            })
        });


        // 가입이 안되어있거나, 비밀번호가 틀린 경우
        if(res.status === 400) {
            // 서버에서 온 문자열 읽기
            const text = await res.text();
            alert(text);
            return;
        }


        // 서버에서 온 json 읽기
        const { email } = await res.json();
        // REFACTORING : 추후 서버에서 상태코드로 리턴할 예정
        if(!email) {
            alert('아이디 혹은 비밀번호가 틀렸습니다.');
            document.getElementById('ID').value='';
            document.getElementById('PW').value='';
        } else {
            setIsLogInTest(true);
            alert('환영합니다!');
            const $loginBox = document.querySelector('.login-modal-box');
            const $back = document.querySelector('.backDrop');

            if ($loginBox && $back && $loginBox.style.display === 'block') {
                $loginBox.style.animation = 'closeLoginModal 1s forwards 1';
                $back.style.display = 'none';
            }


        }


        const token = res.headers.get('Authorization');
        localStorage.setItem('Authorization', token);

        console.log(res.headers);
        console.log(res.headers.get);
        console.log(document.cookie);

        // TODO: 쿠키 가져오기


        console.log(token);
        console.log(localStorage.getItem('Authorization'));

        
        // TODO : 로그인에 성공한 유저의 이메일과 토큰 출력
        console.log('--------------');
        console.log(email);
        
        // json에 담긴 인증정보를 클라이언트에 보관
        // 1. 로컬 스토리지 - 브라우저가 종료되어도 보관 (자동 로그인)
        // 2. 세션 스토리지 - 브라우저가 종료되면 사라짐 (자동 로그아웃)
        // localStorage.setItem('ACCESS_TOKEN', token);
        // localStorage.setItem('LOGIN_USERNAME', 'test1');
        // localStorage.setItem('USER_ROLE', 'role');

        // 홈으로 리다이렉트
        // redirection('/');

    };

    // // 로그인 요청 핸들러
    // const loginHandler = async (e) => {
    //         e.preventDefault();
    //
    //         // 서버에 로그인 요청 전송
    //         // await fetchLogin();
    //         fetchLogin();
    //         //TODO : 2번 찍혀서 잠시 주석처리
    //     };


        // 로그아웃 핸들러
        const logoutHandler = e => {
            setIsLogInTest(false);
            localStorage.clear();
            window.location.href = '/';
        };

        const checkNickname = async (event) => {
            const inputNickname = event.target.value;
          
            // 중복 검사를 위해 서버로 요청을 보냄
            const response = await fetch('http://localhost:8181/connects/sign-up/check', {
              method: 'POST',
              headers: { 'content-type': 'application/json' },
              body: JSON.stringify({ nickname: inputNickname }),
            });
          
            const { isDuplicate } = await response.json();
          
            if (isDuplicate) {
              // 중복된 별명이 있을 경우 처리 로직
              console.log('중복된 별명입니다!');
            } else {
              // 중복된 별명이 없을 경우 처리 로직
              console.log('사용 가능한 별명입니다!');
            }
          };

        return (
            <>
        <div className='backDrop'></div>
        {/* 로그인 모달 box */}
        <div className='login-modal-box' id='LoginModalBox'>
            <button className='closeBtn' onClick={ closeLogin }>X</button>
            <header id='Header'></header>

            {/* container (로그인 입력창) */}
            <div id='Container'>
                <div className='login-wrapper'>

                    <div className='login-box'>

                        {/* 아이디, 비밀번호 입력 */}
                        <div className='id-pw-box'>
                            <input
                                className='inputBox'
                                id='ID'
                                placeholder='아이디'
                                autoFocus
                            ></input>
                            <input
                                className='inputBox'
                                id='PW'
                                placeholder='비밀번호'
                                type={'password'}
                            ></input>
                            <div className='auto-login-check-box'>
                                <div className='auto-login-check'>
                                    <input type='checkbox' className='auto-login'/>
                                    <p className='checkbox-text'>자동로그인</p>
                                </div>
                            </div>
                        </div>


                        <div className='login-btn-box'>
                            <button
                            //TODO: 로그인 온클릭
                                onClick={ fetchLogin }
                                className='login-btn'
                            >Login</button>
                        </div>

                    </div>
                    {/* 아이디, 비밀번호 찾기 */}
                    <div className='search-id-pw-wrapper'>
                        <ul className='search-id-pw-box'>
                            <li className='search-id-pw' id='SearchID'>
                                <Link to={'/nb-search-ID'} className='search-id'>
                                    <p className='search-text'>아이디 찾기</p>
                                </Link>
                            </li>
                            <li className='search-id-pw' id='SearchPW'>
                                <Link to={'/nb-search-PW'} className='search-pw'>
                                    <p className='search-text'>비밀번호 찾기</p>
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className='division-wrapper'>
                        <div className='division-box'></div>
                            <span>
                                <div className='division-text-box'>
                                    <p className='division-text'>또는</p>
                                </div>
                            </span>
                        <div className='division-box'></div>
                    </div>

                    {/* 회원가입 box */}
                    <div className='ch-signin-box'>
                        {/* 회원가입 */}
                        <button id='Sign-in' onClick={ openSignIn }>회원가입</button>
                    </div>


                </div>
            </div>

            <footer id='Footer'>
                <div className='social-login-wrapper'>
                    <ul className='social-login-box'>
                        <li className='social-login-list kakao'>
                            <Link to={'/'} className='social-img-text-box'>
                                <div className='img-box' id='KakaoTalk'></div>
                                <div className='social-text' id='KakaoTalkText'>KakaoTalk 로그인</div>
                            </Link>
                        </li>
                        <li className='social-login-list google'>
                            <Link to={'/'} className='social-img-text-box'>
                                <div className='img-box'id='Google'></div>
                                <div className='social-text' id='GoogleText'>Google 로그인</div>
                            </Link>
                        </li>
                        <li className='social-login-list naver'>
                            <Link to={'/'} className='social-img-text-box'>
                                <div className='img-box'id='Naver'></div>
                                <div className='social-text' id='NaverText'>Naver 로그인</div>
                            </Link>
                        </li>
                    </ul>
                </div>
            </footer>
        </div>

        {/* 회원가입 */}
        <div className='signin-modal-box'>
            <button className='closeBtn' onClick={ closeSignIn }>X</button>
            <header id='Header'>
                <div className='user-profile-box'>
                </div>
            </header>

            {/* container (회원가입 입력창) */}
            <div id='Container'>
                <ul className='signin-wrapper'>
                    
                    {isOpenSignIn && (
                        <li className='signin-info-list' id='SignInEmail'>
                            <input id='Input-email' className='signin-info-text' placeholder='아이디 (이메일)' autoFocus></input>
                                <span className='certify-email-btn-box'>
                                    <button className='certify-email-btn' onClick={ openCertifyEmailModal }>이메일 인증</button>
                                </span>
                        </li>
                    )}

                        {isOpenSignInList && (
                            <li className='signin-info-list fade-in-a'>
                                <input
                                    className='signin-info-text'
                                    placeholder='비밀번호'
                                    type='password'
                                    id='Input-first-password'
                                    onChange={ passwordHandler }
                                    ></input>
                                {message.password && (
                                    <span style={
                                        correct.password
                                        ? {color:'yellow'}
                                        : {color:'red'}}
                                        className='input-span'>{message.password}
                                </span>)}
                            </li>
                        )}

                        {isOpenSignInList && (
                            <li className='signin-info-list fade-in-b'>
                                <input
                                    className='signin-info-text'
                                    placeholder='비밀번호 확인'
                                    id='Input-second-password'
                                    onChange={ passwordCheckHandler }
                                    ></input>
                                {message.passwordCheck && (
                                    <span id='Check-Span' style={
                                        correct.passwordCheck
                                        ? {color:'yellow'}
                                        : {color:'red'}}
                                        className='input-span'>{message.passwordCheck}
                                </span>)}
                            </li>
                        )}

                        {isOpenSignInList && (
                            <li className='signin-info-list fade-in-c'>
                                <input
                                    className='signin-info-text'
                                    placeholder='이름'
                                    id='Input-name'
                                    onChange={ nameHandler }
                                    ></input>
                                {message.userName && (
                                    <span style={
                                        correct.userName
                                        ? {color:'yellow'}
                                        : {color:'red'}}
                                        className='input-span'>{message.userName}
                                </span>)}
                            </li>
                        )}

                        {isOpenSignInList && (
                            <li className='signin-info-list fade-in-d'>
                                <input 
                                    className='signin-info-text' 
                                    placeholder='별명' 
                                    id='Input-nickname' 
                                    onChange={checkNickname}
                                ></input>
                            </li>
                        )}

                        {isOpenSignInList && (
                        <li className='signin-info-list fade-in-e'>
                            <label htmlFor='Input-gender'><p id='GenderText'>성별 :</p>
                                <input type='checkbox' id='Input-gender' name='gender' value='F' onChange={handleCheckboxChange} /><p>F</p>
                                <input type='checkbox' id='Input-gender' name='gender' value='M' onChange={handleCheckboxChange} /><p>M</p>
                            </label>
                        </li>
                        )}

                        {isOpenSignInList && (
                            <li className='signin-info-list fade-in-f'>
                                <input className='signin-info-text' placeholder='생년월일 (1900-00-00)' id='Input-birthday'></input>
                            </li>
                        )}

                        {isOpenSignInList && (
                            <li className='signin-info-list fade-in-g'>
                                <input 
                                    className='signin-info-text' 
                                    placeholder='핸드폰 번호 (010-0000-0000)' 
                                    id='Input-phone'
                                    onChange={autoHyphen}
                                ></input>
                            </li>
                        )}

                        {isOpenSignInList && (
                            <li className='signin-info-list fade-in-h'>
                                <input className='signin-info-text' placeholder='지역 ex) 강남구' id='Input-location'></input>
                            </li>
                        )}

                        {isOpenSignInList && (
                            <li className='signin-info-list fade-in-i'>
                                <input className='signin-info-text' placeholder='한줄소개' id='Input-comment'></input>
                            </li>
                        )}


                </ul>
            </div>

            <footer className='footer' id='Footer'>
                <div className='signinBtn-box'>
                    <button className='signinBtn' id='RequestSigninBtn' onClick={ RequestSignin }>회원가입</button>
                </div>
            </footer>
        </div>

        <div className='connect-header-login-wrapper'>
        {isLogInTest ? (
            <div className='ch-logout-box'>
                <button id='Logout' onClick={ logoutHandler }>로그아웃</button>
            </div>
        ) : (
            <div className='ch-login-box'>
                <button id='Login' onClick={ openLogin }>로그인</button>
            </div>
        )
        }
        </div>

        {/* 이메일 인증 모달 */}
        <div id='EmailModalWrapper' className='certify-email-wrapper'>
            <button className='certify-email-wrapper-close-btn' onClick={ closeCertifyEmailModal }></button>
            <div className='certify-email-box'>
                <div className='certify-email-input-btn-box'>
                    <input id='Input-code' type='text' className='certify-email-input' placeholder='메일로 받은 인증 코드를 입력해주세요' />
                </div>
                <div className='certify-btn-box'>
                    <button id='Certify-btn' className='certify-btn' onClick={ clickCertify }>인증하기</button>
                </div>
            </div>
        </div>
    </>
  )
}

export default ConnectLogin