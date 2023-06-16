import React, { useEffect, useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import ConnectCreatePost from './ConnectCreatePost';


import '../scss/ConnectHotPlace.scss';
import ConnectTotalMap from './ConnectTotalMap';

const ConnectHotPlace = () => {

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
  
  const closeCreatePost = () => {
    setCreateModal(false);
  }
  
  
  
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
            <ul className='ads-main'>

            </ul>
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
                          <div className='hp-info-img-text-box'>
                            <Link to='/' className='hp-info-img-box'>
                              <div className='info-img'>{hp.hotplaceImg}</div>
                            </Link>
                            <div className='hp-text-box'>
                              <div className='hp-text'>
                                <p>{hp.hotplaceContent}</p>
                              </div>
                              <div className='like-box'>
                                <button className='like' id='Like'></button>
                                <p className='like-count' onClick={ increase }>{hotplaceLikeCount}</p>
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
