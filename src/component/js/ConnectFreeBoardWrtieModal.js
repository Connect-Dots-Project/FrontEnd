import React, { useEffect, useState } from "react";

import '../scss/ConnectFreeBoardWriteModal.scss';
import { getLoginUserInfo } from '../../util/login-util';

import ConnectWriteFreeBoard from "./ConnectWriteFreeBoard";
import { API_BASE_URL } from "../../config/host-config";
import swal from 'sweetalert';

const ConnectFreeBoardWriteModal = ({ closeCreatePost, selectedHotplace, isEditMode }) => {

    const [isCreateModal, setCreateModal] = useState(true);

    // 초기값 설정
    const [hotplaceImg, setHotplaceImg] = useState('');
    const [hotplaceContent, setHotplaceContent] = useState('');
    
    const [selectedLocation, setSelectedLocation] = useState('');
    const [freeBoardTitle, setFreeBoardTitle] = useState('');
    
    const [inputLocation, setInputLocation] = useState('');
  
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
  

      swal({
        title: "경고",
        text: "정말 창을 닫으시겠습니까? 창을 닫으면 내용이 저장되지 않습니다.",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          setCreateModal(false);
          closeCreatePost();
        } else {
          // swal("이전 화면으로 돌아갑니다.");
        }
      });
    };
  
    const cancelBtn = (e) => {
      swal('알림','차');
      const $modal = document.getElementById('CreatePostModal');
      $modal.classList.add('closing');
  
  
  const openSelect = () => {
    setIsOpenSelect(false);
  };
  
  const closeSelect = () => {
    const $adsModal = document.getElementById('ADS-Modal');
    $adsModal.classList.add('closing');
    
    setTimeout(() => {
      setIsOpenSelect(false);
      $adsModal.classList.remove('closing');
    }, 1000);
  };
  
  // 구역, 카테고리, 제목, 내용
  const checkData = e => {
    const $inputTitle = document.getElementById('InputTitle');
  };
  
  
  return (
    <>
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

        {isCreateModal && (
          <div className='create-post-wrapper' id='CreatePostModal'>

            <button className='cp-close-btn' onClick={closeModal}>X</button>
  
            <form onSubmit={submitHandler} encType='multipart/form-data'>
              <div className='header-main-footer-box'>
                <header className='cp-header-wrapper'>
                  <div className='cp-header-text-tag-box'>
                    <div className='cp-header-text-box'>
                      <p className='cp-header-text' id='SelectLocation'>카테고리를 선택해주세요</p>
                    </div>
  
                    <div className='connect-create-post'>
                      <ul className='cp-header-tag-box'>
                        {districtItems}
                      </ul>
                    </div>
                  </div>
                </header>

                <div className="input-box">
                  <input
                    type='text'
                    value={freeBoardTitle}
                    onChange={(e) => setFreeBoardTitle(e.target.value)}
                    placeholder='제목을 입력하세요'
                    className='cp-title-input'
                    id="InputTitle"
                  />
                </div>



                {/* TODO : 제목 입력 창 끝 */}
  
                <div className='cp-main-wrapper'>
                  <div className='cp-main-box'>
                    
                      <ConnectWriteFreeBoard
                        // wbfreeBoardImg={selectedHotplace.freeBoardImg}
                        // wbHotplaceContent={selectedHotplace.hotplaceContent}
                
                        setHotplaceImg = {setHotplaceImg}
                        setHotplaceContent = {setHotplaceContent}
                        setInputLocation = {setInputLocation}
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
                        <button type='submit' className='api-btn' id='Storage' >
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