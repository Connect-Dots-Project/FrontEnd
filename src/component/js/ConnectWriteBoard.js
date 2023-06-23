import React, { useState, useRef, useEffect } from 'react';
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


// console.log('ddddddddddddddddd');
//     console.log(selectedHotplace);
//     console.log(selectedHotplace.hotplaceImg +"11111111111");
//     // console.log(wbHotplaceImg +  ' <<<-------------');
//     // console.log(wbHotplaceContent + ' <<<------------');
    
//     // console.log('-------------------------------');
  
//     // const [content, setContent] = useState('');
//     // const [imgFile, setImgFile] = useState('');
//     // const $fileTag = useRef();
  
  
//     const handleEditorChange = (event) => {
//       // const updatedContent = event.editor.getData();
//     //   setContent(updatedContent);
//     //   console.log(content);
//     //   wbHotplaceContent(updatedContent);
//     //   setImgFile(wbHotplaceImg);
//     };
  
//     const showHotplaceHandler = e => {
//       // const file = $fileTag.current.files[0];
//       // setHotplaceImg(file);
  
//       // const reader = new FileReader();
//       // reader.onloadend = () => {
//       //   setImgFile(reader.result);
//       // };
//       // reader.readAsDataURL(file);
//     };
//     // console.log(setHotplaceImg);
  
//     // const imgPath = '/Users/sumin/Prj/connect_dots/05bff9ac-6ba0-4d68-ae1f-c2df7be7fa8f_food-gb370c1970_640.jpg';
//     //../../../../connect_dots/0b8501af-d6bb-4257-bfca-68ca05f8352a_food-gb370c1970_640.jpg'
//     return (
  
      
//       <div>
//         <div className='img-box' onClick={() => $fileTag.current.click()}>
//           <img
//             src={imgFile ? imgFile : require(selectedHotplace)}
//             // src={require('../../../123test.jpg')}
            
//             // alt='0-999img5412'
//           />
//           <label className='hotplace-img-label' htmlFor='hotplace-img-tag'>
//             핫플레이스 사진을 공유해주세요 🥳
//           </label>
//           <input
//             type='file'
//             id='hotplace-img-tag'
//             // ref={$fileTag}
//             style={{display: 'none'}}
//             accept='image/*'
//             onChange={showHotplaceHandler}
//           />
//         </div>
  
//         <CKEditor
//           activeClass='p10'
//           // content={content ||''}
//           events={{
//             change: handleEditorChange
//           }}
//         />
//       </div>
//     );
//   };;

export default ConnectWriteBoard;