import React, { useState, useEffect } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
const { kakao } = window;

const ConnectTotalMap = () => {
	const [location, setLoacation] = useState(null);

	useEffect(() => {
		navigator.geolocation.getCurrentPosition(successHandler, errorHandler); 
	}, []);

	const successHandler = (response) => {
		console.log(response); 
		const { latitude, longitude } = response.coords;
		setLoacation({ latitude, longitude });
    // alert(`현재 위치: 위도 ${latitude}, 경도 ${longitude}`);
	};


	const errorHandler = (error) => {
		console.log(error);
	};

	return (
		<>
			{location && (
				<Map 
                  center={{ lat: location.latitude, lng: location.longitude }} 
                  style={{ width: '850px', height: '800px' }} 
                  level={3}
                >
					<MapMarker position={{ lat: location.latitude, lng: location.longitude }} />
				</Map>
			)}
		</>
	);
};

export default ConnectTotalMap;
// =================================================================

// import React from 'react'
// import React, { useEffect, useState, useMemo } from "react";
// // import { MapMarker } from 'react-kakao-maps-sdk';
// const { kakao } = window;

//   // 현재위치 담는 곳
//   const [location, setLocation] = useState("");
//   const [map, setMap] = useState();

//   // 현재위치 세부조정
//   var options = {
//     enableHighAccuracy: true,
//     timeout: 5000,
//     maximumAge: 0,
//   };

//   // 현재 위치 가져오기
//   useMemo(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(success, error, options);
//     }

//     function success(position) {
//       setLocation({
//         latitude: position.coords.latitude,
//         longitude: position.coords.longitude,
//       });
//     }

//     function error() {
//       setLocation({
//         latitude: 33.450701,
//         longitude: 126.570667,
//       });
//       console.log("위치 받기 실패");
//     }
//   }, [navigator.geolocation.getCurrentPosition]);

//   // 카카오지도 API 가져오기
//   const kakaoMap = () => {
//     const container = document.getElementById("map");
//     const options = {
//       center: new kakao.maps.LatLng(location.latitude, location.longitude),
//       level: 3,
//     };
//     setMap(new kakao.maps.Map(container, options));
//   };

//   // 화면에 랜더링
//   useEffect(() => {
//     kakaoMap();
//     console.log(location);
//   }, [location]);

//   return (
//     <>
//       <div id="map" style={{ width: "100vw", height: "100vh" }}>
//         {/* <MapMarker map={map} location={location} kakao={kakao} /> */}
//       </div>
//     </>
//   );

// export default ConnectTotalMap;




// 지도======================================================================



// import { useEffect, useState } from 'react';
// import { Map, MapMarker, MapInfoWindow } from 'react-kakao-maps-sdk';

// const ConnectTotalMap = () => {
//   const [hpData, setHpData] = useState([]);
//   // const [hoveredLocation, setHoveredLocation] = useState(null);
//   const [selectedLocation, setSelectedLocation] = useState(null);

//   useEffect(() => {
//     fetch('http://localhost:8181/contents/hot-place', {
//       method: 'GET',
//     })
//       .then((res) => res.json())
//       .then((result) => {
//         const list = [...result.hotplaceList];
//         console.log(list);
//         setHpData(list);
//       });
//   }, []);


//   const handleMarkerClick = (location) => {
//     setSelectedLocation(location);
//   };


//   const locations = hpData.map((item) => {
//     const { hotplaceName, hotplaceLatitude, hotplaceLongitude, hotplaceFullAddress, hotplaceImage } = item;
//     return {
//       title: hotplaceName,
//       latlng: { lat: parseFloat(hotplaceLatitude), lng: parseFloat(hotplaceLongitude) },
//       address: hotplaceFullAddress,
//       image: hotplaceImage,
//     };
//   });

//   return (
//     <>
//         <Map center={{ lat: 37.4996237314472, lng: 127.03051594993698 }} style={{ width: '864px', height: '700px', borderBottom: '4px solid #1247ad' }} level={3}>
//           {locations.map((loc) => (
//             <MapMarker
//             key={`${loc.title}-${loc.latlng}`}
//             position={loc.latlng}
//             title={loc.title}
//             clickable={true}
//             onClick={() => handleMarkerClick(loc)}
//             image={{
//               src: 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png',
//               size: { width: 24, height: 35 },
//             }}
//             />
//             ))}
//           {selectedLocation && (
//             <MapInfoWindow position={selectedLocation.latlng} onClose={() => setSelectedLocation(null)}>
//               <div style={{ width: '240px', height: '200px', backgroundColor: 'white', padding: '10px', borderRadius: '5px' }}>
//                 <h4>{selectedLocation.title}</h4>
//                 <img src={selectedLocation.image} style={{ width: '200px', height: '120px', paddingLeft: '10px', margin: '10px 0px' }} />
//                 <p>{selectedLocation.address}</p>
//               </div>
//             </MapInfoWindow>
//           )}
//           </Map>

//     </>
//   );
// };

// export default ConnectTotalMap;
