// import React from "react";
import React, { useEffect } from 'react';
import { useState } from 'react';
import '../scss/ConnectUserActivityFreeBoard.scss';

const ConnectUserActivityFreeBoard = () => {
    const [freeboardItems, setfreeboardItems] = useState([]);
    const memberIdx = 1;

    useEffect(() => {
        const fetchUserActivityFreeboard = async () => {
          try {
            const response = await fetch(`http://localhost:8181/member/mypage/myactive/freeboard/${memberIdx}`, {
              method: 'GET'
            });
            const result = await response.json();
            console.log(result);
            
            // 서버에서 가져온 데이터가 배열인지 확인
            if (Array.isArray(result)) {
                setfreeboardItems(result);
            } else {
              console.error('자유게시판 불러 올 수 없음:', result);
            }
          } catch (error) {
            console.error('패치실패:', error);
          }
        };
      
        fetchUserActivityFreeboard();
      }, []);

    return (
        <>
        
        <div id="UserActivityFreeBoardWrapper">
            <div className="user-activity-free-board">

                <div className="user-info-list-box">
                {freeboardItems.map((item, index) => (
                    <div className="user-info-list" key={index}>
                        <div className="ui-category">
                            <p>{item.freeBoardCategory}</p>
                        </div>
                        <div className="ui-location">
                            <p>{item.freeBoardLocation}</p>
                        </div>
                        <div className="ui-title">
                            <p>{item.freeBoardTitle}</p>
                        </div>
                        <div className="ui-date">
                            <p>{item.freeBoardWriteDate}</p>
                        </div>
                    </div>
                        ))}
                   

                </div>




            </div>
        </div>

        
        
        
        </>
    );

};

export default ConnectUserActivityFreeBoard