import React from "react";
import { useEffect, useState } from 'react';

import '../scss/ConnectUserActivityHotPlace.scss';

const ConnectUserActivityHotPlace = () => {

    const [hpData, setHpData] = useState([]);
    console.log(hpData);
    useEffect(() => {
        fetch('http://13.209.61.63/contents/hot-place', {
          method: 'GET',
          headers: {'content-type' : 'application/json'}
        })
        .then(res => res.json())
        .then(result => {
          const list = [...result.hotplaceList];
    
          setHpData(list);
    
        });
    
      }, []); 

    return (
        <>

            <div id="UserActivityHotPlaceWrapper">
                <div className="user-activity-hot-place-box">

                    <div className="uahp-wrapper">
                        <div className="uahp-box" style={{overflow:'scroll'}} >

                             {hpData.map(hp => (
        
                                <div className="uahp-list" style={{marginBottom:'10px'}}>
                                    <div className="uahp-img-box">
                                        <div className="uahp-img">

                                            {/* 이미지 aws s3 */}
                                            <img src={hp.hotplaceImg} style={{width:'133px', height:'80px'}} />

                                            {/* 이미지 로컬 */}
                                            {/* <img src={`http://localhost:8181/contents/hot-place/img/${hp.hotplaceImg}`} /> */}
                                            
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