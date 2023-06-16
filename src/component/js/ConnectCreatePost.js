import React, { useEffect, useState } from 'react';

import '../scss/ConnectCreatePost.scss';
import ConnectWriteBoard from './ConnectWriteBoard';
import Location from './Location';

const ConnectCreatePost = ({ closeCreatePost, closeWriteBoard }) => {
  const [isCreateModal, setCreateModal] = useState(true);
  const [hotplaceImg, setHotplaceImg] = useState('');
  const [hotplaceContent, setHotplaceContent] = useState('');
  const [kakaoMap, setKakaoMap] = useState([]);
  const [hotplaceLatitude, setHotplaceLatitude] = useState('');
  const [hotplaceLongitude, setHotplaceLongitude] = useState('');
  const [hotplaceName, setHotplaceName] = useState('');
  const [hotplaceFullAddress, setHotplaceFullAddress] = useState('');

  const [selectedLocation, setSelectedLocation] = useState('');

  const handleLocationClick = (location) => {
    setSelectedLocation(location);
  };

  const districtList = [
    '강동구', '강북구', '강서구', '관악구', '광진구', '구로구', '금천구',
    '노원구', '도봉구', '동대문구', '동작구', '마포구', '서대문구', '서초구', '성동구',
    '성북구', '송파구', '양천구', '영등포구', '용산구', '은평구', '종로구', '중구', '중랑구'
  ];

  const districtItems = districtList.map((district) => (
    <li
      key={district}
      className={`cp-header-tag ${selectedLocation === district ? 'selected' : ''}`}
      onClick={() => handleLocationClick(district)}
    >
      <p>{district}</p>
    </li>
  ));

  const addKakaoMap = kakaoMap => {
    const selectedKakaoMap = {
      
    }
    console.log(kakaoMap);
  };


  
  
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



  const submitHandler = e => {
    e.preventDefault();

    const requestData = {
      location: selectedLocation,
      hotplaceImg: hotplaceImg,
      hotplaceContent: hotplaceContent,
      memberIdx: 1,
      hotplaceLatitude: hotplaceLatitude,
      hotplaceLongitude: hotplaceContent,
      hotplaceName: hotplaceName,
      hotplaceFullAddress: hotplaceFullAddress,
      kakaoLocation: 'ddd',
    };

    
    fetch('http://localhost:8181/contents/hot-place', {
      method: 'POST',
      headers: {'content-type': 'application/json' },
      body: JSON.stringify(requestData)
    })
    .then (res => res.json())
    .then (result => console.log(result.isWrite));
    // closeModal();
    // redirection('/contents/hot-place');
    window.location.reload(); 
    // TODO: 새로고침 없이 바뀌는 걸로 수정해야 함
  }

  
  return (
    <>
      {isCreateModal && (
        <div className='create-post-wrapper' id='CreatePostModal'>
          <button className='cp-close-btn' onClick={closeModal}>
            X
          </button>
          <div className='header-main-footer-box'>
            <header className='cp-header'>
              <div className='cp-header-text-tag-box'>
                <div className='cp-header-text-box'>
                  <p className='cp-header-text'>지역을 선택해주세요</p>
                </div>

                <div className="connect-create-post">
                  <ul className="cp-header-tag-box">
                    {districtItems}
                  </ul>
                </div>

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
                  <button className='api-btn' id='Cancel' onClick={cancelBtn}>
                    <p>취 소</p>
                  </button>
                  <button className='api-btn' id='Storage' onClick={submitHandler}>
                    <p>저 장</p>
                  </button>
                  <div className='cp-footer-api'>
                    <Location />
                  </div>
                  <div className='storage-btn-box'></div>
                </div>
              </div>
            </footer>
          </div>
        </div>
      )}
    </>
  );
};

export default ConnectCreatePost;