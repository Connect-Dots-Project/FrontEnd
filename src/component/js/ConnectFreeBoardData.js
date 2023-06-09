import React from 'react'

import '../scss/ConnectFreeBoardData.scss';

const ConnectFreeBoardData = ({ freeBoardLocation, freeBoardWriteDate }) => {

  return (
    <>
        <li className='fbm-inr-info' id='Area'>{freeBoardLocation}</li>
        <li className='fbm-inr-info' id='BoardTitle'>게시판 제목 게시판 제목 게시판 제목 게시판 제목 게시판 제목 게시판 제목 </li>
        <li className='fbm-inr-info' id='Categories'>[카테고리]</li>
        <li className='fbm-inr-info' id='Date'>{freeBoardWriteDate}</li>
        <span>
            {/* 댓글 + 좋아요 box */}
            <div className='reply-like-box'>
                <div className='reply' id='Reply'>
                    <div className='reply-img'></div>
                    <div className='reply-count-box'>
                        <p className='reply-count-text'>100</p>
                    </div>
                </div>
                <div className='like' id='Like'>
                    <div className='like-img'></div>
                    <div className='like-count-box'>
                        <p className='like-count-text'>50</p>
                    </div>
                </div>
            </div>
        </span>

    </>
  )
}

export default ConnectFreeBoardData