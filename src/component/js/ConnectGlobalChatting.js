import React, { useEffect, useState } from 'react'
import ConnectGlobalChattingHeader from './ConnectGlobalChattingHeader';
import ConnectGlobalChattingMain from './ConnectGlobalChattingMain';
import ConnectGlobalChattingFooter from './ConnectGlobalChattingFooter';


import '../scss/ConnectGlobalChatting.scss';

const ConnectGlobalChatting = ({}) => {
 

  const clickGbChatting = e => {
    const $gbChattingBox = document.querySelector('.global-chatting-wrapper');
    const $back = document.querySelector('.backDrop');
    
    if ($gbChattingBox.style.display !== 'block') {
      $gbChattingBox.style.display = 'block';
      $back.style.display = 'block';
    } else {
      $gbChattingBox.style.display = 'none';
      $back.style.display = 'none';
    }
    
    openChatting();
  };    

  const openChatting = e => {
    const $chattingBox = document.querySelector('.global-chatting-wrapper');
    const $back = document.querySelector('.backDrop');

    if ($chattingBox.style.height !== '500px') {
      $chattingBox.style.animation = 'openGlobalChattingModal 1s forwards 1';
    } else {
      $chattingBox.style.animation = 'none';
    }

    if ($chattingBox && $back && $chattingBox.style.display !== 'block') {
      $chattingBox.style.display = 'block';
      $back.style.display = 'block';
    }

    document.addEventListener('mouseup', function(e) {
      const container = document.querySelector('.global-chatting-wrapper');
      const $back = document.querySelector('.backDrop');
      
      
      if (container && !container.contains(e.target)) {
        container.style.animation = 'closeGlobalChattingModal 1s forwards 1';
        // container.style.display = 'none';
        $back.style.display = 'none';
      } else if (container) {
        container.style.display = 'block';
        $back.style.display = 'block';
      }
    });
  };



  return (
    <>
        <div className='backDrop'></div>

            <div className='global-chatting-wrapper'>
              {/* <ConnectGlobalChattingHeader /> */}
              <div className='gcheader-wrapper'>
                <div className='gcheader-img-box'></div>
                <div className='gcheader-accessor-box'>
                  asdfasdfadsfadsf
                  <div className='gcheader-accessor'>
                  </div>
                </div>
              </div>
              {/* <ConnectGlobalChattingMain /> */}
              <div className='gcmain-wrapper'>
                <div className='gcmain-box'>
                </div>
              </div>
              {/* <ConnectGlobalChattingFooter /> */}
            

              {/* footer 채팅창 */}
              <div className='gcfooter-wrapper'>
                      <div className='gcfooter-box'>

                        {/* 채팅창 + 전송 버튼 box */}
                        <div className='input-text-btn-box'>
                          {/* 채팅창 입력 text */}
                          <div className='input-text-box'>
                            <input 
                              type='text'
                              className='input-text'
                            />
                          {/* 채팅창 전송 버튼 */}
                          {/* 채팅창 전송 버튼 box */}
                          </div>
                          <div className='input-btn-box'>
                            {/* 채팅창 전송 버튼 */}
                            <button className='input-btn'></button>
                          </div>
                        </div>
                      </div>
                    </div>



            </div>

        <div className='global-chatting-btn-box'>
            <button className='gbchatting' onClick={ clickGbChatting }></button>
        </div>
    </>
  )
}

export default ConnectGlobalChatting