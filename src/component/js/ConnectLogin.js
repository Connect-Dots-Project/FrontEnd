import React from 'react'

import '../scss/ConnectLogin.scss';
import { Link } from 'react-router-dom';

const ConnectLogin = () => {

    const openLogin = e => {
        const $loginBox = document.querySelector('.login-modal-box');
        const $back = document.querySelector('.backDrop');
      
        if ($loginBox.style.height !== '500px') {
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
      
        document.addEventListener('mouseup', function(e) {
          const container = document.querySelector('.login-modal-box');
          const $back = document.querySelector('.backDrop');
      
          if (container && !container.contains(e.target)) {
            container.style.animation = 'closeLoginModal 1s forwards 1';
            $back.style.display = 'none';
          } else if (container) {
            container.style.display = 'block';
            $back.style.display = 'block';
          }
        });
    };
      

    const openSignIn = e => {
        const $signInBox = document.querySelector('.signin-modal-box');
        const $back = document.querySelector('.backDrop');
        
        if ($signInBox && $back && $signInBox.style.display !== 'block') {
            $signInBox.style.display = 'block';
            $back.style.display = 'block';
        } else {
            $signInBox.style.display = 'none';
            $back.style.display = 'none';
        }
        
        
        if($signInBox.style.height != '900px') {
            $signInBox.style.animation = 'openSignInModal 1s forwards 1';
        } else {
            $signInBox.style.animation = 'none';
        }
        
        document.addEventListener('mouseup', function(e) {
            const container = document.querySelector('.signin-modal-box');
            const $back = document.querySelector('.backDrop');
            
            if (container && !container.contains(e.target)) {
                container.style.animation = 'closeSignInModal 1s forwards 1';
                // container.style.display = 'none';
                $back.style.display = 'none';
            } else if (container) {
                container.style.display = 'block';
                $back.style.display = 'block';
            }
        });
        
    };
    
    const closeLogin = e => {
        const $loginBox = document.querySelector('.login-modal-box');
        const $back = document.querySelector('.backDrop');
        
        if ($loginBox && $back && $loginBox.style.display === 'block') {
            $loginBox.style.animation = 'closeLoginModal 1s forwards 1';
            // $loginBox.style.display = 'none';
            $back.style.display = 'none';
        }
    };
    
    const closeSignIn = e => {
        const $signBox = document.querySelector('.signin-modal-box');
        const $back = document.querySelector('.backDrop');
        
        if ($signBox && $back && $signBox.style.display === 'block') {
            $signBox.style.animation = 'closeSignInModal 1s forwards 1';
            // $signBox.style.display = 'none';
            $back.style.display = 'none';
        }
    };

    // const certifyEmail = e => {
    //     const $emailBtn = document.querySelector('.certify-email-btn');

    //     if($emailBtn.style.display = 'none') {
    //         $emailBtn.style.display = 'block';
    //     } else {
    //         $emailBtn.style.display = 'none';
    //     }
        

    //     // 이메일 인증 모달
    // }

    
   
    
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
                        <span>
                            <Link to={'/'} className='certify-email-btn-box'>
                                <button className='certify-email-btn'>이메일 인증</button>
                            </Link>
                        </span>
                    </li>
                    <li className='signin-info-list'>
                        <input className='signin-info-text' placeholder='비밀번호'></input>
                    </li>
                    <li className='signin-info-list'>
                        <input className='signin-info-text' placeholder='비밀번호 확인'></input>
                    </li>
                    <li className='signin-info-list'>
                        <input className='signin-info-text' placeholder='이름'></input>
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