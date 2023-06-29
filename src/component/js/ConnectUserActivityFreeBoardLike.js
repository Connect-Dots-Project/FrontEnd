// import React from "react";
import React, { useEffect } from 'react';
import { useState } from 'react';
import '../scss/ConnectUserActivityFreeBoard.scss';
import { getLoginUserInfo } from '../../util/login-util';
import { API_BASE_URL } from "../../config/host-config";

const ConnectUserActivityFreeBoard = () => {
  
  const [freeboardItems, setfreeboardItems] = useState([]);

  useEffect(()=>{

      fetch(API_BASE_URL + `/member/mypage/myactive/freeboard/like`, {
          method: 'GET',
          headers: {
              'content-type': 'application/json',
              'Authorization' : getLoginUserInfo().token
          },
          credentials: 'include'
      }) 
      .then(res => res.json())
      .then(response => {
          setfreeboardItems([...response]);
      })

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