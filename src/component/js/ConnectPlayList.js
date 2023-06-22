import React, { useEffect } from 'react';

import '../scss/ConnectPlayList.scss';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import ConnectViewPlayList from './ConnectViewPlayList';

const ConnectPlayList = () => {

  const [isOpenViewPlayList, setIsOpenViewPlayList] = useState(false);
  const [playlistItems, setPlaylistItems] = useState([]);
  const [idx, setIdx] = useState('');
  

  const openList = (idx) => {
    setIsOpenViewPlayList(true);
    setIdx(idx);
  };

  const closeList = e => {
    setIsOpenViewPlayList(false);
  };

  useEffect(() => {
    const fetchPlaylistItems = async () => {
      try {
        const response = await fetch('http://localhost:8181/contents/music-board', {
          method: 'GET'
        });
        const result = await response.json();
        console.log('resulttttttt: ', result);
        setPlaylistItems(result);
      } catch (error) {
        console.error('Error fetching playlist items:', error);
      }
    };
  
    fetchPlaylistItems();
  }, []);
  
  


  const renderPlaylistItems = () => {
    return playlistItems.map((e) => (
      <button className="plb-list" onClick={() => openList(e.musicBoardIdx)}>
        <div id="Hidden-Playbtn"></div>
        <div className="pl-img-box">
          <img className="pl-img" src={e.musicBoardTrackImage} alt="앨범 이미지" />
        </div>
        <div className="pl-name-box">
          <div className="pl-name">
            <p>{e.musicBoardTrack}</p>
          </div>
        </div>
      </button>
    ));
  };
  
  

  return (
    <>  
        {isOpenViewPlayList && <ConnectViewPlayList closeList={ closeList } playListId={idx}/>}

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