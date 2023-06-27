import React, { useEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

import '../scss/ConnectFreeBoard.scss';
import ConnectFreeBoardData from './ConnectFreeBoardData';
import ConnectCreatePost from './ConnectCreatePost';
import ConnectFreeBoardWriteModal from './ConnectFreeBoardWrtieModal';
import { getLoginUserInfo } from '../../util/login-util';
import { API_BASE_URL } from '../../config/host-config';

const ConnectFreeBoard = ({ closeCreatePost }) => {

  
  const REQUEST_URL = 'http://localhost:8181/contents/hot-place';

  const MyToken = localStorage.getItem('Authorization');
  const [hpData, setHpData] = useState([]);
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


    fetch(API_BASE_URL + `/contents/free-board/list/${page}`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization' : getLoginUserInfo().token
      },
      credentials: 'include'
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result.length);
        if(result.length === 0) {
          return;
        }

        setFbData([...result]);
        setIsLoading(false);
      });
  };

  const fetchData = () => {

    const newPage = page + 1;
    if (isFetchingRef.current) return;
    isFetchingRef.current = true;
    setIsLoading(true);
    fetch(API_BASE_URL + `/contents/free-board/list/${newPage}`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization' : getLoginUserInfo().token
      },
      credentials: 'include'
    })
      .then((res) => res.json())
      .then((result) => {
        console.log([...result]);
        if([...result].length === 0) {
          return; 
        }
        setFbData((prevData) => [...prevData, ...result]);
        setIsLoading(false);
        setPage(page + 1);
        isFetchingRef.current = false;
      });
  };

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = containerRef.current;
    if (scrollHeight - scrollTop <= clientHeight * 1.1) {
      
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


  

  // 글 수정, 선택한 핫플 게시판
  const [selectedHotplace, setSelectedHotplace] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const modifyHotplace = (hp) => {
    // console.log(hp);
    setSelectedHotplace(hp);
    setIsCreateModal(true);
    setIsEditMode(true);
  };


  // 글 삭제
  const deleteHotplace = (hotplaceIdx) => {
    console.log(hotplaceIdx);

    fetch(REQUEST_URL + `/${hotplaceIdx}`, {
      method: 'DELETE',
      headers: { 
        'content-type': 'application/json',
        'Authorization' : MyToken
      },
        credentials: 'include', 
    })
      .then(res => {
        if (res.status === 401) {
          alert('회원가입이 필요한 서비스입니다.');
          window.location.href = '/';
        } else {
          return res.json();
        }
      })
      .then(result => console.log(result));

    window.location.reload();
  };

  // 작성창 (글쓰기)
  const [isCreateModal, setIsCreateModal] = useState(false);
  
  const openCreatePost = () => {
      fetch(REQUEST_URL, {
        headers: {
          'Authorization': MyToken
        }
      })
        .then(res => {
          if (res.status === 401) {
            alert('회원가입이 필요한 서비스입니다.');
            window.location.href = '/'; // 메인 페이지로 이동
          } else {
            setIsCreateModal(true); // 모달 창 열기
          }
        })
  };

  // 좋아요 카운팅
  const [hotplaceLikeCount, setLikeCount] = useState(0);
  const increase = () => { setLikeCount(hotplaceLikeCount + 1 );};

  // 행정구역으로 핫플레이스 게시물 목록 조회하기
  const handleLocationClick = (kakaoLocation) => {
    fetch(REQUEST_URL + `/${kakaoLocation}`, {
      method: 'GET',
      headers: { 
        'content-type' : 'application/json',
        'Authorization' : MyToken
      },
      credentials: 'include'  
    })
      .then(res => {
        if (res.status === 401) {
          alert('회원가입이 필요한 서비스입니다.');
          window.location.href = '/';
        } else {
          return res.json();
        }
      })
      .then(result => {
        const list = [...result.hotplaceList];
        setHpData(list);
      });
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
                  <p className="fbh-best-info-text">삭제 예정</p>
                </Link>
              </li>
              <li className="fbh-best-info-list">
                <Link to={'/'} className="fbh-best-info-text-box">
                  <p className="fbh-best-info-text">삭제 예정</p>
                </Link>
              </li>
              <li className="fbh-best-info-list">
                <Link to={'/'} className="fbh-best-info-text-box">
                  <p className="fbh-best-info-text">삭제 예정</p>
                </Link>
              </li>
              <li className="fbh-best-info-list">
                <Link to={'/'} className="fbh-best-info-text-box">
                  <p className="fbh-best-info-text">삭제 예정</p>
                </Link>
              </li>
              <li className="fbh-best-info-list">
                <Link to={'/'} className="fbh-best-info-text-box">
                  <p className="fbh-best-info-text">삭제 예정</p>
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
