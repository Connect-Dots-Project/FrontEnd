import React from 'react'
import { Link } from 'react-router-dom';

import '../scss/ConnectMainOutline.scss';
// import ConnectHotPlace from './ConnectHotPlace';
import ConnectFreeBoard from './ConnectFreeBoard';

const ConnectMainOutline = () => {
   
  return (
    <>
        {/* 고정 메인 전체 */}
        <div className='connect-main-outline-wrapper'>
            {/* 고정 메인 header */}
            <header className='cmo-h1-box'>
                {/* 고정 메인 header text */}
                <h1>우리동네 100% 즐기기!</h1>
            </header>

            {/* 고정 메인 container */}
            <div className='cmo-container'>
                {/* 고정 메인 메뉴 box */}
                <ul className='cmo-menu'>
                    <li className='cmo-menu-list hot-place'>
                        <Link to={'/nb-hot-place'} className='list' id='Hot-Place'>
                            <p className='cmo-text'>Hot Place</p>
                        </Link>
                    </li>
                    <li className='cmo-menu-list real-time-chatting'>
                        <Link to={'/nb-real-time-chatting'} className='list' id='Real-time-Chatting'>
                            <p className='cmo-text'>동네 실시간 채팅</p>
                        </Link>
                    </li>
                    <li className='cmo-menu-list making-friends'>
                        <Link to={'/nb-making-friends'} className='list' id='Making-Friends'>
                            <p className='cmo-text'>동네 친구 만들기</p>
                        </Link>
                    </li>
                    <li className='cmo-menu-list closing-sale'>
                        <Link to={'/nb-closing-sale'} className='list' id='Closing-sale'>
                            <p className='cmo-text'>동네 마감 세일</p>
                        </Link>
                    </li>
                </ul>

                {/* 고정 메인 메뉴 전환 게시판 box */}
                <div className='cmo-change-board-box'>
                    {/* 고정 메인 메뉴 전환 게시판 */}
                    <div className='cmo-change-board'>
                        <ConnectFreeBoard />
                    </div>
                </div>
            </div>
        </div>
    </>

  )
}

export default ConnectMainOutline