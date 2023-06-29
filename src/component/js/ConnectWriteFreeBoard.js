import React, { useState, useRef, useEffect } from 'react';
import CKEditor from 'react-ckeditor-component';
import '../scss/ConnectWriteBoard.scss';
import '../scss/ConnectHotPlace.scss';

const ConnectWriteFreeBoard = ({ setHotplaceContent, setHotplaceImg, setInputLocation }) => {
  const [content, setContent] = useState('');
  const [imgFile, setImgFile] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null); 

  const $fileTag = useRef();

  const handleEditorChange = (event) => {
    const updatedContent = event.editor.getData();
    setContent(updatedContent);
    setHotplaceContent(updatedContent);
  };

  const showHotplaceHandler = (e) => {
    const file = $fileTag.current.files[0];
    setHotplaceImg(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImgFile(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleLocationClick = (inputLocation) => {
    setInputLocation(inputLocation);
    setSelectedLocation(inputLocation); 
  };

  const regions = [
    '강남구', '강동구', '강북구', '강서구', '관악구', '광진구', '구로구', '금천구', '노원구',
    '도봉구', '동대문구', '동작구', '마포구', '서대문구', '서초구', '성동구', '성북구', '송파구',
    '양천구', '영등포구', '용산구', '은평구', '종로구', '중구', '중랑구'
  ];

  return (
    <div>
      <div className='administration-select-wrapper' id='ADS-Modal'>
        <div id='Header'>
          <h1>구역을 선택해주세요</h1>
        </div>
        <div className='ads-main-box'>
          <div className='ads-main'>
            <ul className='ads-list-box'>
              {regions.map((e) => (
                <li
                  className={`ads-list ${selectedLocation === e ? 'selected' : ''}`}
                  onClick={() => handleLocationClick(e)}
                  style={{ color: selectedLocation === e ? 'tomato' : 'initial' }} 
                  key={e}
                >
                  <p>{e}</p> 
                </li> 
              ))}
            </ul>
          </div>
        </div>
      </div>
    
    
    
    <div>
      

      <div className='img-box' onClick={() => $fileTag.current.click()}>
        <img
          src={imgFile ? imgFile : require('../scss/img/ad1.jpg')}
          alt='img'
        />
        <label className='hotplace-img-label' htmlFor='hotplace-img-tag'>
          자유게시판 사진을 공유해주세요 🥳
        </label>
        <input
          type='file'
          id='hotplace-img-tag'
          ref={$fileTag}
          style={{display: 'none'}}
          accept='image/*'
          onChange={showHotplaceHandler}
        />
      </div>

      <CKEditor
        activeClass='p10'
        content={content}
        events={{
          change: handleEditorChange
        }}
      />
    </div>
  </div>
  );
};

export default ConnectWriteFreeBoard;