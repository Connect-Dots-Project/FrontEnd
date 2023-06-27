import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { getLoginUserInfo } from '../../util/login-util';

const ConnectFreeBoardDetail = ({ freeBoardIdx, closeInnerBoardModal }) => {


  const [fbData, setFbData] = useState({});

  const [replayList, setSeplayList] = useState([]);

  const [memberNickname, setMemberNickname] = useState('');
  const [memberProfile, setMemberProfile] = useState('');
  const [freeBoardImg, setFreeBoardImg] = useState('');

  const [freeBoardTitle, setFreeBoardTitle] = useState('');
  const [freeBoardContent, setFreeBoardContent] = useState('');
  const [freeBoardCategory, setFreeBoardCategory] = useState('');
  const [freeBoardLocation, setFreeBoardLocation] = useState('');
  const [freeBoardWriteDate, setFreeBoardWriteDate] = useState('');
  const [freeBoardUpdateDate, setFreeBoardUpdateDate] = useState('');
  const [freeBoardViewCount, setFreeBoardViewCount] = useState(null);
  const [freeBoardReplyCount, setFreeBoardReplyCount] = useState(null);
  const [freeBoardLikeCount, setFreeBoardLikeCount] = useState(null);
  const [memberIdx, setMemberIdx] = useState(null);
  const [replyList, setReplyList] = useState([]);
  const [loginUserProfile, setLoginUserProfile] = useState('');

  const [inputReplyContent, setInputReplyContent] = useState('');



  const redirection = useNavigate();



  const fetchData = async() => {

    const url = 'http://localhost:8181/contents/free-board/detail/' + freeBoardIdx;

    try{
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          'Authorization' : getLoginUserInfo().token
        },
        credentials: 'include'
      });

      if(res.status === 403) {
        window.location.reload();
        return;
      }

      const result = await res.json();
  
      setMemberNickname(result.memberNickname);
      setMemberProfile(result.memberProfile);
      setSeplayList(result.replyList);
      setFbData(result.freeBoardResponseDTO);
      setFreeBoardImg(result.freeBoardResponseDTO.freeBoardImg);
      setFreeBoardTitle(result.freeBoardResponseDTO.freeBoardTitle);
      setFreeBoardContent(result.freeBoardResponseDTO.freeBoardContent);
      setFreeBoardCategory(result.freeBoardResponseDTO.freeBoardCategory);
      setFreeBoardLocation(result.freeBoardResponseDTO.freeBoardLocation);
      setFreeBoardWriteDate(result.freeBoardResponseDTO.freeBoardWriteDate);
      setFreeBoardViewCount(result.freeBoardResponseDTO.freeBoardViewCount);
      setFreeBoardReplyCount(result.replyList.length);
      setFreeBoardLikeCount(result.freeBoardResponseDTO.freeBoardLikeCount);
      setMemberIdx(result.freeBoardResponseDTO.memberIdx);
      setReplyList(result.replyList);
      setLoginUserProfile(result.loginMemberProfile);
      
    } catch (error) {
      console.log(error);
    }
    
  }

  useEffect(() => {

    
    
    fetchData();

  }, []);


    const [isCloseInner, setCreateModal] = useState(true);

    useEffect(() => {
        
    }, [isCloseInner]);

    const fbDelete = () => {

      // TODO : 삭제 요청 처리
      console.log(getLoginUserInfo().token);

      const url = 'http://localhost:8181/contents/free-board/' + freeBoardIdx;

      fetch(url, {
        method: 'DELETE',
        headers: {
          'content-type': 'application/json',
          'Authorization' : getLoginUserInfo().token
        },
        credentials: 'include'
      })
      .then(res => res.json())
      .then(result => {
        console.log(result)
        console.log(result.isDelete);

        if(result.isDelete === false){
          alert('본인 글만 삭제할 수 있습니다.');
        } else {
          alert('성공적으로 삭제했습니다.');
          window.location.reload();
        }

      })




    };




    const handleInputReplyContent = (e) => {
      setInputReplyContent(e.target.value);
    }



    
    const writeReply = () => {

      const replyPost = async() => {

        const url = 'http://localhost:8181/contents/free-board/replies';


        const postData = {
          freeBoardReplyContent : inputReplyContent,
          freeBoardIdx : freeBoardIdx
        }
  
        try{
          const res = await fetch(url, {
            method: 'POST',
            headers: {
              'content-type': 'application/json',
              'Authorization' : getLoginUserInfo().token
            },
            credentials: 'include',
            body : JSON.stringify(postData)
          });
  
          if (res.status === 403) {
            window.location.reload();
            return;
          }

          if (res.status === 401) {
            window.location.reload();
            return;
          }
  
          const result = await res.json();

          setInputReplyContent('');
  
        } catch (error) {
          console.log(error);
        }
  
      }

      replyPost();
      fetchData();

    }


    const likeHandler = () => {
      const likePost = async() => {

        const url = 'http://localhost:8181/contents/free-board/like/' + freeBoardIdx;


        try {
          const res = await fetch(url, {
            method: 'POST',
            headers: {
              'content-type': 'application/json',
              'Authorization' : getLoginUserInfo().token
            },
            credentials: 'include'
          });
  
          if (res.status === 403) {
            window.location.reload();
            return;
          }

          if (res.status === 401) {
            window.location.reload();
            return;
          }
  
          const result = await res.json();

          console.log(result);
          alert(result.message + '    '  + result.count);


          setFreeBoardLikeCount(result.count);
          

          console.log(result.message);
          console.log(result.count);

          

  
        } catch (error) {
          console.log(error);
        }
  
      }

      likePost();
    }

    
    






    
  return (
    <>
        {isCloseInner && (
        <div id='Inner-Free-Board-Wrapper'>
        <div className='inner-close-btn' onClick={ closeInnerBoardModal }>X</div>
  
          <header id='Header'>
              {freeBoardImg ? ( 
                <img src={freeBoardImg} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <img src={require('../scss/img/ad1.jpg')} alt='No Image' style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              )}            
          </header>
  
          <div id='Main'>
            <div className='inner-board'> 
              <div className='inner-board-header'>
  
                <div className='ib-img-info-box'>
                  <div className='ib-img-box'>
                    <div className='ib-img' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>

                      {memberProfile ? ( 
                        <img src={memberProfile} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : (
                        <img src={require('../scss/img/ad1.jpg')} alt='No Image' style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      )}

                    </div>
                    <div id='User-Id'>{memberNickname}</div>
                  </div>
  
                  <div className='ib-info-box'>
  
                    <div className='ib-info-location-title-box'>
                      <div id='Location'>
                        <p>{freeBoardLocation}</p>
                      </div>
                      <div id='Title'>
                        <p>{freeBoardTitle}</p>
                      </div>
                    </div>
  
                    <div className='ib-info-category-date-box'>
                      <div id='Category'>
                        <p>{freeBoardCategory}</p>
                      </div>
                      <div id='Date'>
                        <p>{freeBoardWriteDate}</p>
                      </div>
  
                      <div className='reply-like-box'>
  
                          <div className='reply-box'>
                            <div className='reply-img'></div>
                            <div id='Reply-Count'>{freeBoardReplyCount}</div>
                          </div>
  
                          <div className='like-box'>
                            {/* TODO : 좋아요 보내기 */}
                            <div className='like-img' onClick={ likeHandler }></div>
                            <div id='Like'>{freeBoardLikeCount}</div>
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
                  <p dangerouslySetInnerHTML={{ __html: freeBoardContent }}></p>
                </div>
              </div> 
  
              <div className='user-reply-wrapper'>
                <div className='user-reply-box'>
  
                  <div className='user-img-reply-register-box'>
  
                    <div className='user-img-box'>
                      <div className='user-img'>
                        <div className='guest-profile' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>

                          {loginUserProfile ? ( 
                            <img src={ loginUserProfile } style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          ) : (
                            <img src={require('../scss/img/ad1.jpg')} alt='No Image' style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          )}
                        </div>
                      </div>
                    </div>
  
                    <div className='user-reply-register-box'>
                      <div className='empty-box'></div>
                      <input 
                        type='text'
                        className='reply-input'
                        placeholder='댓글을 입력해주세요'
                        value={inputReplyContent}
                        onChange={handleInputReplyContent}
                        onKeyPress={(e) => e.key === 'Enter' && writeReply()}
                      />
                    </div>
  
                    <div className='user-register-box'>
                      <button className='user-register-btn' onClick={ writeReply }><p></p></button>
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
                              <div className='guest-profile' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>

                                  {reply.freeBoardReplyMemberDTO.memberProfile ? ( 
                                    <img src={reply.freeBoardReplyMemberDTO.memberProfile} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                  ) : (
                                    <img src={require('../scss/img/ad1.jpg')} alt='No Image' style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                  )}

                              </div>
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