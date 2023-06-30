import React from "react";

import '../scss/ConnectFooter.scss';
import { Link } from "react-router-dom";

const ConnectFooter = () => {

    return (
        <>
            <div id="MainFooterWrapper">

                <div id="CatCrownBox">
                    <div id="CatCrown"></div>
                </div>
                <div id="CatWandBox">
                    <div id="CatWand"></div>
                </div>

                <div className="main-footer-box">

                    <div className="ft-header">
                        <div className="ft-header-notice"><p>공지사항</p></div>
                        <ul className="ft-header-list-box">
                            <li className='ft-header-list'><Link to={'/'} ><p>Home</p></Link></li>
                            <li className='ft-header-list'><Link to={'/contents/hot-place'} ><p>Hot Place</p></Link></li>
                            <li className='ft-header-list'><Link to={'/contents/free-board'} ><p>자유 게시판</p></Link></li>
                            <li className='ft-header-list'><Link to={'/nb-live-chatting'} ><p>실시간 채팅</p></Link></li>
                            <li className='ft-header-list'><Link to={'/nb-playlist'} ><p>플레이 리스트</p></Link></li>
                            <li className='ft-header-list'><Link to={'/contents/cvs/GS25'} ><p>편의점 정보</p></Link></li>
                            <li className='ft-header-list'><Link to={'/nb'} ><p>마이페이지</p></Link></li>
                        </ul>
                    </div>

                    <div className="ft-main-box">
                        <div className="ft-main-top">
                            <ul className="ft-main-menu">
                                <li className="ft-main-list"><p>전체서비스</p></li>
                                <li className="ft-main-list"><p>고객센터</p></li>
                                <li className="ft-main-list"><p>문제신고</p></li>
                                <li className="ft-main-list"><p>개인정보처리방침</p></li>
                            </ul>
                        </div>

                        <div className="ft-main-middle">
                            <div className="ft-main-text-box">
                                <p>본 컨텐츠의 저작권은 제공처 또는 OOO에 있으며, 이를 무단 이용하는 경우 저작권법 등에 따라 법적 책임을 질 수 있습니다.</p>
                            </div>
                        </div>

                        <div className="ft-main-bottom">
                            <div className="ft-main-logo-box">
                                <p className="ft-main-logo">© Connect Corp.</p>
                            </div>
                        </div>

                    </div>

                </div>
            </div>

           
        </>
    )

}

export default ConnectFooter