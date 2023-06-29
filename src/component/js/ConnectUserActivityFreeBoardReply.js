// import React from "react";
import React, { useEffect } from 'react';
import { useState } from 'react';
import '../scss/ConnectUserActivityFreeBoardReply.scss';
import { getLoginUserInfo } from '../../util/login-util';
import { API_BASE_URL } from "../../config/host-config";

const ConnectUserActivityFreeBoard = () => {
  
  const [freeboardItems, setfreeboardItems] = useState([]);

  useEffect(()=>{

      fetch(API_BASE_URL + `/member/mypage/myactive/freeboard/reply`, {
          method: 'GET',
          headers: {
              'content-type': 'application/json',
              'Authorization' : getLoginUserInfo().token
          },
          credentials: 'include'
      }) 
      .then(res => res.json())
      .then(response => {
          console.log(response);
          setfreeboardItems([...response]);
      })

  }, []);




    return (
        <>
        
        <div id="UserActivityFreeBoardReplyWrappers">
            <div className="user-activity-free-boards">

                <div className='user-info-list-wrappers'>

                <div className="user-info-list-boxes">

                    {freeboardItems.map((item, index) => (

                        <div className='user-info-lists-boxes'>


                        <div className="user-info-lists" key={index}>
                            <div className='ui-list-boxes'>
                                <div className="ui-categories">
                                    <p>{item.category}</p>
                                </div>
                                <div className="ui-locations">
                                    <p>{item.location}</p>
                                </div>
                                <div className="ui-titles">
                                    <p>{item.freeBoardTitle}</p>
                                </div>
                                <div className="ui-dates">
                                    <p>{item.freeBoardWriteTime}</p>
                                </div>
                            </div>


                            <div className="ui-guest-reply-boxes">
                                <div className='ui-guest-replies'>
                                    <p>{item.content}</p>
                                </div>
                            </div>
                            
                        </div>

                    </div>
                ))}
                   
                </div>




                    </div>
            </div>
        </div>

        
        
        
        </>
    );

};

export default ConnectUserActivityFreeBoard