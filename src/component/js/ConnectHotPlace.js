import React, { useEffect, useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import ConnectCreatePost from './ConnectCreatePost';


import '../scss/ConnectHotPlace.scss';

const ConnectHotPlace = () => {

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
                ><p>게시판 보기</p>

                </button>
                <button className='select-btn' id='View-Method-Map'>
                  <p>지도 보기</p>
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











        {/* {!isSelectMap && ( */}
          <div className='hp-info-box'>
            <div className='hp-info'>
              <div className='hp-info-img-text-box'>
                <Link to='/' className='hp-info-img-box'>
                  <div className='info-img'></div>
                </Link>
                <div className='hp-text-box'>
                  <div className='hp-text'>
                    <p>강남강남강남강남강남강남강남강남강남강남강남강남강남강남강남강남강남</p>
                  </div>
                  <div className='like-box'>
                    <button className='like' id='Like'></button>
                    <p className='like-count'>100</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
            {/* )} */}










      </div>

    </>
  );
};

export default ConnectHotPlace;
