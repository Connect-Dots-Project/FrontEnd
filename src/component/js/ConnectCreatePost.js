import React, { useEffect, useState } from 'react';
import '../scss/ConnectCreatePost.scss';
import ConnectWriteBoard from './ConnectWriteBoard';
import Location from './Location';

const ConnectCreatePost = ({ closeCreatePost, selectedHotplace, isEditMode }) => {

  const REQUEST_URL = 'http://localhost:8181/contents/hot-place';

  const MyToken = localStorage.getItem('Authorization');

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
    '강남구', '강동구', '강북구', '강서구', '관악구', '광진구', '구로구', '금천구',
    '노원구', '도봉구', '동대문구', '동작구', '마포구', '서대문구', '서초구', '성동구',
    '성북구', '송파구', '양천구', '영등포구', '용산구', '은평구', '종로구', '중구', '중랑구'
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

  
   

    if (!selectedLocation) {alert ('행정구역을 선택해주세요.'); return;}
    if (!hotplaceImg) {alert ('핫플레이스의 사진을 공유해주세요.'); return;}
    if (!hotplaceContent) {alert ('핫플레이스의 글을 공유해주세요.'); return;}
    if (!kakaoLocation) {alert ('지도에서 장소를 선택해주세요.'); return;}
  
    if (selectedLocation !== kakaoLocation) {
      alert('행정구역과 지도의 장소가 일치하지 않습니다.');
      return;
    }


    const requestData = {
      location: selectedLocation,
      hotplaceContent,
      memberIdx: 1,
      hotplaceLatitude,
      hotplaceLongitude,
      hotplaceName,
      hotplaceFullAddress,
      kakaoLocation,
    };

    if (isEditMode) requestData.hotplaceIdx = selectedHotplace.hotplaceIdx;

    const jsonString = JSON.stringify(requestData);
    const jsonDataBlob = new Blob([jsonString], { type: 'application/json' });

    const hotplaceFormData = new FormData();
    hotplaceFormData.append('hotplace', jsonDataBlob);
    hotplaceFormData.append('hotplaceImg', hotplaceImg);

    if (isEditMode) {
      fetch(REQUEST_URL, {
        method: 'PATCH',
        headers: {
          'Authorization': MyToken
        },
        credentials: 'include',
        body: hotplaceFormData,
      })
        .then((res) => res.json())
        .then((result) => console.log(result));

        
    } else {
      fetch(REQUEST_URL, {
        method: 'POST',
        headers: {
          'Authorization': MyToken
        },
        credentials: 'include',
        body: hotplaceFormData,
      })
        .then((res) => res.json())
        .then((result) => {
          if (result.isWrite) {
            alert('저장되었습니다.');
          } else {
            alert('저장에 실패했습니다.');
          }
        })
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
              <header className='cp-header'>
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

              <div className='cp-main-box'>
                <div className='cp-main'>
                  <ConnectWriteBoard
                    setHotplaceImg={setHotplaceImg}
                    setHotplaceContent={setHotplaceContent}
                  />
                </div>
              </div>

              <footer className='cp-footer-wrapper'>
                <div className='cp-footer-text-api-box'>
                  <div className='cp-footer-text-box'>
                    <p>장소를 선택해주세요</p>
                  </div>

                  <div className='cp-footer-api-box'>
                    <div className='storage-btn-box'>
                      <button className='api-btn' id='Cancel' onClick={cancelBtn}>
                        <p>취소</p>
                      </button>
                      <button type='submit' className='api-btn' id='Storage'>
                        <p>{isEditMode ? '수정하기' : '작성'}</p>
                      </button>
                    </div>

                    <div className='cp-footer-api'>
                      <Location
                        setHotplaceLatitude={setHotplaceLatitude}
                        setHotplaceLongitude={setHotplaceLongitude}
                        setHotplaceName={setHotplaceName}
                        setHotplaceFullAddress={setHotplaceFullAddress}
                        setKakaoLocation={setKakaoLocation}
                      />
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

export default ConnectCreatePost;