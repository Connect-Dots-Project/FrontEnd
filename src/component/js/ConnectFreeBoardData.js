import React, { useState } from 'react'

import '../scss/ConnectFreeBoardData.scss';
import '../scss/ConnectFreeBoard.scss';
import ConnectFreeBoardDetail from './ConnectFreeBoardDetail';

const ConnectFreeBoardData = ({ freeBoardList }) => {

    const {freeBoardCategory, freeBoardContent, freeBoardIdx, freeBoardImg, freeBoardLikeCount, freeBoardLocation ,
        freeBoardReplyCount, freeBoardTitle, freeBoardUpdateDate, freeBoardViewCount, freeBoardWriteDate, memberIdx
    } = freeBoardList;

    
    const [isOpenInnerBoard, setIsOpenInnerBoard] = useState(false);

    const openInnerBoardModal = e => {
        setIsOpenInnerBoard(true);
    };

    const closeInnerBoardModal = e => {
        setIsOpenInnerBoard(false);
    };

  return (

    <>
    {isOpenInnerBoard && <ConnectFreeBoardDetail freeBoardDetail={ freeBoardList } closeInnerBoardModal={ closeInnerBoardModal } />}

    <button className='fbm-info-list' onClick={ openInnerBoardModal }>
        <div className='fbm-info-img-box'>
            <div className='fbm-info-img'></div>
        </div>
        <ul className='fbm-inr-info-box'>
            <li className='fbm-inr-info' id='Area'>{freeBoardLocation}</li>
            <li className='fbm-inr-info' id='BoardTitle'>{freeBoardTitle}</li>
            <li className='fbm-inr-info' id='Categories'>{freeBoardCategory}</li>
            <li className='fbm-inr-info' id='Date'>{freeBoardUpdateDate}</li>
            <span>
                {/* 댓글 + 좋아요 box */}
                <div className='reply-like-box'>
                    <div className='reply' id='Reply'>
                        <div className='reply-img'></div>
                        <div className='reply-count-box'>
                            <p className='reply-count-text'>{freeBoardReplyCount}</p>
                        </div>
                    </div>
                    <div className='like' id='Like'>
                        <div className='like-img'></div>
                        <div className='like-count-box'>
                            <p className='like-count-text'>{freeBoardLikeCount}</p>
                        </div>
                    </div>
                </div>
            </span>
        </ul>
    </button>

    </>
  )
}

export default ConnectFreeBoardData