import React, { useEffect, useState, useRef } from 'react';
import '../scss/ConnectViewPlayList.scss';
import { API_BASE_URL } from '../../config/host-config';
import { getLoginUserInfo } from '../../util/login-util';
import swal from 'sweetalert';

const ConnectViewPlayList = ({ closeList, playListId }) => {
  const [playListItems, setPlayListItem] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(null);
  const audioRef = useRef(null);
  

  useEffect(() => {
    const fetchPlaylistItems = async (playListId) => {
      try {
        
        const response = await fetch(API_BASE_URL + `/contents/music-board/${playListId}`, {
          method: 'GET',
          headers: { 
            'Authorization' : getLoginUserInfo().token
         },credentials: 'include', // 쿠키가 필요하다면 추가하기
        });

        const result = await response.json();
        // console.log(result);
        setPlayListItem(result);
      } catch (error) {
        console.error('플레이리스트 항목을 불러오는 중 오류 발생:', error);
      }
    };

    // const playListIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const fetchData = async () => {
      await fetchPlaylistItems(playListId); 
    };

    fetchData();
  }, []);


  //음악 재생 
  const handlePlayButtonClick = async (index) => {

    const previewUrl = playListItems[index]?.musicBoardPreviewUrl;
  
    if (!previewUrl) {
      swal('알림','지원하지 않는 음악입니다.','warning');
      return;
    }
  if (isPlaying && currentTrackIndex === index) {
    audioRef.current.pause();
    setIsPlaying(false);
    setCurrentTrackIndex(null);
  } else {
    try {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      const audio = new Audio(playListItems[index]?.musicBoardPreviewUrl);
      await audio.play();
      setIsPlaying(true);
      setCurrentTrackIndex(index);
      audioRef.current = audio;
    } catch (error) {
      console.error('재생 중 오류 발생:', error);
      setIsPlaying(false);
      setCurrentTrackIndex(null);
    }
   
  }

};



  return (
    <>
      <div id='ViewPlayListModal'>

        <div className='view-play-list-modal-left'>
          <header className='list-img-box'>
            <div className='list-img'>
              {playListItems.length > 0 && <img className="pl-img" src={playListItems[0].musicBoardTrackImage} alt="앨범 이미지" />}
            </div>
          </header>

          
        </div>


        <div className='view-play-list-modal'>
          <button id='CloseBtn' onClick={closeList} ><p>X</p></button>

          

          <div className='view-play-list-main-wrapper'>
            <div className='view-play-list-main-box'>
              <div className='vpl-main'>
                

                <div className='vpl-main-list-wrapper'>
                  <div className='vpl-main-list-box'>


                    <div className='vpl-main-text-view-box'>
                      <div className='vpl-main-text-box'>
                        <p>{playListItems[0]?.musicBoardTrack} 노래 모음입니다.</p>
                        <p>음악은 30초간 미리듣기 가능합니다.<br></br> (단, 지원하지 않는 음악 서비스도 있습니다.)</p>
                      </div>
                      <div className='vpl-main-view-box'>
                        <div className='view-img'>
                          {/* {playListItems[0]?.musicBoardTrackImage} */}
                        </div>
                        {/* <div className='view-count'><p>{playListItems[0]?.musicBoardViewCount}</p></div>/ */}
                         {/* {playListItems.map((item, index) => (
                          <p key={index}>{item.musicBoardViewCount}</p>
                         ))} */}
                      </div>
                    </div>

                    <div className='empty-box'></div>


                  {Array.from({ length: 50 }, (_, i) => (
                  <button className='vpl-main-list' onClick={() => handlePlayButtonClick(i)} key={i}>
                    <div className='list-info-img-box'>
                      <div className='list-info-img'>
                        <img src={playListItems[i]?.musicBoardTitleImage} alt='Album Cover' className='album-img' />
                      </div>
                    </div>
                    <div className='list-info'>
                      <div className='list-info-title'><p>{playListItems[i]?.musicBoardTitle}</p></div>
                      <div className='list-info-singer'><p>{playListItems[i]?.musicBoardArtist}</p></div>
                      {/* <div className='list-info-previewUrl'><p>{playListItems[i]?.musicBoardPreviewUrl}</p></div> */}
                    </div>
                    <div className='list-play-btn-box'>
                      <button className='list-play-btn'>{isPlaying && currentTrackIndex === i ? (
                        <div id='Stop'></div>
                      ) : (
                        <div id='Play'></div>
                      )}</button>
                    </div>
                  </button>
                ))}


                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <audio ref={audioRef} />
      </>
  );
};


export default ConnectViewPlayList;
