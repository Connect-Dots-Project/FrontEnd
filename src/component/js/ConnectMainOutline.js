import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import { Link, Route, Routes } from 'react-router-dom';
import ConnectHotPlace from './ConnectHotPlace';
import ConnectFreeBoard from './ConnectFreeBoard';
import ConnectPlayList from './ConnectPlayList';
import ConnectStoreInfo from './ConnectStoreInfo';
import ConnectLiveChatting from './ConnectLiveChatting';

import '../scss/ConnectMainOutline.scss';
import ConnectStoreSales from './ConnectStoreSales';

const ConnectMainOutline = () => {

    const [isChangeOutline, setIsChangeOutline] = useState(true);
    const [isChangeStore, setIsChangeStore] = useState(true);
    const [isClosePost, setIsClosePost] = useState(true);
    
    const closeChangeMenu = e => {
        const $menuClose = document.getElementById('CmoMenu');
        
        if($menuClose) {
            $menuClose.style.animation = 'closeOutline 2s forwards 1';
        }
        
        setTimeout(() => {
            setIsChangeOutline(false);
            setIsChangeStore(false);
        }, 1000);
    };
    
    const openChangeMenu = e => {
        setIsChangeOutline(true);
    };
    
    
    const closeCreatePost = e => {
        setIsClosePost(false);
    };
    

    
    
    const [isClickColorHotPlace, setIsClickColorHotPlace] = useState(false);
    const [isClickColorFreeBoard, setIsClickColorFreeBoard] = useState(false);
    const [isClickColorPlaylist, setIsClickColorPlaylist] = useState(false);
    
    const clickChangeColorHandlerHotPlace = () => {
        setIsClickColorHotPlace(!isClickColorHotPlace);
    };
    
    const clickChangeColorHandlerFreeBoard = () => {
        setIsClickColorFreeBoard(!isClickColorFreeBoard);
    };
    
    const clickChangeColorHandlerPlaylist = () => {
        setIsClickColorPlaylist(!isClickColorPlaylist);
    };
    
    
    const [activeButton, setActiveButton] = useState(null);
    const clickChangeColorHandler = (buttonId) => {
        setActiveButton(buttonId);
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
                            isChangeOutline ? 'closeOutline' : 'closeAnimation'
                        }`}
                        id='StoreModal'
                    ><ConnectStoreSales />
                </div>
                )}

                    






                    <ul className='cmo-menu' id='CmoMenu'>
                    <Link to={'/contents/hot-place'} className='cmo-list' id='Hot-Place'>
                        {isChangeOutline && (
                            <div className='link-box'>
                                <div className='list-box'>
                                    <button
                                        className={`cmo-menu-list hot-place list ${
                                        activeButton === 'Hot-Place' ? 'normal-border' : 'clicked-border'
                                        }`}
                                        onClick={() => clickChangeColorHandler('Hot-Place')}
                                    ></button>
                                    <p className='cmo-text'>Hot Place</p>
                                </div>
                            </div>
                        )}
                    </Link>
                    <Link to={'/contents/free-board'} className='cmo-list' id='Real-time-Chatting'>
                        {isChangeOutline && (
                            <div className='link-box'>
                                <div className='list-box'>
                                    <button className={`cmo-menu-list real-time-chatting list ${
                                        activeButton === 'Real-time-Chatting' ? 'normal-border' : 'clicked-border'
                                        }`}
                                        onClick={() => clickChangeColorHandler('Real-time-Chatting')}
                                        ></button>
                                    <p className='cmo-text'>동네 자유 게시판</p>
                                </div>
                            </div>
                        )}
                    </Link>
                    <Link to={'/nb-playlist'} className='cmo-list' id='Making-Friends'>
                        {isChangeOutline && (
                            <div className='link-box'>
                                <div className='list-box'>
                                    <button className={`cmo-menu-list making-friends list ${
                                        activeButton === 'Making-Friends' ? 'normal-border' : 'clicked-border'
                                        }`}
                                        onClick={() => clickChangeColorHandler('Making-Friends')}
                                        ></button>
                                    <p className='cmo-text'>동네 플레이 리스트</p>
                                </div>
                            </div>
                        )}
                    </Link>

                    <Link to={'/contents/cvs'} className='cmo-list' id='Closing-sale'>
                        <button onClick={ closeChangeMenu } className='cmo-change-btn'>
                            {isChangeOutline && (
                                <div className='link-box'>
                                    <div className='list-box'>
                                        <button className={`cmo-menu-list closing-sale list ${
                                        activeButton === 'Closing-sale' ? 'normal-border' : 'clicked-border'
                                        }`}
                                        onClick={() => clickChangeColorHandler('Closing-sale')}
                                        ></button>
                                        <p className='cmo-text'>동네 편의점 정보</p>
                                    </div>
                                </div>
                            )}
                        </button>
                    </Link>
                </ul>



                {/* 고정 메인 메뉴 전환 게시판 box */}
                <div className='cmo-change-board-box'>
                    <div className='cmo-change-board'>
                        <Routes>
                            <Route path='/contents/hot-place' element={ <ConnectHotPlace closeCreatePost={closeCreatePost}/> }></Route>
                        </Routes>
                        <Routes>
                            <Route path='/contents/free-board' element={ <ConnectFreeBoard closeCreatePost={closeCreatePost}/> }></Route>
                        </Routes>
                        <Routes>
                            <Route path='/nb-live-chatting' element={ <ConnectLiveChatting /> }></Route>
                        </Routes>
                        <Routes>
                            <Route path='/nb-playlist' element={ <ConnectPlayList /> }></Route>
                        </Routes>
                        <Routes>
                            <Route path='/contents/cvs' element={ <ConnectStoreInfo /> }></Route>
                        </Routes>
                        <Routes>
                            <Route path='/nb-closing-sale' element={<ConnectStoreSales />} />
                        </Routes>
                    </div>
                </div>

            </div>
        </div>
    </>

  )
}

export default ConnectMainOutline