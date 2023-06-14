import React, { useEffect, useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import ConnectCreatePost from './ConnectCreatePost';


import '../scss/ConnectHotPlace.scss';

const ConnectHotPlace = () => {

  const [isCreateModal, setCreateModal] = useState(false);

  const openCreatePost = () => {
    setCreateModal(true);
  };

  const closeCreatePost = () => {
    setCreateModal(false);
  }

  return (
    <>
      {isCreateModal && <ConnectCreatePost closeCreatePost={ closeCreatePost }/>}


      <div className='administration-select-wrapper'>
        
      </div>

      <div className='hp-wrapper'>
        <div className='hp-info-header'>

          <div>행정구역 선택</div>
          <div>보기방식 선택</div>

          <input /><span><button><p>검색</p></button></span>















          <button className='info-write-btn' onClick={ openCreatePost }>글쓰기</button>


        </div>












        {/* hp-wrapper box */}
        <div className='hp-info-box'>
          {/* 반복 */}
          {/* hot-place 정보 */}
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
      </div>

    </>
  );
};

export default ConnectHotPlace;
