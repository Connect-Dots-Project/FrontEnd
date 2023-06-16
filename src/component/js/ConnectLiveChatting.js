import React, { useState } from 'react';
import '../scss/ConnectLiveChatting.scss';
import ConnectGlobalChattingHeader from './ConnectGlobalChattingHeader';
import ConnectGlobalChattingMain from './ConnectGlobalChattingMain';
import ConnectGlobalChattingFooter from './ConnectGlobalChattingFooter';

const ConnectLiveChatting = () => {
    
    const [isOpenChat, setIsOpenChat] = useState(false);
    
    const openChathandler = e => {
        const $chattingBox = document.querySelector('.global-chatting-wrapper');
        
        if ($chattingBox.style.height !== '500px') {
            $chattingBox.style.animation = 'openGlobalChattingModal 1s forwards 1';
        } else {
            $chattingBox.style.animation = 'none';
        }
        
        if ($chattingBox && $chattingBox.style.display !== 'block') {
            $chattingBox.style.display = 'block';
        }
        setIsOpenChat(true);
        
        setIsOpenChat(false);
        document.addEventListener('mouseup', function(e) {
            const container = document.querySelector('.global-chatting-wrapper');
            
            if (container && !container.contains(e.target)) {
                container.style.animation = 'closeGlobalChattingModal 1s forwards 1';
            } else if (container) {
                container.style.display = 'block';
            }
        });
    };
    
    
    
    return (
    <>
    {isOpenChat && <div className='global-chatting-wrapper'>
              <ConnectGlobalChattingHeader />
              <ConnectGlobalChattingMain />
              <ConnectGlobalChattingFooter />
            </div>}

        <div className='live-chatting-wrapper'>
        <div className='live-chatting-box'>
          <div className='lc-info-tag-box'>
            <div className='lc-info-box'>

              {/* 게시판 1개 */}
              <button className='lc-info-wrapper' onClick={ openChathandler }>
                <div className='info-box'>
                  <div className='lc-info-tag-like-reply-box'>
                    <div className='tag-box'>
                      <div className='tag'>
                        <p>#해시태그</p>
                      </div>
                    </div>
                    <div className='like-box'>
                      <div className='like'></div>
                      <p className='count'>100</p>
                    </div>
                    <div className='reply-box'>
                      <div className='reply'></div>
                      <p className='count'>50</p>
                    </div>
                  </div>
                  <div className='lc-info-text-img-box'>
                    <div className='text-box'>
                      <div className='info-text'>
                        임시 텍스트 임시 텍스트 임시 텍스트 임시 텍스트 임시 텍스트 임시 텍스트 임시 텍스트
                        임시 텍스트 임시 텍스트 임시 텍스트 임시 텍스트 임시 텍스트 임시 텍스트 임시 텍스트
                        임시 텍스트 임시 텍스트 임시 텍스트 임시 텍스트 
                      </div>
                    </div>
                    <div className='img-box'>
                      <div className='info-img'></div>
                    </div>
                  </div>
                </div>
              </button>
            </div>

            <div className='lc-tag-wrapper'>
              <ul className='lc-tag-box'>
                <div className='tag-text'>
                  <p>실시간 인기 해시태그</p>
                </div>
                <div className='ic-tag-list-box'>
                  <li className='ic-tag-list'>
                    <p>#해시태그</p>
                  </li>
                  <li className='ic-tag-list'>
                    <p>#해시태그</p>
                  </li>
                  <li className='ic-tag-list'>
                    <p>#해시태그</p>
                  </li>
                  <li className='ic-tag-list'>
                    <p>#해시태그</p>
                  </li>
                  <li className='ic-tag-list'>
                    <p>#해시태그</p>
                  </li>
                  <li className='ic-tag-list'>
                    <p>#해시태그</p>
                  </li>
                  <li className='ic-tag-list'>
                    <p>#해시태그</p>
                  </li>
                </div>
              </ul>
            </div>
          </div>
        </div>
      </div>


    </>
  );
};

export default ConnectLiveChatting;
