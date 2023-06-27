import React, { useEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

import '../scss/ConnectFreeBoard.scss';
import ConnectFreeBoardData from './ConnectFreeBoardData';
import ConnectCreatePost from './ConnectCreatePost';
import ConnectFreeBoardWriteModal from './ConnectFreeBoardWrtieModal';
import { getLoginUserInfo } from '../../util/login-util';

const ConnectFreeBoard = ({ closeCreatePost }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [fbData, setFbData] = useState([]);

  const containerRef = useRef(null);
  const isFetchingRef = useRef(false);

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = () => {
    setIsLoading(true);


    fetch(`http://13.209.61.63/contents/free-board/${page}`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization' : getLoginUserInfo().token
      },
      credentials: 'include'
    })
      .then((res) => res.json())
      .then((result) => {
        setFbData([...result]);
        setIsLoading(false);
      });
  };

  const fetchData = () => {
    if (isFetchingRef.current) return;
    isFetchingRef.current = true;
    setIsLoading(true);
    fetch(`http://13.209.61.63/contents/free-board/${page}`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization' : getLoginUserInfo().token
      },
      credentials: 'include'
    })
      .then((res) => res.json())
      .then((result) => {
        setFbData((prevData) => [...prevData, ...result]);
        setIsLoading(false);
        isFetchingRef.current = false;
      });
  };

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = containerRef.current;
    if (scrollHeight - scrollTop <= clientHeight * 1.3) {
      setPage(page + 1);
      fetchData();
    }
  };

  const [isOpenWriteBoard, setIsOpenWriteBoard] = useState(false);

  const openWriteBoard = () => {
    setIsOpenWriteBoard(true);
  };

  const closeWriteBoard = () => {
    setIsOpenWriteBoard(false);
  };

  return (
    <>
      {isOpenWriteBoard && <ConnectFreeBoardWriteModal closeCreatePost={closeCreatePost} />}

      <div className="free-board-wrapper">
        <div className="fb-box">
          <header className="fb-header">
            <div className="fb-header-box">
              <div className="fbh-info-box">
                <div className="icon-box"></div>
                <div className="fbh-text-box">
                  <h2>주간 Best!</h2>
                  <p>가장 많이 검색한 관심정보입니다.</p>
                </div>
              </div>
              <div className="write-btn-box">
                <button className="write-btn" onClick={openWriteBoard}>
                  글쓰기
                </button>
              </div>
            </div>
            <ul className="fbh-best-info-box">
              <li className="fbh-best-info-list">
                <Link to={'/'} className="fbh-best-info-text-box">
                  <p className="fbh-best-info-text">서울시 청년수당</p>
                </Link>
              </li>
              <li className="fbh-best-info-list">
                <Link to={'/'} className="fbh-best-info-text-box">
                  <p className="fbh-best-info-text">서울시 청년수당</p>
                </Link>
              </li>
              <li className="fbh-best-info-list">
                <Link to={'/'} className="fbh-best-info-text-box">
                  <p className="fbh-best-info-text">서울시 청년수당</p>
                </Link>
              </li>
              <li className="fbh-best-info-list">
                <Link to={'/'} className="fbh-best-info-text-box">
                  <p className="fbh-best-info-text">서울시 청년수당</p>
                </Link>
              </li>
              <li className="fbh-best-info-list">
                <Link to={'/'} className="fbh-best-info-text-box">
                  <p className="fbh-best-info-text">서울시 청년수당</p>
                </Link>
              </li>
            </ul>
          </header>

          <div
            className="free-board-main-container"
          >
            <div className="fbm-info-box"
            onScroll={handleScroll}
            ref={containerRef}
            >
              {fbData.map((fb) => (
                <ConnectFreeBoardData key={fb.id} freeBoardList={fb} />
              ))}
              {isLoading && <p>Loading...</p>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConnectFreeBoard;
