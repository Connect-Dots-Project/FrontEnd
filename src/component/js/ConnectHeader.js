import React from 'react'
import { Link } from 'react-router-dom';

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
                    <li className='ch-menu-list'><Link to={'/'} className='list'>Home</Link></li>
                    <li className='ch-menu-list'><Link to={'/nb-hot-place'} className='list' id='Hot-Place'>Hot Place</Link></li>
                    <li className='ch-menu-list'><Link to={'/nb-real-time-chatting'} className='list'>동네 실시간 채팅</Link></li>
                    <li className='ch-menu-list'><Link to={'/nb-making-friends'} className='list'>동네 친구 만들기</Link></li>
                    <li className='ch-menu-list'><Link to={'/nb-closing-sale'} className='list'>동네 마감 세일</Link></li>
                    <li className='ch-menu-list'><Link to={'/nb-store-event-info'} className='list'>편의점 행사 정보</Link></li>
                </ul>
            </div>
        </div>

        {/* 로그인 버튼 box */}
        <div className='connect-header-login-wrapper'>
            {/* 로그인 box */}
            <div className='ch-login-box'>
                {/* 로그인 */}
                <Link to={'/nb-login'} id='Login'>로그인</Link>
            </div>
            {/* 회원가입 box */}
            <div className='ch-signin-box'>
                {/* 회원가입 */}
                <Link to={'/nb-signin'} id='Sign-in'>회원가입</Link>
            </div>
        </div>    
    </>
  )
}

export default ConnectHeader