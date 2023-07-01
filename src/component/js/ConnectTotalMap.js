import { useEffect, useState } from 'react';
import { Map, MapMarker, MapInfoWindow } from 'react-kakao-maps-sdk';
import { API_BASE_URL } from '../../config/host-config';
import { getLoginUserInfo } from '../../util/login-util';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import '../scss/ConnectTotalMap.scss';

const ConnectTotalMap = ({ hpDataList }) => {
  const [hpData, setHpData] = useState(hpDataList);
  const [page, setPage] = useState(0);
  const [selectedLocation, setSelectedLocation] = useState(null);


const REQUEST_URL = API_BASE_URL + '/contents/hot-place';

  useEffect(() => {
    fetch(REQUEST_URL+`/list/${page}`, {
      method: 'GET',
      headers: {
        'Authorization' : getLoginUserInfo().token
      },
      credentials: 'include'
    })
      .then(res => {
        if (res.status === 401) {
          alert('회원가입이 필요한 서비스입니다.');
          window.location.href = '/';
        } else {
          return res.json();
        }
      })
      .then((result) => {        
        
;
      });
  }, []);


  const handleMarkerClick = (location) => {
    setSelectedLocation(location);
  };


  const locations = hpData.map(hp => {
    
    const { memberNickname, hotplaceName, hotplaceLatitude, hotplaceLongitude, hotplaceFullAddress, hotplaceImg, hotplaceContent } = hp;
    return {
      memberNickname,
	    hotplaceName,
      latlng: { lat: parseFloat(hotplaceLatitude), lng: parseFloat(hotplaceLongitude) },
      hotplaceFullAddress,
      hotplaceImg,
      hotplaceContent
    };
  });

  return (
    <>
        <Map center={{ lat: 37.4996237314472, lng: 127.03051594993698 }} style={{ width: '864px', height: '700px', borderBottom: '4px solid #1247ad' }} level={3}>
          {locations.map((loc) => (
            <MapMarker
            key={`${loc.title}-${loc.latlng}`}
            position={loc.latlng}
            title={loc.title}
            clickable={true}
            onClick={() => handleMarkerClick(loc)}
            image={{
              src: 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png',
              size: { width: 24, height: 35 },
            }}
            />
            ))}
          {selectedLocation && (
			  <MapInfoWindow position={selectedLocation.latlng} onClose={() => setSelectedLocation(null)}>
				  
              <div className='mapBox'>
                
                <p className='memberNickname'> {selectedLocation.memberNickname} 님 </p>

                <div className='inside'>
                      <h4 className='hotplaceName'><FontAwesomeIcon icon={faLocationDot} /> {selectedLocation.hotplaceName}</h4>
                      <p className='hotplaceFullAddress'>{selectedLocation.hotplaceFullAddress}</p>

                      <img className='hotplaceImg' src={selectedLocation.hotplaceImg} style={{width: '300px', height: '120px', margin: '10px 0px' }} />

                </div>
                        
                <p className='hotplaceContent' dangerouslySetInnerHTML={{ __html: selectedLocation.hotplaceContent }}></p>
              </div>
				
            </MapInfoWindow>
          )}
          </Map>

    </>
  );
};

export default ConnectTotalMap;
