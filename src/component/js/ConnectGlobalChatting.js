import React from 'react'

import '../scss/ConnectGlobalChatting.scss';

const ConnectGlobalChatting = () => {

    const openGbChatting = e => {
        const $gbChattingBox = document.querySelector('.global-chatting-wrapper');
      
        $gbChattingBox.style.display = $gbChattingBox && $gbChattingBox.style.display !== 'block' ? 'block' : 'none';
    };

  return (
    <>
        <div className='backDrop'></div>

        {/* 글로벌 채팅창 */}
        <div className='global-chatting-wrapper'>


        </div>


        {/* 글로벌 채팅 버튼 */}
        <div className='global-chatting-btn-box'>
            <button className='gbchatting' onClick={ openGbChatting }></button>







        </div>
    </>
  )
}

export default ConnectGlobalChatting