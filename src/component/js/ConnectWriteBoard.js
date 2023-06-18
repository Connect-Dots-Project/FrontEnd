import React, { useState, useRef } from 'react';
import CKEditor from 'react-ckeditor-component';
import '../scss/ConnectWriteBoard.scss';

const ConnectWriteBoard = ({ setHotplaceContent, setHotplaceImg }) => {
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
          {/* <div className='plus-btn'>+</div> */}
        </label>
        <input
          type='file'
          id='hotplace-img-tag'
          ref={$fileTag}
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