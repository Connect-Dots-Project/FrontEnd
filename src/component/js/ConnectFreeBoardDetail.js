import React from 'react'

const ConnectFreeBoardDetail = ({ freeBoardDetail }) => {

    const {freeBoardCategory, freeBoardContent, freeBoardIdx, freeBoardImg, freeBoardLikeCount, freeBoardLocation ,
        freeBoardReplyCount, freeBoardTitle, freeBoardUpdateDate, freeBoardViewCount, freeBoardWriteDate, memberIdx
    } = freeBoardDetail;

  return (
    <>
        <div id='Inner-Free-Board-Wrapper'>
  
          <header id='Header'></header>
  
          <div id='Main'>
            <div className='inner-board'> 
              <div className='inner-board-header'>
  
                <div className='ib-img-info-box'>
                  <div className='ib-img-box'>
                    <div className='ib-img'></div>
                    <div id='User-Id'>[유저 아이디]</div>
                  </div>
  
                  <div className='ib-info-box'>
  
                    <div className='ib-info-location-title-box'>
                      <div id='Location'>
                        <p>[지역]</p>
                      </div>
                      <div id='Title'>
                        <p>[게시글 제목]</p>
                      </div>
                    </div>
  
                    <div className='ib-info-category-date-box'>
                      <div id='Category'>
                        <p>[카테고리]</p>
                      </div>
                      <div id='Date'>
                        <p>[2023.06.14]</p>
                      </div>
  
                      <div className='reply-like-box'>
  
                          <div className='reply-box'>
                            <div className='reply-img'></div>
                            <div id='Reply-Count'>100</div>
                          </div>
  
                          <div className='like-box'>
                            <div className='like-img'></div>
                            <div id='Like'>50</div>
                          </div>
  
                      </div>
  
                    </div>
  
                    <div className='ib-info-modify-delete-box'>
                      <div className='info-btn-box'>
                        <button id='Modify-Btn' className='info-btn'><p>수정</p></button>
                      </div>
                      <div className='info-btn-box'>
                        <button id='Delete-Btn' className='info-btn'><p>삭제</p></button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
  
              <div className='ib-user-info-wrapper'>
                <div className='ib-info-box'> 
                  <p>임시 텍스트</p>
                  <p>임시 텍스트</p>
                  <p>임시 텍스트</p>
                  <p>임시 텍스트</p>
                  <p>임시 텍스트</p>
                </div>
              </div> 
  
              <div className='user-reply-wrapper'>
                <div className='user-reply-box'>
  
                  <div className='user-img-reply-register-box'>
  
                    <div className='user-img-box'>
                      <div className='user-img'></div>
                    </div>
  
                    <div className='user-reply-register-box'>
                      <div className='empty-box'></div>
                      <input type='text' className='reply-input'placeholder='댓글을 입력해주세요'/>
                    </div>
  
                    <div className='user-register-box'>
                      <button className='user-register-btn'><p></p></button>
                    </div>
                  </div>
                </div>
              </div>
  
  
  
              <div className='guest-reply-wrapper'>
                <div className='guest-reply-box'>
  
                  <div className='guest-reply-info-box'>
  
                    <div className='guest-profile-box'>
                      <div className='profile-box'>
                        <div className='guest-profile'></div>
                      </div>
                      <p>유저 아이디</p>
                    </div>
  
                    <div className='guest-reply'>
                      <div className='guest-reply-text'>
  
                      </div>
                    </div>
  
                  </div>
  
  
  
  
                  <div className='guest-reply-info-box'>
  
                    <div className='guest-profile-box'>
                      <div className='profile-box'>
                        <div className='guest-profile'></div>
                      </div>
                      <p>유저 아이디</p>
                    </div>
  
                    <div className='guest-reply'>
                      <div className='guest-reply-text'>
  
                      </div>
                    </div>
  
                  </div>
  
  
  
  
  
  
                  <div className='guest-reply-info-box'>
  
                    <div className='guest-profile-box'>
                      <div className='profile-box'>
                        <div className='guest-profile'></div>
                      </div>
                      <p>유저 아이디</p>
                    </div>
  
                    <div className='guest-reply'>
                      <div className='guest-reply-text'>
  
                      </div>
                    </div>
  
                  </div>
  
                </div>
                
              </div>
  
            </div>
  
          </div>
  
        </div>
  
    </>
  )
}

export default ConnectFreeBoardDetail