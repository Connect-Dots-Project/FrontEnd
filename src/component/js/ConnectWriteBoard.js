import React, { useState, useRef } from 'react';
import CKEditor from 'react-ckeditor-component';
import '../scss/ConnectWriteBoard.scss';

const ConnectWriteBoard = ({ setHotplaceContent }) => {
  const [content, setContent] = useState('');
  const [imgFile, setImgFile] = useState(null);

  const $fileTag = useRef();
  
  const handleEditorChange = (event) => {
    const updatedContent = event.editor.getData();
    setContent(updatedContent);
    setHotplaceContent(updatedContent);
  };

  const showHotplaceHandler = e => {
    const file = $fileTag.current.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgFile(reader.result);
    }
  };

  return (
    <div>
      <div className='img-box' onClick={()=>$fileTag.current.click()}>
        <img 
          src={imgFile ? imgFile : require('../scss/img/ad1.jpg')}
          alt="img"
        />
        <label className='hotplace-img-label' htmlFor='hotplace-img'>사진을 추가해주세요.</label>
        <input 
          id='hotplace-img'
          type='file'
          style={{display: 'none'}}
          accept='image/*'
          ref={$fileTag}
          onChange={showHotplaceHandler}
        />
      </div>
      <CKEditor
        activeClass="editor"
        content={content}
        events={{
          change: handleEditorChange,
        }}
        autoFocus
      />
    </div>
  );
};

export default ConnectWriteBoard;