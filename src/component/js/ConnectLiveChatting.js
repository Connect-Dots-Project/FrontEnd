import React, { useState, useEffect, useCallback, useRef } from 'react';
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

// 함수 -> 태그 -> useEffect

const ConnectLiveChatting = (props) => {
  const [roomId, setRoomId] = useState(''); // 방 번호
  const [sender, setSender] = useState(''); // 보내는 사람
  const [message, setMessage] = useState(''); // 메시지
  const [messages, setMessages] = useState([]);
  const [roomList, setRoomList] = useState([]); // 채팅방 목록



  const [inputHashtag, setInputHashtag] = useState('');
  const [inputContent, setInputContent] = useState('');


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


  // 채팅방 목록을 불러오는 함수
  const findAll = () => {
    const myToken = localStorage.getItem('Authorization');
    console.log(myToken);
    
    fetch(`http://localhost:8181/contents/chat`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization' : myToken
    },
      credentials: 'include' // 쿠키가 필요하다면 추가하기
    })
      .then((res) => {return res.json();})
      .then((result) => {

        const findList = [...result.livechatList];
        setRoomList(findList);
      });

      console.log('--------------------');
      console.log(getLoginUserInfo());
      console.log('--------------------');

  }


  // 웹소켓을 연결합니다.
  const connect = () => {

    sock = new SockJS('http://localhost:8181/contents/chat/live');
    ws.current = Stomp.over(sock);

    // 아래 주소로 연결 합니다.
    ws.current.connect(
      {},
      frame => {
        ws.current.subscribe('/topic/chat/room/' + roomId, message => {
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
    )

  };


  // 방 번호가 바뀔때마다 소켓 연결을 다시 해줍니다.
  useEffect(() => {
    // 웹 소켓 연결 함수
    connect();

    return () => {
      ws.current.disconnect();
    };

  }, [roomId]);


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
  const recvMessage = (recv) => {

    setMessages((prevMessages) => [
      ...prevMessages,
      {
        type: recv.type,
        sender: recv.type === 'ENTER' ? '알림' : recv.sender,
        message: recv.message,
      },
    ]);

  };

  // 채팅창을 클릭했을 때
  // 1. 채팅창의 룸 인덱스로 소켓을 연결함
  // 2. 보내는이의 아이디를 유저의 닉네임으로 셋업함
  // 3. div태그를 엽니다.

  const handleClick = (idx) => {
    setRoomId(idx);
    setSender(localStorage.getItem('NICKNAME'));

    // TODO : 기존의 채팅창에서 다른 방으로 클릭할 때
    // 연결은 되지만 창이 안 열림.
    // open 로직을 수정해야 함
    openChathandler();
  }





  // 채팅 방을 생성하는 함수
  const createLiveChat = () => {

    const myToken = localStorage.getItem('Authorization');
    console.log('--------------------------------');

    fetch('http://localhost:8181/contents/chat',{
      method: 'POST',
      headers: { 
        'content-type': 'application/json',
        'Authorization' : myToken
    },
    credentials: 'include', // 쿠키가 필요하다면 추가하기
      body: JSON.stringify({
          content: inputContent,
          hashTag: inputHashtag,
          // TODO : 닉네임을 없애야 한다 토큰으로 nickname 작성할 예정
      })
    })



    .then(res => {
      console.log(res);
      console.log(res.isCreate);

      if (res.status === 401) {
        alert('토큰 없음');
        return
      } else if (res.status === 500) {
        alert('서버 문제');
        return
      }

      closeWriteChat(false);

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

    setIsOpenWriteChat(false);
  };
  
    

  const [isOpenWriteInput, setIsOpenWriteInput] = useState(false);

  const clickTag = e => {
    
    setIsOpenWriteInput(!isOpenWriteInput);
  };


const inputTagRef = useRef(null);
const inputBtnRef = useRef(null);
const inputBtnTextRef = useRef(null);

useEffect(() => {
  const inputTag = inputTagRef.current;
  const inputBtn = inputBtnRef.current;
  const inputBtnText = inputBtnTextRef.current;

  if (isOpenWriteInput && inputTag && inputBtn) {
    inputTag.style.display = 'block';
    inputTag.style.animation = 'openClickTagBtn 0.5s forwards 1';
    inputBtn.style.animation = 'openTag 1s forwards 1';
    inputBtn.style.background = '#fff';
    inputBtnText.style.color = '#1465ad';
    inputBtnText.style.fontWeight = '700';
  } 
}, [isOpenWriteInput]);



    return (
    <>
    {isOpenWriteChat && (

      <div id='WriteChatModal'>
      <div className='write-chat-modal-box'>

        <div className='wc-header'>
          <div className='wc-tag-box'>
            <button id='ClickTag' onClick={ clickTag } ref={inputBtnRef}>
              <p ref={inputBtnTextRef}>#</p>
            </button>

            {isOpenWriteInput && (
              <input 
              className='wc-tag' 
              id='Input-Tag'
              placeholder='태그를 적어주세요'
              value={inputHashtag}
              onChange={inputHashtagHandler}
              ref={inputTagRef}/>
            )}

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
        <div className='lcheader-img'>방장 사진</div>
        <div className='lcheader-nickname'><p>닉네임</p></div>
      </div>
      <div className='lcheader-accessor-box'>
        <div className='lcheader-accessor'>현재 방에 참여한 유저들의 사진 + 닉네임 들어갈 예정</div>
      </div>
    </div>



      {/* main */}
      <div className='lcmain-wrapper'>
        <div className='lcmain-box'>
            <div className='lcmain-chatlist-wrapper' ref={chatlistWrapperRef}>

              {/* <div className='lcmain-chatlist-header'>이곳이 채팅창</div> */}
              {/* <div className='lcmain-chatlist-header'></div> */}
              


              {messages.map((message, index) => (
                <div className="list-group-item" key={index}>
                
                  <li className='list-group'>
                    <p>[</p>
                    <div 
                      className='message' 
                      id='Sender'>{message.sender}</div>
                    <p>]</p>
                    <div 
                      className='message' 
                      id='Message'>{message.message}</div>
                  </li>

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
                      <p>메인 텍스트</p>
                    </div>
                    <div className='info-sub-text-box'>
                      <p>서브 텍스트</p>
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
                          <p>{room.hashtag}</p>
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

            <div className='lc-tag-wrapper'>
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
            </div>
          </div>
        </div>
      </div>


    </>
  );
};

export default ConnectLiveChatting;
