// import React from 'react'
import React, { useEffect } from 'react';

import '../scss/ConnectPlayList.scss';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import ConnectViewPlayList from './ConnectViewPlayList';

const ConnectPlayList = () => {

  const [isOpenViewPlayList, setIsOpenViewPlayList] = useState(false);
  const [playlistItems, setPlaylistItems] = useState([]);

  const openList = e => {
    setIsOpenViewPlayList(true);
  };

  const closeList = e => {
    setIsOpenViewPlayList(false);
  };

  useEffect(() => {
    const fetchPlaylistItems = async () => {
      try {
        const response = await fetch('/contents/music-board');
        console.log(response);      
        const data = await response.json();
        setPlaylistItems(data);
      } catch (error) {
        console.error('Error fetching playlist items:', error);
      }
    };

    fetchPlaylistItems();
  }, []);

  const fetchRenderPlaylistItems = async (i) => {
    try {
      const response = await fetch(`/contents/music-board/${i}`);
      console.log(response);
      const data = await response.json();
      setPlaylistItems(data);
    } catch (error) {
      console.error('Error fetching playlist items:', error);
    }
  };

const renderPlaylistItems = () => {
  const playlistItems = [];
  for (let i = 1; i < 11; i++) {
    fetchRenderPlaylistItems(i);
    playlistItems.push(
      <button className="plb-list" onClick={openList}>
        <div id="Hidden-Playbtn"></div>
        <div className="pl-img-box">
          <div className="pl-img" src={playlistItems.musicboardTrackImage} alt="앨범 이미지"></div>
        </div>
        <div className="pl-name-box">
          <div className="pl-name">
          <p>{playlistItems.musicboardTrack}</p>
          </div>
        </div>
      </button>,
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