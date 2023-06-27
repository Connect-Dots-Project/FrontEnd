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
    // setIsOpenViewPlayList(false);
    window.location.href = '/nb-playlist';
  };

  useEffect(() => {
  const fetchPlaylistItems = async () => {
    try {
      const MyToken = localStorage.getItem('Authorization');
      const response = await fetch('http://localhost:8181/contents/music-board', {
        method: 'GET',
        headers: { 
          'Authorization' : MyToken
       },credentials: 'include', // 쿠키가 필요하다면 추가하기
      });
      const result = await response.json();
      
      // 서버에서 가져온 데이터가 배열인지 확인
      if (Array.isArray(result)) {
        setPlaylistItems(result);
      } else {
        console.error('Playlist items data is not an array:', result);
      }
    } catch (error) {
      console.error('Error fetching playlist items:', error);
    }
  };

  fetchPlaylistItems();
}, []);

  
  


  // const renderPlaylistItems = () => {
  //   return playlistItems.map((e) => (
  //     <button className="plb-list" onClick={() => openList(e.musicBoardIdx)}>
  //       <div id="Hidden-Playbtn"></div>
  //       <div className="pl-img-box">
  //         <img className="pl-img" src={e.musicBoardTrackImage} alt="앨범 이미지" />
  //       </div>
  //       <div className="pl-name-box">
  //         <div className="pl-name">
  //           <p>{e.musicBoardTrack}</p>
  //         </div>
  //       </div>
  //     </button>
  //   ));
  // };
  
  

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
                            <h2>인기 추천 곡</h2>
                            <p>내 취향에 맞게 원하는 노래 카테고리를 선택해보세요</p>
                        </div>

                        
                    </div>
                    
                </header>

                {/* playlist container */}
                <div className='plb-container-box'>
                  <div className='plb-container'>
                    <div className='plb-list-wrapper'>





                      {playlistItems.map((e) => (
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
                        </button>))}








                    </div>


                  </div>
              </div>
          </div>
      </div>
    </>
  )
}

export default ConnectPlayList