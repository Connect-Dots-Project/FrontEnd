import React, { useState } from 'react'

import '../scss/ConnectFreeBoardData.scss';
import '../scss/ConnectFreeBoard.scss';
import ConnectFreeBoardDetail from './ConnectFreeBoardDetail';
import { getLoginUserInfo } from '../../util/login-util';
import { API_BASE_URL } from '../../config/host-config';

const ConnectFreeBoardData = ({ freeBoardList }) => {

    
    const {
        freeBoardIdx
        ,freeBoardTitle
        ,freeBoardImg
        ,freeBoardCategory
        ,freeBoardLocation
        ,freeBoardWriteDate
        ,freeBoardUpdateDate
        ,freeBoardViewCount
        ,freeBoardReplyCount
        ,freeBoardLikeCount
        ,freeBoardMemberIdx
    } = freeBoardList;

    const [isOpenInnerBoard, setIsOpenInnerBoard] = useState(false);

    const openInnerBoardModal = e => {

        const fetchData = async() => {

            const url = API_BASE_URL + '/contents/free-board/detail/' + freeBoardIdx;
      
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
                setIsOpenInnerBoard(false);
                alert('로그인 해야해요;');
              } else {
                setIsOpenInnerBoard(true);
              }
      
      
            } catch (error) {
              console.log(error);
            }
      
          }
        
        fetchData();
        return;

        
    };

    const closeInnerBoardModal = e => {
        setIsOpenInnerBoard(false);
    };

  return (

    <>
    {isOpenInnerBoard && <ConnectFreeBoardDetail freeBoardIdx={ freeBoardList.freeBoardIdx } closeInnerBoardModal={ closeInnerBoardModal } />}

    <button className='fbm-info-list' onClick={ openInnerBoardModal }>
        <div className='fbm-info-img-box'>
          <div className='fbm-info-img' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
            {freeBoardImg ? (
              <img src={freeBoardImg} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <img src={require('../scss/img/ad1.jpg')} alt='No Image' style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            )}
          </div>
        </div>
        <ul className='fbm-inr-info-box'>
            <li className='fbm-inr-info' id='Area'>{freeBoardLocation}</li>
            <li className='fbm-inr-info' id='BoardTitle'>{freeBoardTitle}</li>
            <li className='fbm-inr-info' id='Categories'>{freeBoardCategory}</li>
            <li className='fbm-inr-info' id='Date'>{freeBoardUpdateDate}</li>
            <span>
                {/* 댓글 + 좋아요 box */}
                <div className='reply-like-box'>
                    <div className='reply' id='Reply'>
                        <div className='reply-img'></div>
                        <div className='reply-count-box'>
                            <p className='reply-count-text'>{freeBoardReplyCount}</p>
                        </div>
                    </div>
                    <div className='like' id='Like'>
                        <div className='like-img'></div>
                        <div className='like-count-box'>
                            <p className='like-count-text'>{freeBoardLikeCount}</p>
                        </div>
                    </div>
                </div>
            </span>
        </ul>
    </button>

    </>
  )
}

export default ConnectFreeBoardData