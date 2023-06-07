import React from 'react'

import '../scss/ConnectFreeBoardData.scss';

const ConnectFreeBoardData = ({ addData }) => {

  return (
    <>
        <li className='fbm-inr-info' id='Area'></li>
        <li className='fbm-inr-info' id='BoardTitle'>게시판 제목</li>
        <li className='fbm-inr-info' id='SaleInfo'>[세일 정보]</li>
        <li className='fbm-inr-info' id='Date'>2023.06.03</li>
        <span>
            {/* 댓글 + 좋아요 box */}
            <div className='reply-like-box'>
                <div className='reply' id='Reply'>
                    <div className='reply-img'></div>
                </div>
                <div className='like' id='Like'>
                    <div className='like-img'></div>
                </div>
            </div>
        </span>

    </>
  )
}

export default ConnectFreeBoardData