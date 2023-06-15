import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import { Link, Route, Routes } from 'react-router-dom';
import ConnectHotPlace from './ConnectHotPlace';
import ConnectFreeBoard from './ConnectFreeBoard';
import ConnectPlayList from './ConnectPlayList';
import ConnectStoreInfo from './ConnectStoreInfo';
import ConnectSales from './ConnectSales';
import ConnectLiveChatting from './ConnectLiveChatting';

import '../scss/ConnectMainOutline.scss';

const ConnectMainOutline = () => {

    const [isChangeOutline, setIsChangeOutline] = useState(true);
    const [isChangeStore, setIsChangeStore] = useState(true);

    const closeChangeMenu = e => {
        const $menuClose = document.getElementById('CmoMenu');
        
        if($menuClose) {
            $menuClose.style.animation = 'closeOutline 2s forwards 1';
        }

        setTimeout(() => {
            setIsChangeOutline(false);
            setIsChangeStore(false);
        }, 1500);
    };
    
    const openChangeMenu = e => {
        setIsChangeOutline(true);
    };








    const $location = useLocation();

    if ($location.pathname === '/') {
        return null;
    }



   
  return (
    <>

        <div className='connect-main-outline-wrapper'>
            <header className='cmo-h1-box'>
                <h1>우리동네 100% 즐기기!</h1>
            </header>

            <div className='cmo-container'>

                {!isChangeStore && (
                    <div
                        className={`store-menu-modal-wrapper ${
                            isChangeOutline ? 'openAnimation' : 'closeAnimation'
                        }`}
                        id='StoreModal'
                    ><ConnectSales />
                </div>
                )}








                    <ul className='cmo-menu' id='CmoMenu'>
                    <Link to={'/contents/hot-place'} className='cmo-list' id='Hot-Place'>
                        {isChangeOutline && (
                            <div className='link-box'>
                                <li className='cmo-menu-list hot-place'></li>
                                <p className='cmo-text'>Hot Place</p>
                            </div>
                        )}
                    </Link>
                    <Link to={'/contents/free-board'} className='cmo-list' id='Real-time-Chatting'>
                        {isChangeOutline && (
                            <div className='link-box'>
                                <li className='cmo-menu-list real-time-chatting'></li>
                                <p className='cmo-text'>동네 자유 게시판</p>
                            </div>
                        )}
                    </Link>
                    <Link to={'/nb-playlist'} className='cmo-list' id='Making-Friends'>
                        {isChangeOutline && (
                            <div className='link-box'>
                                <li className='cmo-menu-list making-friends'></li>
                                <p className='cmo-text'>동네 플레이 리스트</p>
                            </div>
                        )}
                    </Link>

                    <Link to={'/contents/csv'} className='cmo-list' id='Closing-sale'>
                        <button onClick={ closeChangeMenu } className='cmo-change-btn'>
                            {isChangeOutline && (
                                <div className='link-box'>
                                    <li className='cmo-menu-list closing-sale'></li>
                                    <p className='cmo-text'>동네 편의점 정보</p>
                                </div>
                            )}
                        </button>
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
                            <Route path='/nb-playlist' element={ <ConnectPlayList /> }></Route>
                        </Routes>
                        <Routes>
                            <Route path='/contents/csv' element={ <ConnectStoreInfo /> }></Route>
                        </Routes>
                        <Routes>
                            <Route path='/nb-closing-sale' element={ <ConnectSales /> }></Route>
                        </Routes>
                    </div>
                </div>

            </div>
        </div>
    </>

  )
}

export default ConnectMainOutline