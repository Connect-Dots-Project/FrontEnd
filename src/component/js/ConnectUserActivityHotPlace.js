import React from "react";
import { useEffect, useState } from 'react';
import { API_BASE_URL } from "../../config/host-config";
import { getLoginUserInfo } from "../../util/login-util";
import swal from "sweetalert";

import '../scss/ConnectUserActivityHotPlace.scss';

const ConnectUserActivityHotPlace = () => {

    const [hpData, setHpData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const res = await fetch(API_BASE_URL + `/member/mypage/myactive/hotplace`, {
              method: 'GET',
              headers: {
                'content-type': 'application/json',
                'Authorization': getLoginUserInfo().token
              },
              credentials: 'include'
            });
        
            const response = await res.json();
            
            setHpData([...response]);
          } catch (error) {
            // 오류 처리
          }
        };
      
        fetchData();
        
      }, []);
      
      

    return (
        <>

            <div id="UserActivityHotPlaceWrapper">
                <div className="user-activity-hot-place-box">

                    <div className="uahp-wrapper">
                        <div className="uahp-box">

                             {hpData.map(hp => (
        
                                <div className="uahp-list" style={{marginBottom:'10px'}}>
                                    <div className="uahp-img-box">
                                        <div className="uahp-img">

                                            {/* 이미지 aws s3 */}
                                            <img src={hp.hotplaceImg} style={{width:'133px', height:'80px'}} />

                                        </div>
                                    </div>
                                    <div className="uahp-text-box">
                                        <p>[{hp.location}]</p>
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

export default ConnectUserActivityHotPlace