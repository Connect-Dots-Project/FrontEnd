import { useEffect, useState } from 'react';
import { Map, MapMarker, MapInfoWindow } from 'react-kakao-maps-sdk';
import { API_BASE_URL } from '../../config/host-config';
import { getLoginUserInfo } from '../../util/login-util';

const ConnectTotalMap = () => {
  const [hpData, setHpData] = useState([]);
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
        const list = [...result.hotplaceList];
        console.log(list);
        setHpData(list);
      });
  }, []);


  const handleMarkerClick = (location) => {
    setSelectedLocation(location);
  };


  const locations = hpData.map(hp => {
	// console.log(hp);
    const { hotplaceName, hotplaceLatitude, hotplaceLongitude, hotplaceFullAddress, hotplaceImg } = hp;
    return {
	  hotplaceName: hotplaceName,
      latlng: { lat: parseFloat(hotplaceLatitude), lng: parseFloat(hotplaceLongitude) },
      hotplaceFullAddress: hotplaceFullAddress,
      hotplaceImg: hotplaceImg,
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
				  
              <div style={{ width: '240px', height: '200px', backgroundColor: 'white', padding: '10px', borderRadius: '5px' }}>
                <h4>{selectedLocation.hotplaceName}</h4>

                {/* 이미지 aws s3 저장 */}
                <img src={selectedLocation.hotplaceImg}  style={{ width: '200px', height: '120px', paddingLeft: '10px', margin: '10px 0px' }} />
                        
                <p>{selectedLocation.hotplaceFullAddress}</p>
                
              </div>
				
            </MapInfoWindow>
          )}
          </Map>

    </>
  );
};

export default ConnectTotalMap;
