import React, { useState } from 'react'

import '../scss/ConnectLogin.scss';
import { Link } from 'react-router-dom';

const ConnectLogin = () => {

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
        document.getElementById('Password-Check').value = '';
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
        const $loginBox = document.querySelector('.login-modal-box');
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
        
        if($signInBox.style.height != '800px') {
            $signInBox.style.animation = 'openSignInModal 1s forwards 1';
        } else {
            $signInBox.style.animation = 'none';
        }
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

    const openCertifyEmailModal = () => {
        const $emailModal = document.querySelector('.certify-email-wrapper');
        $emailModal.style.display = $emailModal.style.display === 'none' ? 'block' : 'none';
        $emailModal.style.animation = 'openCertifyEmailModal 1s forwards 1';
    };
    
    const closeCertifyEmailModal = e => {
        const $emailModal = document.querySelector('.certify-email-wrapper');

        if ($emailModal && $emailModal.style.display === 'block') {
            $emailModal.style.animation = 'closeCertifyEmailModal 1s forwards 1';
        }
    };



    return (
        <>
        <div className='backDrop'></div>
        {/* 로그인 모달 box */}
        <div className='login-modal-box'>
            <button className='closeBtn' onClick={ closeLogin }>X</button>
            <header id='Header'></header>

            {/* container (로그인 입력창) */}
            <div id='Container'>
                <div className='login-wrapper'>
                    <div className='login-box'>

                        {/* 아이디, 비밀번호 입력 */}
                        <div className='id-pw-box'>
                            <form>
                                <input className='inputBox' id='ID' placeholder='아이디' autoFocus></input>
                                <input className='inputBox' id='PW' placeholder='비밀번호'></input>
                            </form>
                        </div>
                        <div className='login-btn-box'>
                            <button className='login-btn'>Login</button>
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
            {/* header (사용자 프로필 이미지) */}
            <header id='Header'>
                <div className='user-profile-box'>
                    {/* <div className='user-profile'>프로필 이미지</div> */}
                </div>
            </header>

            {/* container (회원가입 입력창) */}
            <div id='Container'>
                <ul className='signin-wrapper'>
                    <li className='signin-info-list'>
                        <input className='signin-info-text' placeholder='아이디 (이메일)'></input>
                        <span className='certify-email-btn-box'>
                            <button className='certify-email-btn' onClick={ openCertifyEmailModal }>이메일 인증</button>
                        </span>
                    </li>

                    {/* 비밀번호 */}
                    <li className='signin-info-list'>
                        <input 
                            className='signin-info-text' 
                            placeholder='비밀번호'
                            type='password'
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
                        
                    {/* 비밀번호 확인 */}
                    <li className='signin-info-list'>
                        <input 
                            className='signin-info-text' 
                            placeholder='비밀번호 확인' 
                            id='Password-Check'
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
                    



                    {/* 이름 */}
                    <li className='signin-info-list'>
                        <input 
                            className='signin-info-text' 
                            placeholder='이름' 
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

                    <li className='signin-info-list'>
                        <input className='signin-info-text' placeholder='별명'></input>
                    </li>
                    <li className='signin-info-list'>
                        <input className='signin-info-text' placeholder='성별'></input>
                    </li>
                    <li className='signin-info-list'>
                        <input className='signin-info-text' placeholder='생년월일'></input>
                    </li>
                    <li className='signin-info-list'>
                        <input className='signin-info-text' placeholder='핸드폰 번호'></input>
                    </li>
                    <li className='signin-info-list'>
                        <input className='signin-info-text' placeholder='지역'></input>
                    </li>
                    <li className='signin-info-list'>
                        <input className='signin-info-text' placeholder='한줄소개'></input>
                    </li>
                </ul>
            </div>

            <footer className='footer' id='Footer'>
                <div className='signinBtn-box'>
                    <button className='signinBtn' id='SigninBtn'>회원가입</button>
                </div>
            </footer>
        </div>

        {/* 로그인 버튼 box */}
        <div className='connect-header-login-wrapper'>
        {/* 로그인 box */}
            <div className='ch-login-box'>
                {/* 로그인 */}
                <button id='Login' onClick={ openLogin }>로그인</button>
            </div>
            
        </div>

        <div className='certify-email-wrapper'>
            <button className='certify-email-wrapper-close-btn' onClick={ closeCertifyEmailModal }></button>
            <div className='certify-email-box'>
                <div className='certify-email-input-btn-box'>
                    <input type='text' className='certify-email-input' placeholder='메일로 받은 인증 코드를 입력해주세요' />
                </div>
                <div className='certify-btn-box'>
                    <button className='certify-btn'>인증하기</button>
                </div>
            </div>
        </div>
    </>
  )
}

export default ConnectLogin