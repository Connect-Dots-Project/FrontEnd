import React, { useEffect, useState, useRef } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import ConnectCreatePost from './ConnectCreatePost';


import '../scss/ConnectHotPlace.scss';
import ConnectTotalMap from './ConnectTotalMap';
import { getLoginUserInfo } from '../../util/login-util';
import { API_BASE_URL } from '../../config/host-config';

const ConnectHotPlace = ({ closeCreatePost }) => {


  const regions = [
    '강남구', '강동구', '강북구', '강서구', '관악구', '광진구', '구로구', '금천구', '노원구',
    '도봉구', '동대문구', '동작구', '마포구', '서대문구', '서초구', '성동구', '성북구', '송파구',
    '양천구', '영등포구', '용산구', '은평구', '종로구', '중구', '중랑구'
  ];

  // 핫플레이스 게시물 렌더링
  const [hpData, setHpData] = useState([]);
  // console.log(hpData);

  // 핫플레이스 게시물 누구나 다 볼 수 있게 해야하는데 어떻게해유 ㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠ
  const REQUEST_URL = API_BASE_URL + '/contents/hot-place';

  const MyToken = localStorage.getItem('Authorization');
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

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
        if (Array.isArray(result.hotplaceList)) {
          setHpData([...result.hotplaceList]);
        } else {
          setHpData([]);
        }
        setIsLoading(false);
      });
    };

  const fetchData = () => {
    if (isFetchingRef.current) return;
    isFetchingRef.current = true;
    setIsLoading(true);
    fetch(API_BASE_URL + `/contents/hot-place/list/${page}`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((result) => {
        setHpData((prevData) => [...prevData, ...result]);
        setIsLoading(false);
        isFetchingRef.current = false;
      });
  };

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = containerRef.current;
    if (scrollHeight - scrollTop < clientHeight) {
      setPage(page + 1);
      fetchData();
    }
  };

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
        if (Array.isArray(result.hotplaceList)) {
          const list = [...result.hotplaceList];
          setHpData(list);
        } else {
          setHpData([]);
        }
      });
  };



  // 좋아요 카운팅
  const [hotplaceLikeCount, setLikeCount] = useState(0);
  const increase = () => { setLikeCount(hotplaceLikeCount + 1 );};
  // const increase = (hotplaceId) => {
  //   setLikeCount((prevState) => ({
  //     ...prevState,
  //     [hotplaceId]: (prevState[hotplaceId] || 0) + 1,
  //   }));
  // };

  
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

  // 글 수정, 선택한 핫플 게시판
  const [selectedHotplace, setSelectedHotplace] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const modifyHotplace = (hp) => {
    // console.log(hp);
    setSelectedHotplace(hp);
    setIsCreateModal(true);
    setIsEditMode(true);
  };

  // const modifyHotplace = (hotplaceIdx) => {
  //   fetch(REQUEST_URL + `/${hotplaceIdx}`, {
  //     method: 'PATCH'
  //   })
  //     .then(res => res.json())
  //     .then(result => console.log(result));

  // }
  



  
  
  
 
  
  
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
  
  const [showMap, setShowMap] = useState(false);
  
  const openChangeMap = () => {
    setShowMap(!showMap);
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

      {isOpenSelect && (
        <div className='administration-select-wrapper' id='ADS-Modal'>
          <div id='Header'>
            <h1>구역을 선택해주세요</h1>
            <button id='AdsCloseBtn' onClick={ closeSelect }><p>X</p></button>
          </div>



          <div className='ads-main-box'>
            <div className='ads-main'>
              <ul className='ads-list-box'>
                {regions.map(e => ( 
                  <li className='ads-list' onClick={() => handleLocationClick(e)}> 
                    <p>{e}</p> 
                  </li> 
                ))}
              </ul>
            </div>
          </div>



        </div>
      )}

      <div className='hp-wrapper'>
        <div className='hp-info-header'>

          <div className='hp-info-select-box'>

            <div className='select-btn-box'>
              <button className='select-btn' id='ADS' onClick={ openSelect }>
                <p>행정구역 선택</p>
              </button>

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
                    <input type='text' id='Input'/>
                  </div>
                  <span>
                    <div className='search-btn-box'>
                      <button id='Search-Btn'><p></p></button>
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
                        <div className='hp-info' key={hp.hotplaceIdx}>

                        <div className='hp-info-modify-delete-box'>
                          <div className='info-modify-box'>
                            <button className='info-modify-btn' onClick={() => modifyHotplace(hp)}></button>
                          </div>
                          <div className='info-delete-box'>
                            <button className='info-delete-btn' onClick={() => deleteHotplace(hp.hotplaceIdx)}></button>
                          </div>
                        </div>
                        
                          <div className='hp-info-img-text-box'>
                            <Link to='/' className='hp-info-img-box'>
                              <div className='info-img'>
                                {/* 이미지 aws s3 저장 */}
                                <img src={hp.hotplaceImg} alt='핫플레이스, 같이 놀러가자!' />

                              </div>
                            </Link>

                            <div className='hp-text-wrapper'>

                              <div className='hp-text-box'>
                                <div className='hp-text'>
                                  <p dangerouslySetInnerHTML={{ __html: hp.hotplaceContent }}></p>
                                </div>

                                <div className='hp-writer-date-box'>
                                  {/* TODO : 행정구역 추가했어용 ㅠㅠ  */}
                                  <div className='hp-writer-box'>
                                    <p className='hp-writer-text'>[{hp.kakaoLocation}]</p>
                                  </div>
                                  <div className='hp-writer-box'>
                                    <p className='hp-writer-text'>[작성자]</p>
                                  </div>
                                  <div className='hp-date-box'>
                                    <p className='hp-date-text'>[{hp.hotplaceWriteDate}]</p>
                                  </div>
                                </div>
                              </div>

                              <div className='like-box'>
                                <button className='like' id='Like'></button>
                                <p className='like-count' onClick={ increase }>{hp.hotplaceLikeCount}</p>
                                {/* <p className='like-count' onClick={() => increase(hp.hotplaceId)}>
                                    {hotplaceLikeCount[hp.hotplaceId] || 0}</p> */}
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
