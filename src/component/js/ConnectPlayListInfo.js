// PlaylistItem.js

import React from 'react';

const ConnectPlayListInfo = ({ item }) => {

    console.log('----555555------'+item);
  const openList = () => {
    // openList 함수 동작 정의
  };

  return (
    <button className="plb-list" onClick={openList}>
      <div id="Hidden-Playbtn"></div>
      <div className="pl-img-box">
        <div className="pl-img" src={item.musicBoardTrackImage} alt="앨범 이미지"></div>
      </div>
      <div className="pl-name-box">
        <div className="pl-name">
          <p>{item.musicBoardTrack}</p>
        </div>
      </div>
    </button>
  );
};

export default ConnectPlayListInfo;
