import React, { useState } from 'react'
import ConnectHeader from './ConnectHeader';
import MenuRouter from '../../route/MenuRouter';

import '../scss/ConnectTemplate.scss';

const ConnectTemplate = () => {

  // 주소 요청
  const API_FREE_BOARD_URL = 'http://localhost/contents/free-board';

  // Json
  const [fbData, setFbData] = useState([]);

  const addData = todoText => {
      
      const newFbData = {
        freeBoardLocation: todoText,
          // freeBoardIdx: 1,
          // freeBoardImg: null,
          // freeBoardCategory: '친목',
          // freeBoardWriteDate: '2023-06-03T14:09:38',
          // freeBoardUpdateDate: '2023-06-03T14:09:38',
          // freeBoardViewCount: 0,
          // freeBoardReplyCount: 0,
          // freeBoardLikeCount: 0,
          // memberIdx: 1
      };

      fetch(API_FREE_BOARD_URL, {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(newFbData)
      })
      .then(res => res.json())
      .then(json => {
          setFbData(json.fbData);
      })
  };


return (
    <div className='ConnectTemplate'>
        <ConnectHeader />
        <MenuRouter />
    </div>
  )
}

export default ConnectTemplate