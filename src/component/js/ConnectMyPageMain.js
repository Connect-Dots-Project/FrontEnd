import React, { useState } from 'react'

import ConnectUserSettingLocation from './ConnectUserSettingLocation';
import ConnectUserLike from './ConnectUserLike';
import ConnectUserActivity from './ConnectUserActivity';

import '../scss/ConnectMyPageMain.scss';

const ConnectMyPageMain = () => {

    const [isOpenActivity, setIsOpenActivity] = useState(false);    
    const [isOpenLike, setIsOpenLike] = useState(false);    
    const [isOpenLocation, setIsOpenLocation] = useState(false);    

    const openActivity = e => {
        setIsOpenActivity(true);
        setIsOpenLike(false);
        setIsOpenLocation(false);
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


    return (
        <>
        

        <div id='MyPageMainWrapper'>
            <div className='my-page-wrapper'>

                <div className='my-page-box'>

                    <header className='mp-header'>

                        <div className='mp-user-info-box'>
                            <div className='mp-user-info'>

                                <div className='mp-user-profile-wrapper'>
                                    <div className='mp-user-profile-modify-box'>
                                        <div className='mp-user-profile-box'>
                                            <div className='mp-user-profile'></div>
                                        </div>
                                        <div className='mp-user-modify-profile'>
                                            <p>내 정보 수정</p>
                                        </div>
                                    </div>
                                </div>

                                <div className='mp-user-info-text-menu-box'>

                                    <div className='mp-user-info-text-box'>
                                        <div className='mp-user-info-main-text'>
                                            <p>반갑습니다 []님</p>
                                        </div>
                                        <div className='mp-user-info-comments'>
                                            <p>코멘트코멘트코멘트</p>
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
                                {isOpenLike && <ConnectUserLike />}
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