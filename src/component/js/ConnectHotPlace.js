import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';


import '../scss/ConnectHotPlace.scss';
import ConnectWriteBoard from './ConnectWriteBoard';

const ConnectHotPlace = () => {

  const openCreatePost = () => {
    const $postModal = document.querySelector('.create-post-wrapper');
    $postModal.style.display = $postModal.style.display === 'none' ? 'block' : 'none';
    $postModal.style.animation = 'openCreatePostModal 1s forwards 1';
};

const closeCreatePost = e => {
    const $postModal = document.querySelector('.create-post-wrapper');
    if ($postModal && $postModal.style.display === 'block') {
        $postModal.style.animation = 'closeCreatePostModal 1s forwards 1';
    }
};


  return (
    <>
      {/* 모달창 */}
      <div className='create-post-wrapper'>
      <button className='cp-close-btn' onClick={ closeCreatePost }>X</button>
            <div className='header-main-footer-box'>
                
                <header className='cp-header'>
                    <div className='cp-header-text-tag-box'>
                        <div className='cp-header-text-box'>
                            <p className='cp-header-text'>지역을 선택해주세요</p>
                        </div>

                        <ul className='cp-header-tag-box'>
                            <li className='cp-header-tag'><p>강남구</p></li>
                            <li className='cp-header-tag'><p>강남구</p></li>
                            <li className='cp-header-tag'><p>강남구</p></li>
                            <li className='cp-header-tag'><p>강남구</p></li>
                            <li className='cp-header-tag'><p>강남구</p></li>
                            <li className='cp-header-tag'><p>강남구</p></li>
                            <li className='cp-header-tag'><p>강남구</p></li>
                            <li className='cp-header-tag'><p>강남구</p></li>
                            <li className='cp-header-tag'><p>강남구</p></li>
                            <li className='cp-header-tag'><p>강남구</p></li>
                            <li className='cp-header-tag'><p>강남구</p></li>
                            <li className='cp-header-tag'><p>강남구</p></li>
                            <li className='cp-header-tag'><p>강남구</p></li>
                            <li className='cp-header-tag'><p>강남구</p></li>
                            <li className='cp-header-tag'><p>강남구</p></li>
                            <li className='cp-header-tag'><p>강남구</p></li>
                            <li className='cp-header-tag'><p>강남구</p></li>
                            <li className='cp-header-tag'><p>강남구</p></li>
                            <li className='cp-header-tag'><p>강남구</p></li>
                            <li className='cp-header-tag'><p>강남구</p></li>
                            <li className='cp-header-tag'><p>강남구</p></li>
                            <li className='cp-header-tag'><p>강남구</p></li>
                            <li className='cp-header-tag'><p>강남구</p></li>
                            <li className='cp-header-tag'><p>강남구</p></li>
                            <li className='cp-header-tag'><p>강남구</p></li>
                        </ul>
                        
                    </div>

                </header>




                <div className='cp-main-box'>
                  <div className='cp-main'>
                    <ConnectWriteBoard />
                  </div>
                </div>



                <footer className='cp-footer'>
                    <div className='cp-footer-text-api-box'>
                        <div className='cp-footer-text-box'>
                            <p>장소를 선택해주세요</p>
                        </div>
                        <div className='cp-footer-api-box'>
                          <input className='cp-footer-api' />
                          <div className='storage-btn-box'>
                            <button className='api-btn' id='Cancel'>
                              <p>취 소</p>
                            </button>
                            <button className='api-btn' id='Storage'>
                              <p>저 장</p>
                            </button>
                          </div>
                        </div>




                    </div>

                </footer>



            </div>



        </div>








      <div className='hp-wrapper'>
        <div className='hp-info-header'>
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
