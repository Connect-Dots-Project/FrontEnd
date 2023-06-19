import React, { useEffect, useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import ConnectCreatePost from './ConnectCreatePost';


import '../scss/ConnectHotPlace.scss';
import ConnectTotalMap from './ConnectTotalMap';

const ConnectHotPlace = ({ closeCreatePost }) => {

  // 핫플레이스 게시물 렌더링
  const [hpData, setHpData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8181/contents/hot-place', {
      method: 'GET',
    })
    .then(res => res.json())
    .then(result => {
      const list = [...result.hotplaceList];

      setHpData(list);

    });

  }, []); 

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
  const [isCreateModal, setCreateModal] = useState(false);
  
  const openCreatePost = () => {
    setCreateModal(true);
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
  
  const [showMap, setShowMap] = useState(false);
  
  const openChangeMap = () => {
    setShowMap(!showMap);
  };
  
  
  

  return (
    <>
      {isCreateModal && <ConnectCreatePost closeCreatePost={ closeCreatePost }/>}

      {isOpenSelect && (
        <div className='administration-select-wrapper' id='ADS-Modal'>
          <div id='Header'>
            <h1>구역을 선택해주세요</h1>
            <button id='AdsCloseBtn' onClick={ closeSelect }><p>X</p></button>
          </div>



          <div className='ads-main-box'>
            <div className='ads-main'>
              <ul className='ads-list-box'>

                <li className='ads-list'><p>강남구</p></li>
                <li className='ads-list'><p>강동구</p></li>
                <li className='ads-list'><p>강북구</p></li>
                <li className='ads-list'><p>강서구</p></li>
                <li className='ads-list'><p>관악구</p></li>
                <li className='ads-list'><p>광진구</p></li>
                <li className='ads-list'><p>구로구</p></li>
                <li className='ads-list'><p>금천구</p></li>
                <li className='ads-list'><p>노원구</p></li>
                <li className='ads-list'><p>도봉구</p></li>
                <li className='ads-list'><p>동대문구</p></li>
                <li className='ads-list'><p>동작구</p></li>
                <li className='ads-list'><p>마포구</p></li>
                <li className='ads-list'><p>서대문구</p></li>
                <li className='ads-list'><p>서초구</p></li>
                <li className='ads-list'><p>성동구</p></li>
                <li className='ads-list'><p>성북구</p></li>
                <li className='ads-list'><p>송파구</p></li>
                <li className='ads-list'><p>양천구</p></li>
                <li className='ads-list'><p>영등포구</p></li>
                <li className='ads-list'><p>용산구</p></li>
                <li className='ads-list'><p>은평구</p></li>
                <li className='ads-list'><p>종로구</p></li>
                <li className='ads-list'><p>중구</p></li>
                <li className='ads-list'><p>중랑구</p></li>

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
        <div className='hp-info-box'>
          {hpData.map(hp => (
                        <div className='hp-info'>

                        <div className='hp-info-modify-delete-box'>
                          <div className='info-modify-box'>
                            <button className='info-modify-btn'></button>
                          </div>
                          <div className='info-delete-box'>
                            <button className='info-delete-btn'></button>
                          </div>
                        </div>
                        
                          <div className='hp-info-img-text-box'>
                            <Link to='/' className='hp-info-img-box'>
                              <div className='info-img'>{hp.hotplaceImg}</div>
                            </Link>

                            <div className='hp-text-wrapper'>

                              <div className='hp-text-box'>
                                <div className='hp-text'>
                                  <p>{hp.hotplaceContent}</p>
                                </div>

                                <div className='hp-writer-date-box'>
                                  <div className='hp-writer-box'>
                                    <p className='hp-writer-text'>[작성자]</p>
                                  </div>
                                  <div className='hp-date-box'>
                                    <p className='hp-date-text'>[2023.06.19]</p>
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


        </div>
      )}




      </div>






    </>
  );
};

export default ConnectHotPlace;
