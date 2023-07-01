
import React, { useEffect, useState } from 'react'
import { CookiesProvider, useCookies } from 'react-cookie'
// import Select from 'react-select';

import '../scss/ConnectLogin.scss';
import { Link, unstable_HistoryRouter, useNavigate } from 'react-router-dom';
import { getLoginUserInfo, isLogin, setLoginUserInfo } from '../../util/login-util';
import { API_BASE_URL } from '../../config/host-config';
import { DropDown } from '@grapecity/wijmo.input';
import swal from 'sweetalert';
import { DinnerDining } from '@mui/icons-material';


const ConnectLogin = () => {

    const [cookies , setCookie, removeCookie] = useCookies('REFRESH_TOKEN');


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


        let msg;
        let flag;
        let phoneFlag;

        
        e.target.value = e.target.value
        .replace(/[^0-9]/g, '')
        .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, '$1-$2-$3')
        .replace(/(\-{1,2})$/g, '');
        
        
          fetch(API_BASE_URL + '/connects/sign-up/check-phone', {
              method: 'POST',
              headers: {
                  'content-type' : 'application/json'
                },
                body: JSON.stringify({phone : e.target.value})
                
                
            })
            .then(res => {
                return res.json()
            })
            .then(result => 
                {
                    phoneFlag = result.checkPhone;
                    // console.log(phoneFlag);
                       
                    if(e.target.value.length < 13) {
                        msg = '올바르지 않은 형식입니다'
                        flag = false;
                    } else if (!phoneFlag) {
                        msg = '이미 가입된 번호입니다.'
                        flag = false;
                    } else {
                        msg = '사용가능한 번호입니다.'
                        flag = true;
                    }

                    saveInputState({
                        key: 'phoneNumber',
                        msg,
                        flag
                    });
                    
                });
                
                
             

        
    };


    const autoHyphenBirth = (e) => {
        let inputValue = e.target.value.replace(/[^0-9]/g, ''); // 숫자 이외의 문자 제거
        inputValue = inputValue.substring(0, 8); // 최대 8자까지만 유지

        const year = inputValue.substring(0, 4);
        const month = inputValue.substring(4, 6);
        const day = inputValue.substring(6, 8);

        let formattedValue = '';

        if (year) {
          formattedValue += year;
        }

        if (month) {
          formattedValue += '-' + month;
        }

        if (day) {
          formattedValue += '-' + day;
        }

        e.target.value = formattedValue;

        e.target.value = e.target.value
          .replace(/[^0-9]/g, '') // 숫자 이외의 문자 제거
          .replace(/^(\d{0,4})(\d{0,2})(\d{0,2})$/g, '$1-$2-$3') // YYYY-MM-DD 형식으로 변환
          .replace(/(\-{1,2})$/g, ''); // 마지막에 -가 있는 경우 제거
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
        nickName: '',
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
        nickName: false,
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

        const inputVal =    DinnerDining    e.target.value;

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
                key: '50%',
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

        document.getElementById('ID').value='';
        document.getElementById('PW').value='';

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

        
        
        const inputEmail = document.getElementById('Input-email');
        
        if (inputEmail.value.length === 0) {
            swal('알림','이메일을 입력하세요.','warning');
            return;
        }

        const checkEmailResponse = await fetch(API_BASE_URL + '/connects/sign-up/check-email' , {
            method: 'POST',
            headers: { 'content-type': 'application/json'},
            body: JSON.stringify({ email: inputEmail.value })
        });

        if(checkEmailResponse.status === 400) {
            swal('알림','이메일 양식이 다릅니다. 다시 입력해주세요','warning');
            return;
        }

        const { checkEmail } = await checkEmailResponse.json();

        // console.log(checkEmail);

        if (!checkEmail) {
            swal('알림','이미 가입한 회원입니다.','warning');
            return;
        }


        const $emailModalWrapper = document.getElementById('EmailModalWrapper');
        $emailModalWrapper.style.display = 'block';
        $emailModalWrapper.style.animation = 'openCertifyEmailModal 1s forwards 1';


        const res = await fetch(API_BASE_URL + '/connects/sign-up/email', {
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
        const $signInEmailModal = document.getElementById('EmailModalWrapper');
        const $certifyEmailBtn = document.getElementById('CertifyEmailBtn');
        const $inputEmail = document.getElementById('Input-email');

        const res = await fetch(API_BASE_URL + '/connects/sign-up/check', {
            method: 'POST',
            headers: { 'content-type': 'application/json'},
            body: JSON.stringify({
                code: $inputCode.value
            })
        });

        const { checkResult } = await res.json();

        // console.log(checkResult + '       <<<<<< sign-up/check');

        if(!checkResult) {
            swal('알림','코드가 일치하지 않습니다!','warning');
            document.querySelector('.certify-email-input').value='';
        } else {
            // 일치했을 때
            swal('알림','코드가 일치합니다!','success');
            closeCertifyEmailModal();

            if ($signInEmail) {
                $signInEmail.style.transform = 'translateY(-250px)';
                $signInEmail.style.transition = '0.3s';
                $signInEmailModal.style.display = 'none';
                $certifyEmailBtn.style.pointerEvents = 'none';
                $inputEmail.style.pointerEvents = 'none';
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

        // alert(selectedOption);

        console.log(selectedOption);
        

        const res = await fetch(API_BASE_URL + '/connects/sign-up', {
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
                    location: selectedOption,
                    comment: $inputComment.value,
                    loginMethod: "COMMON"
            })
        });

        // console.log(res);
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

    const REQUEST_URL = API_BASE_URL + '/connects/login';

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
            swal('알림', '아이디 또는 비밀번호를 다시 확인해주세요', 'warning');
            // document.getElementById('ID').value = '';
            document.getElementById('PW').value = '';
            return;
        }


        // 서버에서 온 json 읽기
        const { account, nickname } = await res.json();
        // REFACTORING : 추후 서버에서 상태코드로 리턴할 예정


        if(!account) {
            swal('알림','아이디 혹은 비밀번호가 틀렸습니다.','warning');
            // document.getElementById('ID').value='';
            document.getElementById('PW').value='';
        } else {
            swal({
                
              })
            setIsLogInTest(true);
            const $loginBox = document.querySelector('.login-modal-box');
            const $back = document.querySelector('.backDrop');
            
            if ($loginBox && $back && $loginBox.style.display === 'block') {
                $loginBox.style.animation = 'closeLoginModal 1s forwards 1';
                $back.style.display = 'none';















            }
            
            // window.location.reload();
        }


        const token = res.headers.get('Authorization');
        localStorage.setItem('Authorization', token);





        // console.log(res.headers);
        // console.log(res.headers.get);
        // console.log(nickname);
        // console.log(account);

        // console.log(document.cookie);

        // // TODO: 쿠키 가져오기

        // console.log(token);
        // console.log(localStorage.getItem('Authorization'));

            localStorage.setItem('ACCESS_TOKEN', token);
            localStorage.setItem('ACCOUNT', account);
            localStorage.setItem('NICKNAME', nickname);

            // TODO : setLoginUserInfo 가 안 됨
            // setLoginUserInfo(token, account, nickname);




        // TODO : 로그인에 성공한 유저의 이메일과 토큰 출력
        // console.log('--------------');
        // console.log(email);
        
        // json에 담긴 인증정보를 클라이언트에 보관
        // 1. 로컬 스토리지 - 브라우저가 종료되어도 보관 (자동 로그인)
        // 2. 세션 스토리지 - 브라우저가 종료되면 사라짐 (자동 로그아웃)
        localStorage.setItem('isLogInTest', 'true');
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
            const confirmLogout = swal({
              title: "경고",
              text: "정말 로그아웃 하시겠습니까?",
              icon: "warning",
              buttons: true,
              dangerMode: true,
            }).then(confirmLogout => {
              if (confirmLogout) {
                swal({
                  title: "알림",
                  text: "로그아웃 되었습니다.",
                  icon: "success",
                  timer: 1500 // 3초 동안 알림을 표시한 후에 사라집니다
                });
                localStorage.clear();
                localStorage.removeItem('refreshtoken');
                removeCookie('REFRESH_TOKEN');
                setTimeout(() => {
                    window.location.href = '/';
                }, 1500);
              } 
            });
                  
            // if(confirmLogout) {
            //     setIsLogInTest(false);
            //     localStorage.clear();
            //     localStorage.removeItem('refreshtoken');
            //     removeCookie('REFRESH_TOKEN');
            //     window.location.href = '/';
            // }
        };

    const checkNickname = async (e) => {
        const inputNickname = e.target.value;

        // 중복 검사를 위해 서버로 요청을 보냄
        const response = await fetch(API_BASE_URL + '/connects/sign-up/check-nickname', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ nickname: inputNickname }),
        });

        const { checkNickname } = await response.json();

        if (checkNickname) {
            // 중복된 별명이 있을 경우 처리 로직
            // console.log('사용 가능한 별명입니다!');
        } else {
            // 중복된 별명이 없을 경우 처리 로직
            // console.log('중복된 별명입니다!');
        }

        const nameRegex = /^[가-힣]{2,5}$/;
        const inputVal = e.target.value;

        // 입력값 검증
        let msg; // 검증 메시지를 저장할 변수
        let flag; // 입력 검증체크 변수

        if(!inputVal) { // 빈 칸인 경우
            msg = '별명을 입력해주세요';
            flag = false;
        } else if (!nameRegex.test(inputVal)) { // 양식에 맞지 않은 경우
            msg = '한글로 2 ~ 5자로 작성해주세요';
            flag = false;
        } else if (!checkNickname) {
            msg = '중복된 별명입니다';
            flag = false;
        } else {
            msg = '사용 가능한 별명입니다.';
            flag = true;
        }

        saveInputState({
            key: 'nickName',
            inputVal,
            msg,
            flag
        });
    };

    const introduce = (e) => {
        const nameRegex = /^[가-힣]{1,50}$/;
        let inputVal = e.target.value;

        // 입력값 검증
        let msg; // 검증 메시지를 저장할 변수
        let flag; // 입력 검증체크 변수

        if (!inputVal) { // 빈 칸인 경우
            msg = '자유롭게 표현해주세요';
            flag = false;
        } else if (!nameRegex.test(inputVal)) { // 양식에 맞지 않은 경우
            msg = '';
            flag = false;
        } else {
            msg = '환영합니다!';
            flag = true;
        }

        const maxLength = 50;
        const currentLength = inputVal.length;
        const remainingLength = maxLength - currentLength;

        const lengthMessage = `(${currentLength}/${maxLength})`;

        if (currentLength === maxLength) {
            flag = false;
            msg = '최대 50글자입니다'
        }

        saveInputState({
            key: 'introduction',
            inputVal,
            msg: msg + lengthMessage,
            flag
        });}


        // TODO : prompt 를 입력받는 창 만들기
        // TODO : alert 띄우는 창 만들기 (custom alert, 모달 등)
        const findAccount = async() => {
            const inputPhone = prompt('핸드폰 번호를 입력하세요');

            const response = await fetch(API_BASE_URL + '/connects/login/find/account', {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({ phone: inputPhone }),
            });

            const { account } = await response.json();

            // console.log(account);
            if(account === null) {
                swal('알림','가입하지 않은 핸드폰 번호 입니다.','warning');
                return;
            }

            swal('알림','찾은 아이디는 ' + account + '입니다.','success');
        }
        
        // TODO : 이메일 인증 창 만들어야함. 회원가입과 같은 느낌으로
        // - 로직 -
        // 1. 이메일을 입력받는다. [front : 입력받는 창 필요]
        // 2. 서버로 전송 [front : fetch 요청]
        // ----> [response 에 따라]
        //     1. 해당 이메일로 가입된 멤버가 없다면
        //           ----> [front : 가입된 정보가 없음을 알리고 로직 종료]
        //     2. 해당 이메일로 가입된 멤버가 있다면 
        //           ----> [back : 암호코드를 이메일로 발송]
        //          1. 암호코드를 입력받는다. [front : 입력받는 창 필요 + 서버로 fetch 요청]
        //               ----> [response 에 따라]
        //                   1. 입력한 암호가 틀린 경우 
        //                          ----> [front : 암호 재입력받기]
        //                   2. 입력한 암호가 맞은 경우
        //                          ----> [front : 새 비밀번호 입력받기]
        //                               1. 입력받은 비밀번호는 새 비밀번호로 적용됨 [front : 입력받은 비밀번호를 담은 request 보내기]
        // const findPassword = async() => {
        //     alert('findPassword');



        // }


        
          
          const [selectedOption, setSelectedOption] = useState('강남구');
          
          const handleDropdownChange = (selected) => {    
            // console.log(selected.value);

            setSelectedOption(selected.target.value);
            // 드롭박스 값 변경 시 수행할 동작을 여기에 작성합니다.
          };

        //   document.addEventListener('keydown', function(event) {
        //     if (event.key === 'Enter') {
        //         fetchLogin();
        //     }
        // });




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
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter') {
                                      fetchLogin();
                                    }
                                  }}
                            ></input>
                            {/* <div className='auto-login-check-box'>`
                                <div className='auto-login-check'>
                                    <input type='checkbox' className='auto-login'/>
                                    <p className='checkbox-text'>자동로그인</p>
                                </div>
                            </div> */}
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
                                    <p className='search-text' onClick={ findAccount }>아이디 찾기</p>
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

            {/* <footer id='Footer'>
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
            </footer> */}
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
                                    <button id='CertifyEmailBtn' className='certify-email-btn' onClick={ openCertifyEmailModal }>이메일 인증</button>
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
                                    type='password'
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
                                {message.nickName && (
                                    <span style={
                                        correct.nickName
                                        ? {color:'yellow'}
                                        : {color:'red'}}
                                        className='input-span'>{message.nickName}
                                </span>)}
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
                                <input
                                    className='signin-info-text'
                                    placeholder='생년월일 (1900-00-00)'
                                    id='Input-birthday'
                                    onChange={ autoHyphenBirth }
                                ></input>
                                {message.birth && (
                                    <span style={
                                        correct.birth
                                        ? {color:'yellow'}
                                        : {color:'red'}}
                                        className='input-span'>{message.birth}
                                </span>)}
                            </li>
                        )}

                        {isOpenSignInList && (
                            <li className='signin-info-list fade-in-g'>
                                <input
                                    className='signin-info-text'
                                    placeholder='핸드폰 번호 (010-0000-0000)'
                                    id='Input-phone'
                                    maxLength={13}
                                    onChange={autoHyphen}
                                ></input>
                                 {message.phoneNumber && (
                                    <span style={
                                        correct.phoneNumber
                                        ? {color:'yellow'}
                                        : {color:'red'}}
                                        className='input-span'>{message.phoneNumber}
                                </span>)}
                            </li>
                        )}

                        {isOpenSignInList && (
                        <div className='signin-info-list fade-in-h'>

                            <div className='signin-info-text' id='Input-location'>
                                <div className='select-location-box'>
                                    <select className='select-location' id='Input-location' value={selectedOption} onChange={handleDropdownChange}>
                                        <option value={'강남구'} className='select-option' ><p>강남구</p></option>
                                        <option value={'강동구'} className='select-option' ><p>강동구</p></option>
                                        <option value={'강북구'} className='select-option' ><p>강북구</p></option>
                                        <option value={'강서구'} className='select-option' ><p>강서구</p></option>
                                        <option value={'관악구'} className='select-option' ><p>관악구</p></option>
                                        <option value={'광진구'} className='select-option' ><p>광진구</p></option>
                                        <option value={'구로구'} className='select-option' ><p>구로구</p></option>
                                        <option value={'금천구'} className='select-option' ><p>금천구</p></option>
                                        <option value={'노원구'} className='select-option' ><p>노원구</p></option>
                                        <option value={'도봉구'} className='select-option' ><p>도봉구</p></option>
                                        <option value={'동대문구'} className='select-option' ><p>동대문구</p></option>
                                        <option value={'동작구'} className='select-option' ><p>동작구</p></option>
                                        <option value={'마포구'} className='select-option' ><p>마포구</p></option>
                                        <option value={'서대문구'} className='select-option' ><p>서대문구</p></option>
                                        <option value={'서초구'} className='select-option' ><p>서초구</p></option>
                                        <option value={'성동구'} className='select-option' ><p>성동구</p></option>
                                        <option value={'성북구'} className='select-option' ><p>성북구</p></option>
                                        <option value={'송파구'} className='select-option' ><p>송파구</p></option>
                                        <option value={'양천구'} className='select-option' ><p>양천구</p></option>
                                        <option value={'영등포구'} className='select-option' ><p>영등포구</p></option>
                                        <option value={'용산구'} className='select-option' ><p>용산구</p></option>
                                        <option value={'은평구'} className='select-option' ><p>은평구</p></option>
                                        <option value={'종로구'} className='select-option' ><p>종로구</p></option>
                                        <option value={'중구'} className='select-option' ><p>중구</p></option>
                                        <option value={'중랑구'} className='select-option' ><p>중랑구</p></option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        )}

                        {isOpenSignInList && (
                            <li className='signin-info-list fade-in-i'>
                                <input
                                    className='signin-info-text'
                                    placeholder='한줄소개'
                                    id='Input-comment'
                                    maxLength={50}
                                    onChange={ introduce }
                                ></input>
                                {message.introduction && (
                                    <span style={
                                        correct.introduction
                                        ? {color:'yellow'}
                                        : {color:'yellow'}}
                                        className='input-span'>{message.introduction}
                                </span>)}
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
                <button id='Logout' onClick={ logoutHandler }></button>
                <p>로그아웃▲</p>
            </div>
        ) : (
            <div className='ch-login-box'>
                <button id='Login' onClick={ openLogin }></button>
                <p>로그인▲</p>
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

export default ConnectLogin;