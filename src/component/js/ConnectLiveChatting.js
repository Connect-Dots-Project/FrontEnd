import React, { useState, useEffect, useCallback, useRef } from 'react';
import {useParams, useNavigate } from "react-router-dom";
import '../scss/ConnectLiveChatting.scss';

import '../scss/ConnectGlobalChattingFooter.scss';
import '../scss/ConnectGlobalChattingHeader.scss';
import '../scss/ConnectGlobalChattingMain.scss';
import '../scss/ConnectGlobalChatting.scss';

import ConnectGlobalChatting from './ConnectGlobalChatting';
import axios from 'axios';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { getLoginUserInfo } from '../../util/login-util';

import { setWebSocket, getWebSocket } from './ConnectWebSocket';
import { API_BASE_URL } from '../../config/host-config';
import swal from 'sweetalert';
import { faL } from '@fortawesome/free-solid-svg-icons';

// 함수 -> 태그 -> useEffect

const ConnectLiveChatting = (props) => {
  const [roomId, setRoomId] = useState(''); // 방 번호
  const [sender, setSender] = useState(''); // 보내는 사람
  const [message, setMessage] = useState(''); // 메시지
  const [messages, setMessages] = useState([]);
  const [roomList, setRoomList] = useState([]); // 채팅방 목록

  const [senderProfile, setSenderProfile] = useState('');
  const [isSender, setIsSender] = useState(false);


  const [inputHashtag, setInputHashtag] = useState('');
  const [inputContent, setInputContent] = useState('');

  const navigate = useNavigate();



  // 입력한 content 값
  const inputContentHandler = (e) => {
    const { value } = e.target;
    setInputContent(value);
  }

  // 입력한 hashtag 값
  const inputHashtagHandler = (e) => {
    const { value } = e.target;
    setInputHashtag(value);
  }







  let sock = null;
  let ws = useRef(null);


  useEffect(() => {
    findAll();
  },[]);


  const handleAlertConfirm = () => {
    // "/" 경로로 리다이렉트합니다.
    if(window.location.href !== '/') {
      navigate('/');
      // setLoginModalVisible(true);
    }
  };


  // 채팅방 목록을 불러오는 함수
  const findAll = () => {
    fetch(API_BASE_URL + `/contents/chat`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization' : getLoginUserInfo().token
    },
      credentials: 'include' // 쿠키가 필요하다면 추가하기
    })
      .then((res) => {
        if(res.status === 401) {
          swal('알림','로그인한 회원만 이용하실 수 있습니다','warning');
          handleAlertConfirm();
          return;
        }
        return res.json();
      })
      .then((result) => {
        if(!result) {
          return;
        }
        const findList = [...result.livechatList];
        setRoomList(findList);
      });

  }

  // 최초 알림 여부를 저장하는 변수
let isFirstNotification = true;

// 알림을 보여주는 함수
function showNotification(recv) {
  // 알림이 최초로 뜨는 경우에만 실행
  if (isFirstNotification && recv.type !== 'ENTER') {
    // 알림을 보여주는 코드 작성
    // 예시: 웹 브라우저 알림 API 사용
    Notification.requestPermission().then(function(permission) {
      if (permission === 'granted') {
        new Notification(recv.sender, { body: recv.message });
      }
    });

    // 최초 알림이 뜬 후 변수 값을 변경하여 다음에 알림이 뜨지 않도록 함
    isFirstNotification = false;
  }
}


  // 웹소켓을 연결합니다.
  const connect = () => {

    sock = new SockJS(API_BASE_URL + '/contents/chat/live');
    ws.current = Stomp.over(sock);
  
    // 아래 주소로 연결합니다.
    ws.current.connect(
      {},
      (frame) => {
        ws.current.subscribe('/topic/chat/room/' + roomId, (message) => {
          const recv = JSON.parse(message.body);
          if(recv.sender === ''){
            return;
          }
          recvMessage(recv);
        });
        ws.current.send(
          '/app/chat/message',
          {
            Authorization: getLoginUserInfo().token,
            Cookie: document.cookie
          },
          JSON.stringify({ type: 'ENTER', roomId, sender })
        );
        // TODO : error 처리 해야 함. (연결 실패 시)
      }
    );

  };





  //  TODO : 주석------------------------------------------------------------
  
  
  // 방 번호가 바뀔때마다 소켓 연결을 다시 해줍니다.
  useEffect(() => {
    // 웹 소켓 연결 함수
    connect();
    
    
    
    return () => {const connect = () => {
      sock = new SockJS(API_BASE_URL + '/contents/chat/live');
      ws.current = Stomp.over(sock);
      
      // 아래 주소로 연결합니다.
      ws.current.connect(
        {},
        (frame) => {
          ws.current.subscribe('/topic/chat/room/' + roomId, (message) => {
            const recv = JSON.parse(message.body);
            recvMessage(recv);
          });
          ws.current.send(
            '/app/chat/message',
            {},
            JSON.stringify({ type: 'ENTER', roomId, sender })
            );
            // TODO : error 처리 해야 함. (연결 실패 시)
          }
          );
        };
        
        ws.current.disconnect();
        
      };
      
    }, [roomId]);
    
    //  TODO : 주석------------------------------------------------------------

    
    
    
    
    
    
    // 메세지를 보내는 함수
    const sendMessage = () => {
      
    // TODO : 스크롤 맨 밑으로 내리는 기능 추가

    if(!ws.current) {
      alert('npe');
      return;
    }    

    ws.current.send(
      '/app/chat/message',
      {},
      JSON.stringify({ 
        type: 'TALK',
        roomId,
        sender,
        message
      })
    );

    setMessage('');
  };

  








  // 스프링에서 리턴하는 메시지를 받아서 셋팅하는 함수
  // 메시지를 처리하는 함수
const recvMessage = (recv) => {

  fetch(API_BASE_URL + '/contents/chat/check-sender', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'Authorization' : getLoginUserInfo().token
    },
    credentials: 'include',
    body: JSON.stringify({ messageSender: recv.sender })
  })
  .then((res) => res.json())
  .then((result) => {
    setIsSender(result.isSender);
    setSenderProfile(result.senderProfile);

    setMessages((prevMessages) => [
      ...prevMessages,
      {
        type: recv.type,
        sender: recv.type === 'ENTER' ? '알림' : recv.sender,
        message: recv.message,
        senderProfile: result.senderProfile,
        checkSender: result.isSender,
        time: new Date().toLocaleTimeString(),
      },
    ]);


    // 알림 보여주기
    showNotification(recv);
  });

};






















  // TODO

  const handleClick = (idx) => {

    setMessages([]);

    localStorage.setItem('content',idx);






    setRoomId(idx);
    setSender(getLoginUserInfo().usernickname);








    // TODO : 기존의 채팅창에서 다른 방으로 클릭할 때
    // 연결은 되지만 창이 안 열림.
    // open 로직을 수정해야 함
    openChathandler();
  }





  // 채팅 방을 생성하는 함수
  const createLiveChat = () => {

    fetch(API_BASE_URL + '/contents/chat',{
      method: 'POST',
      headers: { 
        'content-type': 'application/json',
        'Authorization' : getLoginUserInfo().token
    },
    credentials: 'include', // 쿠키가 필요하다면 추가하기
      body: JSON.stringify({
          content: inputContent,
          hashTag: inputHashtag,
      })
    })



    .then(res => {

      if (res.status === 401) {
        swal('알림','토큰 없음','warning');
        return
      } else if (res.status === 500) {
        swal('알림','토큰 없음','warning');
        return
      }
      
      swal('알림', '글이 정상적으로 등록되었습니다.', 'success');
      setIsOpenWriteChat(false);

    })

  }








    const [isOpenChat, setIsOpenChat] = useState(false);

    const openChathandler = e => {
        setIsOpenChat(!isOpenChat);
    };
    

    const chatlistWrapperRef = useRef(null);

  useEffect(() => {
    const chatlistWrapperElement = chatlistWrapperRef.current;
    if (chatlistWrapperElement) {
      chatlistWrapperElement.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (chatlistWrapperElement) {
        chatlistWrapperElement.removeEventListener('scroll', handleScroll);
      }
    };
  }, [chatlistWrapperRef.current]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleScroll = () => {
    const chatlistWrapperElement = chatlistWrapperRef.current;
    if (
      chatlistWrapperElement &&
      chatlistWrapperElement.scrollTop + chatlistWrapperElement.clientHeight === chatlistWrapperElement.scrollHeight
    ) {
      // 스크롤이 맨 아래에 도달한 경우에만 새로운 메시지가 도착했다고 가정
      // 새로운 메시지가 도착했을 때 다시 스크롤을 맨 아래로 이동
      scrollToBottom();
    }
  };

  const scrollToBottom = () => {
    const chatlistWrapperElement = chatlistWrapperRef.current;
    if (chatlistWrapperElement) {
      chatlistWrapperElement.scrollTop = chatlistWrapperElement.scrollHeight;
    }
  };

  const [isOpenWriteChat, setIsOpenWriteChat] = useState(false);
  
  const openWriteChat = () => {
      setIsOpenWriteChat(true);
  };

  const closeWriteChat = e => {
    
    swal({
      title: "경고",
      text: "정말 창을 닫으시겠습니까? 창을 닫으면 내용이 저장되지 않습니다.",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        setIsOpenWriteChat(false);
      } else {
        setIsOpenWriteChat(true);
      }
    });





    
  };
  
    
    const closeChattingRoom = e => {

      swal({
        title: "경고",
        text: "정말 창을 닫으시겠습니까? 창을 닫으면 내용이 저장되지 않습니다.",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          // swal("이용해주셔서 감사합니다.", {
          //   icon: "success",
          // });
          setIsOpenChat(false);
        } else {
          // swal("이전 화면으로 돌아갑니다.");
        }
      });
    }









    return (
    <>
    {isOpenWriteChat && (

      <div id='WriteChatModal'>
      <div className='write-chat-modal-box'>

        <div className='wc-header'>
          <div className='wc-tag-box'>
            <button id='ClickTag'>
              <p>#</p>
            </button>

              <input 
                className='wc-tag' 
                id='Input-Tag'
                placeholder='태그를 적어주세요'
                // value={inputHashtag}
                // onChange={inputHashtagHandler}
              />

          </div>
        </div>

        <div className='wc-main'>
          <div className='wc-content-box'>
            <textarea 
              className='wc-content' 
              placeholder='내용을 입력해주세요 (최대 150자)'
              wrap='hard'
              value={inputContent}
              onChange={inputContentHandler}
            />
          </div>
        </div>

        <div className='wc-footer'>
          <div className='wc-btn-box'>

            <div className='wc-btn-box'>
              <button 
                id='Cancel' 
                className='wc-btn' 
                onClick={ closeWriteChat }
              >
                <p>취 소</p>    
              </button>
            </div>
            <div className='wc-btn-box'>
              <button id='Register' className='wc-btn' onClick={ createLiveChat }><p>등 록</p></button>
            </div>

          </div>
        </div>


      </div>
    </div>
    )}








    {isOpenChat && 
      (
        <div className='test1234'>
      <div className='lcheader-wrapper'>
      <div className='lcheader-img-box'>
        <div className='lcheader-img'></div>
        <div className='lcheader-nickname'><p>{getLoginUserInfo().usernickname}</p></div>
      </div>
      <div className='lcheader-accessor-box'>
        <div className='close-btn-box'>
          <button id='closeBtn' onClick={ closeChattingRoom }></button>
        </div>
        <div className='lcheader-accessor'>'{localStorage.getItem('content')}' 님의 구역 #해시태그</div>



      </div>
    </div>



      {/* main */}
      <div className='lcmain-wrapper'>
        <div className='lcmain-box'>
            
            
            
            
            <div className='lcmain-chatlist-wrapper' ref={chatlistWrapperRef}>

              {/* <div className='lcmain-chatlist-header'>이곳이 채팅창</div> */}
              {/* <div className='lcmain-chatlist-header'></div> */}
              


              {messages.map((message, index) => (
                <div key={index}>
                  {message.type === 'ENTER' ? (
                    <div className="list-group-item" >
                        <li className='list-group'>
                          <p>[</p>
                          <div className='message' id='Sender'>{message.sender}</div>
                          <p>]</p>
                          <div className='message' id='Message'>{message.message}</div>
                        </li>
                    </div>
                  ) : message.type === 'TALK' && message.checkSender === true ? (

                    <div className='user-message-left-wrapper' id='Left'>
                      <div className='user-message-left-box'>

                        <div className='uml-img-nickname-box'>
                          <div className='uml-img-box'>
                            <div className='uml-img'>
                              <img src={message.senderProfile} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                              </div>
                          </div>
                          <div className='uml-nickname-box'>
                            <p className='uml-nickname'>{message.sender}</p>
                          </div>
                        </div>

                        <div className='uml-message-time-box'>
                          <div className='uml-message-box'>
                            <div className='uml-message' style={{ wordBreak: 'break-all' }}>
                            {message.message}
                              <div className='uml-time-box'>
                                <div className='uml-time'  style={{ whiteSpace: 'nowrap' }}>
                                  {message.time}
                                  </div>
                              </div>
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>

                        
                  ) : message.type === 'TALK' && message.checkSender === false ? (


                    <div className='user-message-right-wrapper' id='Right'>
                    <div className='user-message-right-box'>
    
                      <div className='umr-message-time-box'>
                        <div className='umr-message-box'>
                          <div className='umr-message' style={{ wordBreak: 'break-all' }}>
                          {message.message}
                            <div className='umr-time-box'>
                              <div className='umr-time' style={{ whiteSpace: 'nowrap' }}>
                                {message.time}
                                </div>
                            </div>
                          </div>
                        </div>
                      </div>
    
                      <div className='umr-img-nickname-box'>
                        <div className='umr-img-box'>
                          <div className='umr-img'>
                          <img src={message.senderProfile} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                        </div>
                        <div className='umr-nickname-box'>
                          <p className='umr-nickname'>{message.sender}</p>
                        </div>
                      </div>
    
                    </div>
                  </div>
    


                  ) : null }

                </div>
              ))} 

              

              {/* <div className='lcmain-chatlist-box'>

                <div className='lcmain-chatlist-profile-box'>
                  <div className='lcmain-chatlist-profile'>프로필</div>
                </div>

              </div> */}
              
            </div> 





        </div>
      </div>

      {/* footer  */}

      {/* footer 채팅창 */}
      <div className='lcfooter-wrapper'>
        <div className='lcfooter-box'>

          {/* 채팅창 + 전송 버튼 box */}
          <div className='input-text-btn-box'>
            {/* 채팅창 입력 text */}
            <div className='input-text-box'>
              <input 
                type='text'
                className='input-text'
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    sendMessage();
                  }
                }}
              />
            {/* 채팅창 전송 버튼 */}
            {/* 채팅창 전송 버튼 box */}
            </div>
            <div className='input-btn-box'>
              {/* 채팅창 전송 버튼 */}
              <button className='input-btn' onClick={sendMessage}>보내기</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
    }






        <div className='live-chatting-wrapper'>
        <div className='live-chatting-box'>
          <div className='lc-info-tag-box'>
            <div className='lc-info-box'>


              <div className='info-header-box'>
                <div className='info-header'>
                  
                  <div className='info-img-box'>
                    <div className='info-img'></div>
                  </div>

                  <div className='info-text-box'>
                    <div className='info-main-text-box'>
                      <p>Let's Talk Together!</p>
                    </div>
                    <div className='info-sub-text-box'>
                      <p>실시간 채팅으로 자유롭게 소통해보세요</p>
                    </div>
                  </div>

                  <div className='write-btn-box'>
                    <button 
                      id='Write-Btn' 
                      onClick={ openWriteChat }
                    >
                     <p>글쓰기</p>
                    </button>
                  </div>

                </div>
              </div>

              {roomList.map(room => (
                <button className='lc-info-wrapper'
                  data-value={room.memberNickname}
                  onClick={(e) => handleClick(e.currentTarget.getAttribute('data-value'))}
                >
                  <div className='info-box'>
                    <div className='lc-info-tag-like-reply-box'>
                      <div className='tag-box'>
                        <div className='tag'>
                          <p>{room.hashtag} + {room.memberNickname}</p>
                        </div>
                      </div>
                    </div>
                    <div className='lc-info-text-img-box'>
                      <div className='text-box'>
                        <div className='info-text'>
                          {room.content}
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              ))}

            </div>

            {/* <div className='lc-tag-wrapper'>
              <ul className='lc-tag-box'>
                <div className='tag-text'>
                  <p>실시간 인기 해시태그</p>
                </div>
                <div className='ic-tag-list-box'>
                  <li className='ic-tag-list'>
                    <p>#1등해시태그</p>
                  </li>
                  <li className='ic-tag-list'>
                    <p>#2등해시태그</p>
                  </li>
                  <li className='ic-tag-list'>
                    <p>#3등해시태그</p>
                  </li>
                  <li className='ic-tag-list'>
                    <p>#4등해시태그</p>
                  </li>
                  <li className='ic-tag-list'>
                    <p>#5등해시태그</p>
                  </li>
                  <li className='ic-tag-list'>
                    <p>#6등해시태그</p>
                  </li>
                  <li className='ic-tag-list'>
                    <p>#7등해시태그</p>
                  </li>
                </div>
              </ul>
            </div> */}
          </div>
        </div>
      </div>


    </>
  );
};

export default ConnectLiveChatting;
