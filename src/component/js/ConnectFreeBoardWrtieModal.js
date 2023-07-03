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
  
    
    
  const submitHandler = (e) => {
    
    e.preventDefault();

    if (!inputLocation) {swal ("알림", "행정구역을 선택해주세요.", "warning"); return;}
    if (!selectedLocation) {swal ("알림", "카테고리를 선택해주세요.", "warning"); return;}
    if (!freeBoardTitle) {swal("알림", "제목을 입력해주세요.", "warning"); return;}
    if (!hotplaceImg) {swal ("알림", "자유게시판의 사진을 공유해주세요.", "warning"); return;}
    if (!hotplaceContent) {swal ("알림", "자유게시판의 글을 입력해주세요.", "warning"); return;}

      const requestData = {
        freeBoardTitle: freeBoardTitle,
        freeBoardContent: hotplaceContent,
        freeBoardLocation: inputLocation,
        freeBoardCategory: selectedLocation
      };

      if (isEditMode) requestData.hotplaceIdx = selectedHotplace.hotplaceIdx;
    
    const jsonString = JSON.stringify(requestData);
    const jsonDataBlob = new Blob([jsonString], { type: 'application/json' });
  
    const freeBoardFormData = new FormData();
    freeBoardFormData.append('freeBoard', jsonDataBlob);
    freeBoardFormData.append('freeBoardImg', hotplaceImg);

      if (isEditMode) {
        fetch(API_BASE_URL + '/contents/free-board', {
          method: 'PATCH',
          headers: {
            'Authorization' : getLoginUserInfo().token
          },
          credentials: 'include',
          body: freeBoardFormData
        })
          .then((res) => res.json())
          .then((result) => {});
      } else {
        fetch(API_BASE_URL + '/contents/free-board', {
          method: 'POST',
          headers: {
            'Authorization' : getLoginUserInfo().token
          },
          credentials: 'include',
          body: freeBoardFormData
        })
          .then((res) => res.json())
          .then((result) => {

            // console.log(result);

            if (result !== null ) {
              swal('알림', "저장되었습니다.", "success");
              setCreateModal(false);
              setTimeout(() => {
                window.location.reload();
                }, 750);
            } else {
              swal('알림', "저장에 실패하였습니다.", "error");
              setTimeout(() => {
                window.location.reload();
                }, 750);
            }
            
            if (result.status == 500) {
              swal('알림', "저장에 실패했습니다. 사진의 크기를 확인해주세요. (최대 1MB)", "error");
              // window.location.reload();
            }


          });
      }
  
      // window.location.reload();
    };

    const regions = [
      '강남구', '강동구', '강북구', '강서구', '관악구', '광진구', '구로구', '금천구', '노원구',
      '도봉구', '동대문구', '동작구', '마포구', '서대문구', '서초구', '성동구', '성북구', '송파구',
      '양천구', '영등포구', '용산구', '은평구', '종로구', '중구', '중랑구'
    ];

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
  
            {/* <form onSubmit={submitHandler} encType='multipart/form-data'> */}
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
                        <button type='submit' className='api-btn' id='Storage' onClick={submitHandler} >
                          <p>{isEditMode ? '수정하기' : '작성'}</p>
                        </button>
                      </div>
                      
                    </div>
                  </div>
                </footer>
              </div>
            {/* </form> */}
          </div>
        )}
      </>
    );
  };

export default ConnectFreeBoardWriteModal