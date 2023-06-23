import React from 'react'

import '../scss/ConnectMyPageMain.scss';
import { Link } from 'react-router-dom';

const ConnectMyPageMain = () => {
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
                                        <Link to={'/'} className='mp-user-activity-wrapper'>
                                            <div className='mp-user-activity-box'>
                                                <div className='mp-user-activity'></div>
                                            </div>
                                            <p>나의 활동</p>
                                        </Link>
                                        <Link to={'/'} className='mp-user-like-wrapper'>
                                            <div className='mp-user-like-box'>
                                                <div className='mp-user-like'></div>
                                            </div>
                                            <p>좋아요</p>
                                        </Link>
                                        <Link to={'/'} className='mp-user-setting-location-wrapper'>
                                            <div className='mp-user-setting-location-box'>
                                                <div className='mp-user-setting-location'></div>
                                            </div>
                                            <p>내 위치 설정</p>
                                        </Link>
                                    </div>

                                </div>

                            </div>
                        </div>

                    </header>


                    <div className='mp-change-menu-wrapper'>
                        <div className='mp-change-menu-box'>
                            <div className='mp-change-menu'>



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