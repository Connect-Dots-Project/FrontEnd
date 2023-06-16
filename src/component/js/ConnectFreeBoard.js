import React, { useState, useEffect } from 'react';

import '../scss/ConnectFreeBoard.scss';
import { Link } from 'react-router-dom';
import ConnectFreeBoardData from './ConnectFreeBoardData';
import ConnectCreatePost from './ConnectCreatePost';

const ConnectFreeBoard = () => {
  
  
  const [fbData, setFbData] = useState([]);

  useEffect(() => {
    // TODO : 조회 완료
    // TODO : 조회된 값을 넘겨줘서 붙여야 함

    fetch('http://localhost:8181/contents/free-board',{
      method: 'GET'
    })
    .then(res => res.json())
    .then(result => {
      setFbData([...result]);
    });

  }, []);
  

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

      {isOpenWriteBoard && <ConnectCreatePost closeWriteBoard={ closeWriteBoard }/>}

      

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
