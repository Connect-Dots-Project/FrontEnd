import React, { useState } from 'react';

import '../scss/ConnectFreeBoard.scss';
import { Link } from 'react-router-dom';
import ConnectFreeBoardData from './ConnectFreeBoardData';
import ConnectCreatePost from './ConnectCreatePost';

const ConnectFreeBoard = ({ closeCreatePost }) => {
  const [fbData, setFbData] = useState([
    {
        freeBoardIdx: 1,
        freeBoardTitle: "title1",
        freeBoardContent: "content1",
        freeBoardImg: null,
        freeBoardLocation: "강남구",
        freeBoardCategory: "친목",
        freeBoardWriteDate: "2023.06.03",
        freeBoardUpdateDate: "2023.06.03",
        freeBoardViewCount: 0,
        freeBoardReplyCount: 0,
        freeBoardLikeCount: 0,
        memberIdx: 1 
    }
  ]);

    const [isOpenInnerBoard, setIsOpenInnerBoard] = useState(false);

    const openInnerBoard = e => {
      setIsOpenInnerBoard(true);
    };



    const [isOpenWriteBoard, setIsOpenWriteBoard] = useState(false);

    const openWriteBoard = e => {
      setIsOpenWriteBoard(true);
    };
    
    const closeWriteBoard = e => {
      setIsOpenWriteBoard(false);
    };







  return (
    <>

      {isOpenWriteBoard && <ConnectCreatePost closeCreatePost={ closeCreatePost }/>}

      

      {/* 자유게시판 전체 */}
      <div className='free-board-wrapper'>    
        {/* 자유게시판 */}
        <div className='fb-box'>
          {/* 자유게시판 header */}
          <header className='fb-header'>
            {/* 자유게시판 header text box*/}
            <div className='fb-header-box'>

              <div className='fbh-info-box'>
                <div className='icon-box'></div>
                <div className='fbh-text-box'>
                  <h2>주간 Best!</h2>
                  <p>가장 많이 검색한 관심정보입니다.</p>
                </div>
              </div>
              <div className='write-btn-box'>
                <button className='write-btn' onClick={ openWriteBoard }>글쓰기</button>
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
                  <p className='fbh-best-info-text'>서울시 청년수당</p>
                </Link>
              </li>
              <li className='fbh-best-info-list'>
                <Link to={'/'} className='fbh-best-info-text-box'>
                  <p className='fbh-best-info-text'>서울시 청년수당</p>
                </Link>
              </li>
              <li className='fbh-best-info-list'>
                <Link to={'/'} className='fbh-best-info-text-box'>
                  <p className='fbh-best-info-text'>서울시 청년수당</p>
                </Link>
              </li>
              <li className='fbh-best-info-list'>
                <Link to={'/'} className='fbh-best-info-text-box'>
                  <p className='fbh-best-info-text'>서울시 청년수당</p>
                </Link>
              </li>
              
            </ul>
          </header>

          {/* 자유 게시판 */}
          <div className='free-board-main-container'>
            {/* 자유 게시판 box */}
            <div className='fbm-info-box'>
        
              {fbData.map(fb => (
                <ConnectFreeBoardData freeBoardList={fb} openInnerBoard={ openInnerBoard }/>
              ))}

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConnectFreeBoard;
