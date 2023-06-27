import React, { useEffect, useState } from "react";

import '../scss/ConnectFreeBoardWriteModal.scss';
import ConnectWriteBoard from "./ConnectWriteBoard";
import { getLoginUserInfo } from '../../util/login-util';

const ConnectFreeBoardWriteModal = ({ closeCreatePost, selectedHotplace, isEditMode }) => {

    const [isCreateModal, setCreateModal] = useState(true);

    // 초기값 설정
    const [hotplaceImg, setHotplaceImg] = useState('');
    const [hotplaceContent, setHotplaceContent] = useState('');
    const [hotplaceLatitude, setHotplaceLatitude] = useState('');
    const [hotplaceLongitude, setHotplaceLongitude] = useState('');
    const [hotplaceName, setHotplaceName] = useState('');
    const [hotplaceFullAddress, setHotplaceFullAddress] = useState('');
    const [kakaoLocation, setKakaoLocation] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('');
  
    const handleLocationClick = (location) => {
      setSelectedLocation(location);
    };
  
    const districtList = [
      '친목', '봉사활동', '동네정보', '맛집탐방', '잡담', '질문', '놀거리', '취미'
    ];
  
    const districtItems = districtList.map((district) => (
      <li
        key={district}
        className={`cp-header-tag ${selectedLocation === district ? 'selected' : ''}`}
        style={{ backgroundColor: selectedLocation === district ? 'orange' : '' }}
        onClick={() => handleLocationClick(district)}
      >
        <p>{district}</p>
      </li>
    ));
  
    useEffect(() => {
      if (isCreateModal) {
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
  
    const cancelBtn = (e) => {
      const $modal = document.getElementById('CreatePostModal');
      $modal.classList.add('closing');
  
      setTimeout(() => {
        setCreateModal(false);
        closeCreatePost();
      }, 1000);
    };
  
  
  
  
    useEffect(() => {
      if (isEditMode && selectedHotplace) {

        setSelectedLocation(selectedHotplace.location);
        
      }
    });
  
    
    
    const submitHandler = (e) => {
    
      e.preventDefault();

      
      // TODO : 게시글 제목 입력이 없음.
      const requestData = {
        freeBoardTitle: '제목을 입력해야합니다.',
        freeBoardContent: hotplaceContent,
        freeBoardLocation: '강남구',
        freeBoardCategory: selectedLocation
      };



      
      if (isEditMode) requestData.hotplaceIdx = selectedHotplace.hotplaceIdx;
    
    const jsonString = JSON.stringify(requestData);
    const jsonDataBlob = new Blob([jsonString], { type: 'application/json' });
  
    const freeBoardFormData = new FormData();
    freeBoardFormData.append('freeBoard', jsonDataBlob);
    freeBoardFormData.append('freeBoardImg', hotplaceImg);

      if (isEditMode) {
        fetch('http://13.209.61.63/contents/free-board', {
          method: 'PATCH',
          headers: {
            'Authorization' : getLoginUserInfo().token
          },
          credentials: 'include',
          body: freeBoardFormData
        })
          .then((res) => res.json())
          .then((result) => console.log(result));
      } else {
        fetch('http://13.209.61.63/contents/free-board', {
          method: 'POST',
          headers: {
            'Authorization' : getLoginUserInfo().token
          },
          credentials: 'include',
          body: freeBoardFormData
        })
          .then((res) => res.json())
          .then((result) => console.log(result.isWrite));
      }
  
      window.location.reload();
    };


  
  
    return (
      <>
        {isCreateModal && (
          <div className='create-post-wrapper' id='CreatePostModal'>
            <button className='cp-close-btn' onClick={closeModal}>X</button>
  
            <form onSubmit={submitHandler} encType='multipart/form-data'>
              <div className='header-main-footer-box'>
                <header className='cp-header-wrapper'>
                  <div className='cp-header-text-tag-box'>
                    <div className='cp-header-text-box'>
                      <p className='cp-header-text' id='SelectLocation'>지역을 선택해주세요</p>
                    </div>
  
                    <div className='connect-create-post'>
                      <ul className='cp-header-tag-box'>
                        {districtItems}
                      </ul>
                    </div>
                  </div>
                </header>
  
                <div className='cp-main-wrapper'>
                  <div className='cp-main-box'>
                    
                      <ConnectWriteBoard
                        // wbfreeBoardImg={selectedHotplace.freeBoardImg}
                        // wbHotplaceContent={selectedHotplace.hotplaceContent}
                
                        setHotplaceImg = {setHotplaceImg}
                        setHotplaceContent = {setHotplaceContent}
                      />
                  
                  </div>
                </div>
  
                <footer className='cp-footer' id="CpFooter">
                  <div className='cp-footer-text-api-box'>
  
                    <div className='cp-footer-api-box'>
                      <div className='storage-btn-box'>
                        <button className='api-btn' id='Cancel' onClick={cancelBtn}>
                          <p>취소</p>
                        </button>
                        <button type='submit' className='api-btn' id='Storage'>
                          <p>{isEditMode ? '수정하기' : '작성'}</p>
                        </button>
                      </div>
                      
                    </div>
                  </div>
                </footer>
              </div>
            </form>
          </div>
        )}
      </>
    );
  };

export default ConnectFreeBoardWriteModal