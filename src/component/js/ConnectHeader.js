import React from 'react'

import '../scss/ConnectHeader.scss';

const ConnectHeader = () => {
  return (
    <>
    {/* connect-header-wrapper  */}
    <div className='connect-header-wrapper'>
        {/* header 제목 box */}
        {/* ch = connect-header */}
        <div className='ch-title-box'> 
            {/* header 제목 */}
            <a href='#' id='Title'>TITLE</a>
        </div>
        {/* header 메뉴 box */}
        <div className='ch-menu-box'>
            {/* header 메뉴 */}
            <ul className='ch-menu'>
                {/* header 메뉴 list */}
                <li className='ch-menu-list'><a href='#' className='list'>홈</a></li>
                <li className='ch-menu-list'><a href='#' className='list'>Hot Place</a></li>
                <li className='ch-menu-list'><a href='#' className='list'>동네 실시간 채팅</a></li>
                <li className='ch-menu-list'><a href='#' className='list'>동네 친구 만들기</a></li>
                <li className='ch-menu-list'><a href='#' className='list'>동네 마감 세일</a></li>
                <li className='ch-menu-list'><a href='#' className='list'>편의점 행사 정보</a></li>
            </ul>
        </div>
    </div>
    
    {/* 로그인 버튼 box */}
    <div className='connect-header-login-box'>
        {/* 로그인 버튼 */}
        <a href='#' id='Login'>로그인</a>
    </div>
    {/* 회원가입 버튼 box */}
    <div className='connect-header-signin-box'>
        {/* 회원가입 버튼 */}
        <a href='#' id='Sign-in'>회원가입</a>
    </div>
    </>
  )
}

export default ConnectHeader