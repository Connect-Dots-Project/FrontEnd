import React from 'react'

import '../scss/ConnectGlobalChattingFooter.scss';

const ConnectGlobalChattingFooter = () => {
  return (
    <>
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
    </>
  )
}

export default ConnectGlobalChattingFooter