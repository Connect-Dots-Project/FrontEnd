import React, { useState, useRef, useEffect } from 'react';
import CKEditor from 'react-ckeditor-component';
import '../scss/ConnectWriteBoard.scss';

const ConnectWriteBoard = ({ setHotplaceContent, setHotplaceImg }) => {
  const [content, setContent] = useState('');
  const [imgFile, setImgFile] = useState(null);
  const $fileTag = useRef();

  const MAX_CHARACTER_COUNT = 68; // event.editor.getData() 최대 글자 수
  const [currentCharacterCount, setCurrentCharacterCount] = useState(0); // 현재 글자 수

  const handleEditorChange = (event) => {
    const updatedContent = event.editor.getData();
    setContent(updatedContent);
    setHotplaceContent(updatedContent);
    setCurrentCharacterCount(updatedContent.length);

    // console.log(updatedContent.length);

    if (updatedContent.length > MAX_CHARACTER_COUNT) {
      alert('최대 글자수는 60글자입니다!');
      return;
    }
    
  };

 
  const showHotplaceHandler = e => {
    const file = $fileTag.current.files[0];
    setHotplaceImg(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImgFile(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <div className='img-box' onClick={() => $fileTag.current.click()}>
        <img
          src={imgFile ? imgFile : require('../scss/img/ad1.jpg')}
          alt='img'
        />
        <label className='hotplace-img-label' htmlFor='hotplace-img-tag'>
          핫플레이스 사진을 공유해주세요 🥳
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
  );
};

export default ConnectWriteBoard;