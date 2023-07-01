import React, { useEffect, useState, useRef } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import ConnectCreatePost from './ConnectCreatePost';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

import swal from 'sweetalert';

import '../scss/ConnectHotPlace.scss';
import ConnectTotalMap from './ConnectTotalMap';
import { getLoginUserInfo } from '../../util/login-util';
import { API_BASE_URL } from '../../config/host-config';

const ConnectHotPlace = ({ closeCreatePost }) => {

  // 핫플레이스 게시물 렌더링
  const [hpData, setHpData] = useState([]);
  // console.log(hpData);

  const REQUEST_URL = API_BASE_URL + '/contents/hot-place';

  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [searchText, setSearchText] = useState('');

  const containerRef = useRef(null);
  const isFetchingRef = useRef(false);

  useEffect(() => {
    fetchInitialData();
  }, []);


  const fetchInitialData = () => {
    setIsLoading(true);
      fetch(API_BASE_URL + `/contents/hot-place/list/${page}`, {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          'Authorization' : getLoginUserInfo().token
        },
        credentials: 'include'
      })
      .then((res) => res.json())
      .then((result) => {
        // console.log(result.hotplaceList.length);
        if(result.length === 0) {
          return;
        }

        setHpData([...result.hotplaceList]);
        setIsLoading(false);
      });
    };

  
  const fetchData = () => {

    const newPage = page + 1;

    if (isFetchingRef.current) return;
    isFetchingRef.current = true;
    setIsLoading(true);
    fetch(`${REQUEST_URL}/list/${newPage}`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization' : getLoginUserInfo().token
      },
      credentials: 'include'
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log([...result.hotplaceList]);
        if([...result.hotplaceList].length === 0) {
          return; 
        }
        setHpData((prevData) => [...prevData, ...result.hotplaceList]);
        setIsLoading(false);
        setPage(page + 1);
        isFetchingRef.current = false;
      });
  };

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = containerRef.current;
    if (scrollHeight - scrollTop <= clientHeight * 1.3) {
      
      fetchData();
    }
  };

  

  // 행정구역 선택
  const [isOpenSelect, setIsOpenSelect] = useState(false);
  
  const openSelect = () => {
    setIsOpenSelect(true);
  };
  
  const closeSelect = () => {
    const $adsModal = document.getElementById('ADS-Modal');
    $adsModal.classList.add('closing');
    
    setTimeout(() => {
      setIsOpenSelect(false);
      $adsModal.classList.remove('closing');
    }, 1000);
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
    // console.log(hotplaceIdx);
    
    swal({
      title: "경고",
      text: "정말 게시글을 삭제하시겠습니까?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        fetch(REQUEST_URL + `/${hotplaceIdx}`, {
          method: 'DELETE',
          headers: { 
            'content-type': 'application/json',
            'Authorization' : getLoginUserInfo().token
          },
            credentials: 'include', 
        })
          .then(res => {
            if (res.status === 401) {
              swal('알림','회원가입이 필요한 서비스입니다.','warning');
            } else {
              // .then(result => console.log(result));
              swal('알림','게시글이 정상적으로 삭제되었습니다.','success');
              return res.json();
            }
          })
        setTimeout(() => {
          window.location.reload();
          }, 750);
      } else {
        
      }
    });

    
  };


  // 작성창 (글쓰기)
  const [isCreateModal, setIsCreateModal] = useState(false);
  
  const openCreatePost = () => {
      fetch(REQUEST_URL, {
        headers: {
          'Authorization': getLoginUserInfo().token
        }
      })
        .then(res => {
          if (res.status === 401) {
            swal("알림","로그인이 필요한 서비스입니다.", "warning");
            // window.location.href = '/'; // 메인 페이지로 이동
          } else {
            swal({
              title: "알림",
              text: "글쓰기 화면을 불러옵니다. 잠시만 기다려주세요",
              icon: "success",
              // buttons: true,
              // dangerMode: true,
              timer: 1000
            })
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
        'Authorization' : getLoginUserInfo().token
      },
      credentials: 'include'  
    })
      .then(res => {
        if (res.status === 401) {
          window.location.href = '/';
          swal('회원가입이 필요한 서비스입니다.');
        } else {
          return res.json();
        }
      })
      .then(result => {
        const list = [...result.hotplaceList];
        setHpData(list);
      });
  };
  
  const [showMap, setShowMap] = useState(false);
  
  const openChangeMap = () => {

    if (!localStorage.getItem('ACCESS_TOKEN')) {
      swal('알림','로그인한 회원만 이용하실 수 있습니다','warning');
      return;
    }

    setShowMap(!showMap);
  };


  // 검색어 기능 구현
  const handleSearch = () => {
    // console.log(hpData);
    const filtered = hpData.filter((content) =>
      content.hotplaceContent.includes(searchText)
    );
    setHpData(filtered);
    setSearchText('');
  };
  
  const handleInputChange = (e) => {
    setSearchText(e.target.value);
    fetchInitialData();
  };
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };


  
  
  
  

  return (
    <>
      {isCreateModal && (
        <ConnectCreatePost
        closeCreatePost={closeCreatePost}
        selectedHotplace={selectedHotplace}
        isEditMode={isEditMode}
        />
      )}

      

      <div className='hp-wrapper'>
        <div className='hp-info-header'>

          <div className='hp-info-select-box'>

            <div className='select-btn-box'>
              {/* <button className='select-btn' id='ADS' onClick={ openSelect }>
                <p>행정구역 선택</p>
              </button> */}

              <div className='board-map-change-box'>

                <button 
                    className='select-btn' 
                    id='View-Method-Board'
                    onClick={ openChangeMap }
                  ><p>{showMap ? '게시글 보기' : '지도 보기'}</p>
                </button>

              </div>
            </div>


              <div className='search-wrapper'>
              {!showMap && (
                <div className='search-box'>
                  <div className='input-box'>
                    <input 
                      type='text' 
                      id='Input'
                      placeholder='검색어를 입력하세요'
                      value={searchText}
                      onChange={handleInputChange}
                      onKeyPress={handleKeyPress}
                    />
                  </div>
                  <span>
                    <div className='search-btn-box'>
                      <button id='Search-Btn' onClick={handleSearch}><p></p></button>
                    </div>
                  </span>
                </div>
              )}
            </div>  





            <div className='create-post-box'>
              <button 
                className='info-write-btn' 
                onClick={ openCreatePost }>
                  <p>글쓰기</p>
              </button>
            </div>

          </div>

        </div>










        {showMap ? (
        <ConnectTotalMap />
      ) : (
        <div className='hp-info-box'
        onScroll={handleScroll}
            ref={containerRef}
        >
          {hpData.map(hp => (
            console.log(hp),
                        <div className='hp-info' key={hp.hotplaceIdx}>

                          {hp.memberNickname === getLoginUserInfo().usernickname && (
                            
                            <div className='hp-info-modify-delete-box'>
                              <div className='info-modify-box'>
                                <button className='info-modify-btn' onClick={() => modifyHotplace(hp)}></button>
                              </div>
                              <div className='info-delete-box'>
                                <button className='info-delete-btn' onClick={() => deleteHotplace(hp.hotplaceIdx)}></button>
                              </div>
                            </div>

                          )}
                        
                          <div className='hp-info-img-text-box'>
                            <div className='hp-info-img-box'>
                              <div className='info-img'>
                                {/* 이미지 aws s3 저장 */}
                                <img src={hp.hotplaceImg} alt='핫플레이스, 같이 놀러가자!'
                                style={{width:'390px', height:'200px'}}
                                />

                              </div>
                            </div>

                            <div className='hp-text-wrapper'>

                              <div className='hp-writer-wrapper'>
                                <div className='hp-writer-box'>
                                  <p className='hp-writer-text'>{hp.kakaoLocation}</p>
                                </div>
                              </div>

                              <div className='hp-text-box'>
                                <div className='hp-text'>
                                  <p dangerouslySetInnerHTML={{ __html: hp.hotplaceContent }}></p>
                                </div>

                                <div className='hp-writer-date-box'>
                                  <div className='hp-writer-box'>
                                    {/* <p className='hp-writer-text'><FontAwesomeIcon icon={faUser} className="person-icon" />&nbsp;{hp.memberNickname}</p> */}
                                    <img src={hp.memberProfile} alt='유저 프로필 이미지'/> 
                                    
                                    <p className='hp-writer-text'>
                                      {hp.memberNickname}
                                    </p>
                                  </div>
                                  <div className='hp-date-box'>
                                    <p className='hp-date-text'>{hp.hotplaceWriteDate}</p>
                                  </div>
                                </div>

                              </div>


                            </div>
                          </div>
                        </div>
            ))}
            {isLoading && <p>Loading...</p>}


        </div>
      )}




      </div>






    </>
  );
};

export default ConnectHotPlace;
