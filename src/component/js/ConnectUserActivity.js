import React, { useState } from 'react'
import ConnectUserActivityHotPlace from './ConnectUserActivityHotPlace';
import ConnectUserActivityFreeBoard from './ConnectUserActivityFreeBoard';
import ConnectUserActivityFreeBoardReply from './ConnectUserActivityFreeBoardReply';
import ConnectUserActivityFreeBoardLike from './ConnectUserActivityFreeBoardLike';

import ConnectUserWritten from './ConnectUserWritten';

import '../scss/ConnectUserActivity.scss';

const ConnectUserActivity = () => {
    
    const [isOpenHotPlace, setIsOpenHotPlace] = useState(false);
    const [isOpenFreeBoard, setIsOpenFreeBoard] = useState(false);
    const [isOpenFreeBoardReply, setIsOpenFreeBoardReply] = useState(false);
    
    // Hot Place
    const openHotPlace = e => {
        setIsOpenHotPlace(true);

        setIsOpenFreeBoard(false);
        setIsOpenFreeBoardReply(false);
    };
    
    // 자유게시판
    const openFreeBoard = e => {
        setIsOpenFreeBoard(true);

        setIsOpenFreeBoardReply(false);
        setIsOpenHotPlace(false);
    };

    // 자유게시판 댓글
    const openFreeBoardReply = e => {
        setIsOpenFreeBoardReply(true);
        
        setIsOpenFreeBoard(false);
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
                                    <p>작성한 자유게시판 글</p>
                                </button>
                                <button 
                                    className='ua-btn' 
                                    id='FreeBoard'
                                    onClick={ openFreeBoardReply }
                                    >
                                    <p>작성한 자유게시판 댓글</p>
                                </button>
                            </div>
                            {/* TODO 삭제 */}
                            {/* <ConnectUserWritten /> */}
                                {/* {isOpenHotPlace && <ConnectUserWritten isOpenHotPlace={ isOpenHotPlace } />} */}
                                {/* {isOpenFreeBoard && <ConnectUserWritten isOpenFreeBoard={ isOpenFreeBoard } />} */}
                                {/* {isOpenFreeBoardReply && <ConnectUserWritten isOpenFreeBoard={ isOpenFreeBoardReply } />} */}
                        </div>

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
                {isOpenFreeBoardReply &&
                    <>
                        <ConnectUserActivityFreeBoardReply />
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