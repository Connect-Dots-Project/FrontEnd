import React from 'react'
import { useLocation } from 'react-router-dom';
import { Link, Route, Routes } from 'react-router-dom';
import ConnectFreeBoard from './ConnectFreeBoard';
import ConnectHotPlace from './ConnectHotPlace';
import ConnectStoreInfo from './ConnectStoreInfo';
import ConnectSales from './ConnectSales';
import ConnectFriends from './ConnectFriends';

import '../scss/ConnectMainOutline.scss';
import ConnectLiveChatting from './ConnectLiveChatting';

const ConnectMainOutline = () => {

    const $location = useLocation();

    if ($location.pathname === '/') {
        return null;
    }

    const clickList = e => {
        const $list = document.querySelector('.cmo-list');
        
    };

   
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
                    <Link to={'/contents/hot-place'} className='cmo-list' id='Hot-Place' onClick={ clickList }>
                        <div className='link-box'>
                            <li className='cmo-menu-list hot-place'></li>
                            <p className='cmo-text'>Hot Place</p>
                        </div>
                    </Link>
                    <Link to={'/contents/free-board'} className='cmo-list' id='Real-time-Chatting' onClick={ clickList }>
                        <div className='link-box'>
                            <li className='cmo-menu-list real-time-chatting'></li>
                            <p className='cmo-text'>동네 자유 게시판</p>
                        </div>
                    </Link>
                    <Link to={'/nb-playlist'} className='cmo-list' id='Making-Friends' onClick={ clickList }>
                        <div className='link-box'>
                            <li className='cmo-menu-list making-friends'></li>
                            <p className='cmo-text'>동네 플레이 리스트</p>
                        </div>
                    </Link>
                    <Link to={'/nb-closing-sale'} className='cmo-list' id='Closing-sale' onClick={ clickList }>
                        <div className='link-box'>
                            <li className='cmo-menu-list closing-sale'></li>
                            <p className='cmo-text'>동네 편의점 정보</p>
                        </div>
                    </Link>
                </ul>

                {/* 고정 메인 메뉴 전환 게시판 box */}
                <div className='cmo-change-board-box'>
                    <div className='cmo-change-board'>
                        <Routes>
                            <Route path='/contents/hot-place' element={ <ConnectHotPlace /> }></Route>
                        </Routes>
                        <Routes>
                            <Route path='/contents/free-board' element={ <ConnectFreeBoard /> }></Route>
                        </Routes>
                        <Routes>
                            <Route path='/nb-live-chatting' element={ <ConnectLiveChatting /> }></Route>
                        </Routes>
                        <Routes>
                            <Route path='/nb-playlist' element={ <ConnectFriends /> }></Route>
                        </Routes>
                        <Routes>
                            <Route path='/nb-closing-sale' element={ <ConnectSales /> }></Route>
                        </Routes>
                        <Routes>
                            <Route path='/nb-store-event-info' element={ <ConnectStoreInfo /> }></Route>
                        </Routes>
                    </div>
                </div>


            </div>
        </div>
    </>

  )
}

export default ConnectMainOutline