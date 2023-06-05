import React from 'react'

import '../scss/ConnectPlayList.scss';
import { Link } from 'react-router-dom';

const ConnectPlayList = () => {

  return (
    <>
        {/* playlist */}
        <div className='playlist-board-wrapper'>
            <div className='plb-box'>
                {/* playlist header */}
                <header className='plb-header'> 

                    {/* 메인text + 검색창 box */}
                    <div className='plb-header-text-search-box'>
                        <div className='plb-logo'></div> 
                        <div className='plb-text-box'>
                            <h2>나의 플리 자랑하기</h2>
                            <p>가장 인기있는 플리입니다.</p>
                        </div>

                        {/* 검색창 */}
                        <div className='plb-search-box'>
                            <div className='plb-search'>
                                <div className='search-logo'></div>
                                <input className='search-text' placeholder='검색어를 입력해주세요'></input>
                                <button className='search-btn'></button>
                            </div>
                        </div>
                    </div>

                    {/* header menu box */}
                    <div className='plb-header-menu-box'>
                        <ul className='plb-info-box'>
                            <li className='plb-info-list'>
                                <Link to={'/'} className='plb-info-text-box'>
                                    <p className='plb-info-text'>별명 - 방 제목</p>
                                </Link>
                            </li>
                            <li className='plb-info-list'>
                                <Link to={'/'} className='plb-info-text-box'>
                                    <p className='plb-info-text'>별명 - 방 제목</p>
                                </Link>
                            </li>
                            <li className='plb-info-list'>
                                <Link to={'/'} className='plb-info-text-box'>
                                    <p className='plb-info-text'>별명 - 방 제목</p>
                                </Link>
                            </li>
                            <li className='plb-info-list'>
                                <Link to={'/'} className='plb-info-text-box'>
                                    <p className='plb-info-text'>별명 - 방 제목</p>
                                </Link>
                            </li>
                            <li className='plb-info-list'>
                                <Link to={'/'} className='plb-info-text-box'>
                                    <p className='plb-info-text'>별명 - 방 제목</p>
                                </Link>
                            </li>
                        </ul>   
                    </div>
                </header>

                {/* playlist container */}
                <div className='plb-container-box'>
                    <div className='plb-container'>

                        {/* 반복 */}
                        {/* playlist box */}
                        <div className='plb-playlist-box'>
                            {/* playlist img */}
                            <div className='plb-img-box'>
                                <div className='plb-img'></div>
                            </div>

                            {/* playlist info */}
                            <div className='playlist-info-box'>
                                <div className='playlist-info-title-btn-playing-box'>
                                    <div className='playlist-info-title'>게시판 제목</div>
                                    <div className='playlist-btn-playing-box'>
                                        <button className='playlist-playBtn'></button>
                                        <div className='playlist-info-playing-music'>현재 재생곡 정보</div>
                                    </div>
                                </div>
                                {/* 좋아요 + 댓글 + 즐겨찾기 */}
                                <div className='pl-like-reply-bookmark-box'>
                                    <div className='like-box'>
                                        <button className='pl-btn' id='Like'></button>
                                    </div>
                                    <div className='pl-reply-bookmark-box'>
                                        <div className='reply-box'>
                                            <button className='pl-btn' id='Reply'></button>
                                        </div>
                                        <div className='bookmark-box'>
                                            <button className='pl-btn' id='Bookmark'></button>
                                        </div>
                                    </div>
                                </div>
                            </div>







                        </div>










                    </div>
                </div>





            </div>








        </div>
    </>
  )
}

export default ConnectPlayList