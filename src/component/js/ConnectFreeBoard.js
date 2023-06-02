import React from 'react'

import '../scss/ConnectFreeBoard.scss';
import { Link } from 'react-router-dom';

const ConnectFreeBoard = () => {
  return (
    <>
        {/* 자유게시판 전체 */}
        <div className='free-board-wrapper'>    
            {/* 자유게시판 */}
            <div className='fb-box'>
                {/* 자유게시판 header */}
                <header className='fb-header'>
                    {/* 자유게시판 header text box*/}
                    <div className='fbh-info-box'>
                        <div className='icon-box'></div>
                        <div className='fbh-text-box'>
                            <h2>주간 Best!</h2>
                            <p>가장 많이 검색한 관심정보입니다.</p>
                        </div>
                    </div>
                    {/* 자유게시판 header best menu box */}
                    <ul className='fbh-best-info-box'>
                        <li className='fbh-best-info-list'>
                            <Link to={'/'} className='fbh-best-info-text-box'>
                                <p className='fbh-best-info-text'>서울시 청년수당</p>
                            </Link>
                        </li>
                        <li className='fbh-best-info-list'>
                            <Link to={'/'} className='fbh-best-info-text-box'>
                                <p className='fbh-best-info-text'>대중교통비 지원</p>
                            </Link>
                        </li>
                        <li className='fbh-best-info-list'>
                            <Link to={'/'} className='fbh-best-info-text-box'>
                                <p className='fbh-best-info-text'>서울 영테크</p>
                            </Link>
                        </li>
                        <li className='fbh-best-info-list'>
                            <Link to={'/'} className='fbh-best-info-text-box'>
                                <p className='fbh-best-info-text'>서울청년문화패스</p>
                            </Link>
                        </li>
                        <li className='fbh-best-info-list'>
                            <Link to={'/'} className='fbh-best-info-text-box'>
                                <p className='fbh-best-info-text'>강남구 존맛탱</p>
                            </Link>
                        </li>
                    </ul>
                </header>

                <div className='free-board-main-container'>
                    <ul className='fbm-box'>
                        <div className='fbm-info-list-box'>
                            <li className='fbm-info-list'>
                                <div className='info-list-img'></div>
                            </li>
                        </div>                        
                    </ul>
                </div>



            </div>
        </div>    
    </>
  )
}

export default ConnectFreeBoard