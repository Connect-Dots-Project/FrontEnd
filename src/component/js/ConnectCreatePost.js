import React, { useEffect, useState } from 'react'

import '../scss/ConnectCreatePost.scss';
import ConnectWriteBoard from './ConnectWriteBoard';

const ConnectCreatePost = ({ closeCreatePost }) => {

    const [isCreateModal, setCreateModal] = useState(true);

    useEffect(() => {
        if(isCreateModal) {
            const $modal = document.getElementById('CreatePostModal');
            $modal.classList.add('opening');
        }
    }, [isCreateModal]);

    const closeModal = () => {
        const $modal = document.getElementById('CreatePostModal');
        $modal.classList.add('closing');

        setTimeout(() => {
            setCreateModal(false);
            closeCreatePost();
        }, 1000);
    };

  return (
    <>
    {isCreateModal && (

    <div className='create-post-wrapper' id='CreatePostModal'>
        <button className='cp-close-btn' onClick={ closeModal }>X</button>
            <div className='header-main-footer-box'>
                
                <header className='cp-header'>
                    <div className='cp-header-text-tag-box'>
                        <div className='cp-header-text-box'>
                            <p className='cp-header-text'>지역을 선택해주세요</p>
                        </div>

                        <ul className='cp-header-tag-box'>
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
    )}
    </>
  )
}

export default ConnectCreatePost