import React, { useState, useEffect, useRef } from 'react';
import { redirect, useNavigate } from "react-router-dom";

import ConnectUserSettingLocation from './ConnectUserSettingLocation';
import ConnectUserLike from './ConnectUserLike';
import ConnectUserActivity from './ConnectUserActivity';

import { API_BASE_URL } from '../../config/host-config';
import '../scss/ConnectMyPageMain.scss';
import { async } from 'q';
import { getLoginUserInfo } from '../../util/login-util';
import ConnectUserActivityFreeBoardLike from './ConnectUserActivityFreeBoardLike';

const ConnectMyPageMain = () => {

    const navigate = useNavigate();
    const [isOpenActivity, setIsOpenActivity] = useState(false);    
    const [isOpenLike, setIsOpenLike] = useState(false);    

    const [isOpenLocation, setIsOpenLocation] = useState(false);    
    const [isOpenModify, setIsOpenModify] = useState(false);    

    const [imgFile, setImgFile] = useState(null);
    const $fileTag = useRef();


    const [memberAccount, setMemberAccount] = useState('');
    const [memberBirth, setMemberBirth] = useState('');
    const [memberComment, setMemberComment] = useState('');
    const [memberGender, setMemberGender] = useState('');
    const [memberNickname, setMemberNickname] = useState('');
    const [memberProfile, setMemberProfile] = useState('');

    const [hotplaceList, setHotplaceList] = useState([]);

    const [inputNickname, setInputNickname] = useState([]);
    const [inputComment, setInputComment] = useState([]);

      
      const updateMemberNickname = (value) => {
        setInputNickname(value);
      };
      
      const updateMemberComment = (value) => {
        setInputComment(value);
      };

    


    useEffect(() => {

        // TODO fetch 보내서 회원정보 가져오기
        fetch(API_BASE_URL + `/member/mypage`, {
            method: 'GET',
            headers: {
              'content-type': 'application/json',
              'Authorization' : getLoginUserInfo().token
            },
            credentials: 'include'
          })
            .then((res) => {

                if(res.status === 401) {
                    alert('로그인한 회원만 이용하실 수 있습니다');
                    handleAlertConfirm();
                    return;
                }

                return res.json();

            })
            .then((result) => {

                console.log(result);
                setMemberAccount(result.memberAccount);
                setMemberBirth(result.memberBirth);
                setMemberComment(result.memberComment);
                setMemberGender(result.membeGender);
                setMemberNickname(result.memberNickname);
                setMemberProfile(result.memberProfile);
            });


    },[]);

    const handleAlertConfirm = () => {
        // "/" 경로로 리다이렉트합니다.
        if(window.location.href !== '/') {
          navigate('/');
          // setLoginModalVisible(true);
        }
      };


    // 이미지파일을 선택했을 때 썸네일 뿌리는 핸들러
    const showThumbnailHandler = e => {
      // 첨부된 파일 정보
      const file = $fileTag.current.files[0];

      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = () => {
        setImgFile(reader.result);
      }

    };

    const [memberValue, setMemberValue] = useState({
        inputMemberNickname: inputNickname,
        inputMemberComment: inputComment

    });

    const fetchProfilePost = async () => {
        
        
        const profileFormData = new FormData();

        // TODO : 수정 요청

        // console.log(inputNickname);

        // const memberJsonBlob = new Blob([JSON.stringify({
        //     inputMemberNickname: inputNickname,
        //     inputMemberComment: inputComment
        // })], {type: 'application/json'});


        // console.log(inputComment);
        
        // console.log(memberJsonBlob);


        // profileFormData.append('memberInfo', memberJsonBlob)
        profileFormData.append('profileImage', $fileTag.current.files[0]);

        const res = await fetch(API_BASE_URL + '/member/mypage/profile', {
            method: 'POST',
            headers: {
                'Authorization' : getLoginUserInfo().token
            },
            credentials: 'include',
            body: profileFormData,
        });

        // TODO : 이미지 등록되면 이동할 곳
        window.location.reload();

    };




    const profilePostHandler = e => {
        fetchProfilePost();
    };

    const fetchMemberInfo = async () => {

        const requestBody = {
            inputMemberNickname: inputNickname,
            inputMemberComment: inputComment
          };

          
        const res = await fetch (API_BASE_URL + '/member/mypage/modify', {
            method: 'PATCH',
            headers: {
                'Authorization' : getLoginUserInfo().token,
                'content-type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(requestBody)

        });
        
    }

    const submitHandler = e => {
        fetchMemberInfo();
    };


    





    const openActivity = e => {
        setIsOpenActivity(true);
        setIsOpenLike(false);
        setIsOpenLocation(false);
        getHotPlace();
    };
    
    const openLike = e => {
        setIsOpenLike(true);
        setIsOpenActivity(false);
        setIsOpenLocation(false);
    };
    
    const openLocation = e => {
        setIsOpenLocation(true);
        setIsOpenActivity(false);
        setIsOpenLike(false);
    };


    const openModify = e => {
        setIsOpenModify(true);
    };
    
    const closeModify = e => {
        setIsOpenModify(false);
    };

















    const getHotPlace = () => {


        // TODO : 핫플레이스 최초 접속

        fetch(API_BASE_URL + `/member/mypage/myactive/hotplace`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization' : getLoginUserInfo().token
            },
            credentials: 'include'
        }) 
        .then(res => res.json())
        .then(response => {
            setHotplaceList([...response]);
        })


    };  

























    return (
        <>

        {isOpenModify && (

            <div id='UserInfoModifyModal'>
                <div className='user-info-modify-modal-box'>

                    <div className='uim-header-wrapper'>
                        <div className='uim-title-box'>
                           
                            {/* <img src={imgFile? imgFile : memberProfile}/> */}
                            <h2>내 정보 수정</h2>
                        </div>
                    </div>

                    <div className='uim-main-wrapper'>
                        <div className='uim-main-box'>

                            <div className='uim-profile-box'>
                                <div className='uim-profile-img-text-wrapper'>
                                    <div className='uim-profile-img-text-box'>
                                        <div className='img-text-box'>
                                            <div className='uim-profile-img-box'>
                                                <div className='uim-profile-img'>


                                                    <div className="thumbnail-box" onClick={() => $fileTag.current.click()}>
                                                        <img
                                                        src={imgFile? imgFile : memberProfile}
                                                        style={{width:'137px', height:'137px', borderRadius: '50%', objectFit: 'cover',}}
                                                        alt="profile"
                                                        />
                                                    </div>
                                                    <label className='signup-img-label' htmlFor='profile-img'></label>
                                                    <input
                                                        id='profile-img'
                                                        type='file'
                                                        style={{display: 'none'}}
                                                        accept='image/*'
                                                        ref={$fileTag}
                                                        onChange={showThumbnailHandler}
                                                    />

                                                </div>
                                            </div>
                                            <div className='uim-profile-text-box'>
                                                
                                                <button className='profile-modify-btn' onClick={() => $fileTag.current.click()}>
                                                    <p>사진 변경</p>
                                                </button>
                                                <button onClick={ profilePostHandler }>
                                                    <p>사진 수정 완료</p>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='uim-info-wrapper'>
                                <div className='uim-info-box'>
                                    <div className='uim-info-list-box'>
                                        <div className='uim-info-list'>
                                            <div className='list-key' id='Email'>
                                                <p>아이디</p>
                                            </div>    
                                            <div className='list-value'>
                                                <p>{memberAccount}</p>
                                            </div>
                                        </div>
                                        <div className='uim-info-list'>
                                            <div className='list-key' id='NickName'>
                                                <p>별명</p>
                                            </div>    
                                            <div className='list-value'>
                                                {/* <p>{memberNickname}</p> */}
                                                <input
                                                type="text"
                                                placeholder={memberNickname}
                                                value={inputNickname}
                                                onChange={(e) => updateMemberNickname(e.target.value)}
                                                />
                                            </div> 
                                        </div>
                                        <div className='uim-info-list'>
                                            <div className='list-key' id='Gender'>
                                                <p>성별</p>
                                            </div>    
                                            <div className='list-value'>
                                                {memberGender === 'M' ? <p>남</p> : <p>여</p>}
                                            </div>
                                        </div>
                                        <div className='uim-info-list'>
                                            <div className='list-key' id='Birth'>
                                                <p>생년월일</p>
                                            </div>    
                                            <div className='list-value'>
                                                <p>{memberBirth}</p>
                                            </div>
                                        </div>
                                       
                                        <div className='uim-info-list'>
                                            <div className='list-key' id='Comment'>
                                                <p>나의 한줄</p>
                                            </div>    
                                            <div className='list-value'>
                                                <input
                                                type="text"
                                                placeholder={memberComment}
                                                value={inputComment}
                                                onChange={(e) => updateMemberComment(e.target.value)}
                                                />
                                            </div>
                                        </div>

                                       

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='uim-footer-wrapper'>
                        <div className='uim-footer-box'>
                            <div className='uim-btn-box'>
                                <button className='uim-btn' id='Cancel' onClick={ closeModify }>
                                    <p>취 소</p>
                                </button>
                                <button className='uim-btn' id='Save' onClick={ submitHandler }>
                                    <p>확 인</p>
                                </button>
                            </div>
                        </div>
                    </div>                
                </div>
            </div>
        )}






        {/* TODO  */}


        <div id='MyPageMainWrapper'>
            <div className='my-page-wrapper'>

                <div className='my-page-box'>

                    <header className='mp-header'>

                        <div className='mp-user-info-box'>
                            <div className='mp-user-info'>

                                <div className='mp-user-profile-wrapper'>
                                    <div className='mp-user-profile-modify-box'>
                                        <div className='mp-user-profile-box'>
                                            <div className='mp-user-profile'>
                                                        <img
                                                        src={memberProfile}
                                                        style={{width:'137px', height:'137px', borderRadius: '50%', objectFit: 'cover',}}
                                                        alt="profile"
                                                        />
                                            </div>
                                        </div>
                                        <div className='mp-user-modify-profile'>
                                            <div className='mp-user-modify-info-btn-box'>
                                                <button className='mp-user-modify-info-btn' onClick={ openModify }>
                                                    <p>내 정보 수정</p>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className='mp-user-info-text-menu-box'>

                                    <div className='mp-user-info-text-box'>
                                        <div className='mp-user-info-main-text'>
                                            <p>반갑습니다. {memberNickname} 님</p>
                                        </div>
                                        <div className='mp-user-info-comments'>
                                            <p>{memberComment}</p>
                                        </div>
                                    </div>

                                    <div className='mp-user-info-menu-box'>
                                        <button 
                                            className='mp-user-activity-wrapper'
                                            onClick={ openActivity }
                                        >
                                            <div className='mp-user-activity-box'>
                                                <div className='mp-user-activity'></div>
                                            </div>
                                            <p>나의 활동</p>
                                        </button>
                                        <button 
                                            className='mp-user-like-wrapper'
                                            onClick={ openLike }
                                        >
                                            <div className='mp-user-like-box'>
                                                <div className='mp-user-like'></div>
                                            </div>
                                            <p>좋아요</p>
                                        </button>
                                        <button 
                                            className='mp-user-setting-location-wrapper'
                                            onClick={ openLocation }
                                        >
                                            <div className='mp-user-setting-location-box'>
                                                <div className='mp-user-setting-location'></div>
                                            </div>
                                            <p>내 위치 설정</p>
                                        </button>
                                    </div>

                                </div>

                            </div>
                        </div>

                    </header>


                    <div className='mp-change-menu-wrapper'>
                        <div className='mp-change-menu-box'>
                            <div className='mp-change-menu'>
                                {isOpenActivity && <ConnectUserActivity />}
                                {/* {isOpenLike && <ConnectUserLike />} */}
                                {isOpenLike && <ConnectUserActivityFreeBoardLike />}
                                {isOpenLocation && <ConnectUserSettingLocation />}
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
        
        </>
    )
};  

export default ConnectMyPageMain