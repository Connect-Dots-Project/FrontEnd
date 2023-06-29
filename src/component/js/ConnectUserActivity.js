import React, { useState } from 'react'
import ConnectUserActivityHotPlace from './ConnectUserActivityHotPlace';
import ConnectUserActivityFreeBoard from './ConnectUserActivityFreeBoard';
import ConnectUserWritten from './ConnectUserWritten';

import '../scss/ConnectUserActivity.scss';

const ConnectUserActivity = () => {
    
    const [isOpenHotPlace, setIsOpenHotPlace] = useState(false);
    const [isOpenFreeBoard, setIsOpenFreeBoard] = useState(false);
    
    // Hot Place
    const openHotPlace = e => {
        setIsOpenHotPlace(true);
        setIsOpenFreeBoard(false);
    };
    
    // 자유게시판
    const openFreeBoard = e => {
        setIsOpenFreeBoard(true);
        setIsOpenHotPlace(false);
    };
    
    
    return (
        <>
        
        <div id='UserActivityWrapper'>
            <div className='user-activity-box'>

                <div className='ua-header-wrapper'>
                    <div className='ua-header-box'>
                        <div className='ua-header-wrapper'>
                            <div className='ua-btn-box'>
                                <button 
                                    className='ua-btn' 
                                    id='HotPlace'
                                    onClick={ openHotPlace }
                                    >
                                    <p>Hot Place</p>
                                </button>
                                <button 
                                    className='ua-btn' 
                                    id='FreeBoard'
                                    onClick={ openFreeBoard }
                                    >
                                    <p>자유게시판</p>
                                </button>
                            </div>
                            {/* <ConnectUserWritten /> */}
                                {isOpenHotPlace && <ConnectUserWritten isOpenHotPlace={ isOpenHotPlace } />}
                                {isOpenFreeBoard && <ConnectUserWritten isOpenFreeBoard={ isOpenFreeBoard } />}
                        </div>

                        TODO : ConnectUserActivity.js<br/>
                        TODO : ConnectUserActivity.js<br/>
                        TODO : ConnectUserActivity.js<br/>

                    </div>
                </div>

            <div className='ua-main-wrapper'>
                <div className='ua-main-box'>

                {isOpenHotPlace && <ConnectUserActivityHotPlace />}
                {isOpenFreeBoard &&
                    <>
                        <ConnectUserActivityFreeBoard />
                    </>
                }

                </div>
            </div>

            </div>
        </div>
        </>
    );
};

export default ConnectUserActivity