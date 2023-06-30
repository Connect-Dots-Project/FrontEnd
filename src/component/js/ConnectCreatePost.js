import React, { useEffect, useState } from 'react';
import '../scss/ConnectCreatePost.scss';
import ConnectWriteBoard from './ConnectWriteBoard';
import Location from './Location';
import { API_BASE_URL } from '../../config/host-config';
import swal from 'sweetalert';

const ConnectCreatePost = ({ closeCreatePost, selectedHotplace, isEditMode }) => {

  const REQUEST_URL = API_BASE_URL + '/contents/hot-place';

  const MyToken = localStorage.getItem('Authorization');

  const [isCreateModal, setCreateModal] = useState(true);

  const MAX_CHARACTER_COUNT = 68; // 최대 글자 수

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
    // console.log(location);
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
      className={`ctp-header-tags ${selectedLocation === district ? 'selected' : ''}`}
      style={{ backgroundColor: selectedLocation === district ? 'orange' : '' }}
      onClick={() => handleLocationClick(district)}
    >
      <p>{district}</p>
    </li>
  ));

  useEffect(() => {
    if (isCreateModal) {
      const $modal = document.getElementById('CreatePostModals');
      $modal.classList.add('opening');
    }
  }, [isCreateModal]);

  const closeModal = () => {
    const $modal = document.getElementById('CreatePostModals');
    
    swal({
      title: "경고",
      text: "정말 창을 닫으시겠습니까? 창을 닫으면 내용이 저장되지 않습니다.",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        $modal.classList.add('closing');
        // swal("이용해주셔서 감사합니다.", {
        //   icon: "success",
        // });
        setCreateModal(false);
        closeCreatePost();
      } else {
        // swal("이전 화면으로 돌아갑니다.");
      }
    });
      // setTimeout(() => {
      // }, 1000);
  };

  const cancelBtn = (e) => {
    const $modal = document.getElementById('CreatePostModals');

    swal({
      title: "경고",
      text: "정말 창을 닫으시겠습니까? 창을 닫으면 내용이 저장되지 않습니다.",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        $modal.classList.add('closing');
        // swal("이용해주셔서 감사합니다.", {
        //   icon: "success",
        // });
        setCreateModal(false);
        closeCreatePost();
      } else {
        // swal("이전 화면으로 돌아갑니다.");
      }
    });

      
  };

  useEffect(() => {
    if (isEditMode && selectedHotplace) {
      setSelectedLocation(selectedHotplace.location);
    }
  });

  const submitHandler = () => {

    if (!selectedLocation) {swal("알림", "행정구역(지역)을 선택해주세요.", "warning"); return;}
    if (!hotplaceImg) {swal ("알림", "핫플레이스의 사진(클릭)을 공유해주세요.", "warning"); return;}
    if (!hotplaceContent) {swal ("알림", "핫플레이스의 글을 적어주세요.", "warning"); return;}
    if (!kakaoLocation) {swal ("알림", "지도에서 장소를 선택해주세요.", "warning"); return;}
  
    if (selectedLocation !== kakaoLocation) {
      
      swal({
          title: "알림",
          text: "행정구역과 지도의 장소가 일치하지 않습니다.",
          icon: "warning",
          button: true,
      })

      return;
    }
    
    if (hotplaceContent.length > MAX_CHARACTER_COUNT) {
      swal('알림', "글자 수가 60자를 초과했습니다. 60자 미만으로 작성해주세요.", "warning");
      return;
    }


    const requestData = {
      location: selectedLocation,
      memberIdx: MyToken,
      hotplaceContent,
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
        .then((res) => {
          return res.json();
        })
        .then((result) => {
          // TODO : 수정 완료 or 미완료 그대로
          window.location.reload();
        });

        
    } else {
      fetch(REQUEST_URL, {
        method: 'POST',
        headers: {
          'Authorization': MyToken
        },
        credentials: 'include',
        body: hotplaceFormData,
      })
        .then((res) => {
          return res.json();
        })
        .then((result) => {
          
          if (result.isWrite) {
            swal('알림', "저장되었습니다.", "success");
            // window.location.reload();
            setCreateModal(false);
          } else {
            swal('알림', "저장에 실패했습니다. 사진의 크기를 확인해주세요. (최대 1MB)", "error");
            // window.location.reload();
          }
        })
    }

    
  };

  return (
    <>
      {isCreateModal && (
        <div className='create-post-wrappers' id='CreatePostModals'>
          

            <div className='header-main-footer-boxes'>
              <header className='ctp-header-wrappers'>
                <div className='ctp-header-text-tag-boxes'>
                  <div className='ctp-header-text-boxes'>
                    <p className='ctp-header-text' id='SelectLocation'>지역을 선택해주세요</p>
                  </div>

                  <div className='connect-create-posts'>
                    <ul className='ctp-header-tag-boxes'>
                      {districtItems}
                    </ul>
                  </div>
                </div>
              </header>
              
              <div className='ctp-main-wrappers'>
                <div className='ctp-main-boxes'>
                  <div className='ctp-main'>
                    <ConnectWriteBoard
                      setHotplaceImg={setHotplaceImg}
                      setHotplaceContent={setHotplaceContent}
                      />
                  </div>
                </div>
              </div>

            </div>

            <div className='ctp-footer'>

          <footer className='ctp-footer-wrappers'>
          <button className='ctp-close-btn' onClick={closeModal}>X</button>
            <div className='ctp-footer-text-api-boxes'>
              <div className='ctp-footer-text-boxes'>
                <p>장소를 선택해주세요</p>
              </div>

              <div className='ctp-footer-api'>
                  <Location
                    setHotplaceLatitude={setHotplaceLatitude}
                    setHotplaceLongitude={setHotplaceLongitude}
                    setHotplaceName={setHotplaceName}
                    setHotplaceFullAddress={setHotplaceFullAddress}
                    setKakaoLocation={setKakaoLocation}
                  />
                </div>

                <div className='ctp-footer-api-boxes'>
                  <div className='storage-btn-boxes'>
                    <button className='api-btn' id='Cancel' onClick={cancelBtn}>
                      <p>취소</p>
                    </button>
                    <button type='submit' className='api-btn' id='Storage' onClick={submitHandler}>
                      <p>{isEditMode ? '수정하기' : '작성'}</p>
                    </button>
                  </div>

                
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