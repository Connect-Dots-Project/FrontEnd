import React from 'react'

import '../scss/ConnectPlayList.scss';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import ConnectViewPlayList from './ConnectViewPlayList';

const ConnectPlayList = () => {

  const [isOpenViewPlayList, setIsOpenViewPlayList] = useState(false);

  const openList = e => {
    setIsOpenViewPlayList(true);
  };

  const closeList = e => {
    setIsOpenViewPlayList(false);
  };







    const renderPlaylistItems = () => {
        const playlistItems = [];
        for (let i = 0; i < 24; i++) {
          playlistItems.push(
            <button className='plb-list' onClick={ openList }>
              <div id='Hidden-Playbtn'></div>
              <div className='pl-img-box'>
                <div className='pl-img'></div>
              </div>
              <div className='pl-name-box'>
                <div className='pl-name'>
                  <p>플레이 리스트 이름</p>
                </div>
              </div>
            </button>
          );
        }
        return playlistItems;
      };

  return (
    <>  
        {isOpenViewPlayList && <ConnectViewPlayList closeList={ closeList }/>}

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

                        
                    </div>
                    
                </header>

                {/* playlist container */}
                <div className='plb-container-box'>
                    <div className='plb-container'>

                        <div className='plb-list-wrapper'>
                            {renderPlaylistItems()}
                        </div>

                    </div>
                </div>





            </div>








        </div>
    </>
  )
}

export default ConnectPlayList