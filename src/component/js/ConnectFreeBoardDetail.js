import React, { useEffect, useState } from 'react'

const ConnectFreeBoardDetail = ({ freeBoardIdx, closeInnerBoardModal }) => {


  const [fbData, setFbData] = useState({});

  const [replayList, setSeplayList] = useState([]);

  const [memberNickname, setMemberNickname] = useState('');
  const [memberProfile, setMemberProfile] = useState('');
  

  useEffect(() => {

    const url = 'http://localhost:8181/contents/free-board/' + freeBoardIdx;

    fetch(url, {
      method: 'GET'
    })
    .then(res => res.json())
    .then(result => {
      setMemberNickname(result.memberNickname);
      setMemberProfile(result.memberProfile);
      setSeplayList(result.replyList);
      setFbData(result.freeBoardResponseDTO);
      
    });

  }, []);


    const [isCloseInner, setCreateModal] = useState(true);

    useEffect(() => {
        
    }, [isCloseInner]);

    const fbDelete = () => {

      // fetch(url, {
      //   method: 'DELETE'
      // })
      // .then(res => res.json())
      // .then(result => console.log(result))
    };








    
  return (
    <>
        {isCloseInner && (
        <div id='Inner-Free-Board-Wrapper'>
        <div className='inner-close-btn' onClick={ closeInnerBoardModal }>X</div>
  
          <header id='Header'></header>
  
          <div id='Main'>
            <div className='inner-board'> 
              <div className='inner-board-header'>
  
                <div className='ib-img-info-box'>
                  <div className='ib-img-box'>
                    <div className='ib-img'></div>
                    <div id='User-Id'>{memberNickname}</div>
                  </div>
  
                  <div className='ib-info-box'>
  
                    <div className='ib-info-location-title-box'>
                      <div id='Location'>
                        <p>{fbData.freeBoardLocation}</p>
                      </div>
                      <div id='Title'>
                        <p>{fbData.freeBoardTitle}</p>
                      </div>
                    </div>
  
                    <div className='ib-info-category-date-box'>
                      <div id='Category'>
                        <p>{fbData.freeBoardCategory}</p>
                      </div>
                      <div id='Date'>
                        <p>{fbData.freeBoardWriteDate}</p>
                      </div>
  
                      <div className='reply-like-box'>
  
                          <div className='reply-box'>
                            <div className='reply-img'></div>
                            <div id='Reply-Count'>{fbData.freeBoardReplyCount}</div>
                          </div>
  
                          <div className='like-box'>
                            <div className='like-img'></div>
                            <div id='Like'>{fbData.freeBoardLikeCount}</div>
                          </div>
  
                      </div>
  
                    </div>
  
                    <div className='ib-info-modify-delete-box'>
                      <div className='info-btn-box'>
                        <button id='Modify-Btn' className='info-btn'><p>수정</p></button>
                      </div>
                      <div className='info-btn-box'>
                        <button id='Delete-Btn' className='info-btn' onClick={fbDelete}><p>삭제</p></button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
  
              <div className='ib-user-info-wrapper'>
                <div className='ib-info-box'> 
                  <p>{fbData.freeBoardContent}</p>
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
  
                  {replayList.map(reply => (
                          <div className='guest-reply-info-box'>
  
                          <div className='guest-profile-box'>
                            <div className='profile-box'>
                              <div className='guest-profile'></div>
                            </div>
                            <p>{reply.freeBoardReplyMemberDTO.memberNickname}</p>
                          </div>
        
                          <div className='guest-reply'>
                            <div className='guest-reply-text'>
                              {reply.freeBoardReplyContent}
                            </div>
                          </div>
        
                        </div>
                    ))}
  
                </div>
                
              </div>
  
            </div>
  
          </div>
  
        </div>
    )}
    </>
  )
}

export default ConnectFreeBoardDetail