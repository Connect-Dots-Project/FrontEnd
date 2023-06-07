import React, { useState } from 'react'

import '../scss/ConnectFreeBoard.scss';
import { Link } from 'react-router-dom';
import ConnectFreeBoardData from './ConnectFreeBoardData';

const ConnectFreeBoard = () => {

    // 주소 요청
    const API_FREE_BOARD_URL = 'http://localhost/contents/free-board';

    // Json
    const [fbData, setFbData] = useState([]);

    const addData = () => {
        
        const newFbData = {
            freeBoardLocation: '강북구',
            // freeBoardIdx: 1,
            // freeBoardImg: null,
            // freeBoardCategory: '친목',
            // freeBoardWriteDate: '2023-06-03T14:09:38',
            // freeBoardUpdateDate: '2023-06-03T14:09:38',
            // freeBoardViewCount: 0,
            // freeBoardReplyCount: 0,
            // freeBoardLikeCount: 0,
            // memberIdx: 1
        };

        fetch(API_FREE_BOARD_URL, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(newFbData)
        })
        .then(res => res.json())
        .then(json => {
            setFbData(json.fbData);
        })
    };

  return (
    <>
        {/* 자유게시판 전체 */}
        <div className='free-board-wrapper'>    
            {/* 자유게시판 */}
            <div className='fb-box'>
                {/* 자유게시판 header */}
                <header className='fb-header'>
                    {/* 자유게시판 header text box*/}
                    <div className='fbh-info-box'>
                        <div className='icon-box'></div>
                        <div className='fbh-text-box'>
                            <h2>주간 Best!</h2>
                            <p>가장 많이 검색한 관심정보입니다.</p>
                        </div>
                    </div>
                    {/* 자유게시판 header best menu box */}
                    <ul className='fbh-best-info-box'>
                        <li className='fbh-best-info-list'>
                            <Link to={'/'} className='fbh-best-info-text-box'>
                                <p className='fbh-best-info-text'>서울시 청년수당</p>
                            </Link>
                        </li>
                        <li className='fbh-best-info-list'>
                            <Link to={'/'} className='fbh-best-info-text-box'>
                                <p className='fbh-best-info-text'>대중교통비 지원</p>
                            </Link>
                        </li>
                        <li className='fbh-best-info-list'>
                            <Link to={'/'} className='fbh-best-info-text-box'>
                                <p className='fbh-best-info-text'>서울 영테크</p>
                            </Link>
                        </li>
                        <li className='fbh-best-info-list'>
                            <Link to={'/'} className='fbh-best-info-text-box'>
                                <p className='fbh-best-info-text'>서울청년문화패스</p>
                            </Link>
                        </li>
                        <li className='fbh-best-info-list'>
                            <Link to={'/'} className='fbh-best-info-text-box'>
                                <p className='fbh-best-info-text'>강남구 존맛탱</p>
                            </Link>
                        </li>
                    </ul>
                </header>

                {/* 자유 게시판 */}
                <div className='free-board-main-container'>
                    {/* 자유 게시판 box */}
                    <ul className='fbm-info-box'>

                        {/* 반복 */}
                        {/* 자유 게시판 정보 */}
                        <li className='fbm-info-list'>
                            {/* 자유 게시판 정보 사진 box */}
                            <div className='fbm-info-img-box'>
                                {/* 자유 게시판 정보 사진 */}
                                <div className='fbm-info-img'></div>
                            </div>
                            {/* 자유 게시판 세부 정보 box */}
                            <ul className='fbm-inr-info-box'>
                                {/* 자유 게시판 세부 정보 */}
                                <ConnectFreeBoardData addData={addData }/>
                            </ul>
                        </li>
                    {/* 반복 */}        





                    </ul>
                </div>


            </div>
        </div>    
    </>
  )
}

export default ConnectFreeBoard