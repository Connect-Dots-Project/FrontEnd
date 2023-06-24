import '../scss/ConnectUserSettingLocation.scss';
import React, { useState, useEffect } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
const { kakao } = window;


const ConnectUserSettingLocation = () => {

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
            <div id='UserSettingLocationWrapper'>
                <div className='user-setting-location-wrapper'>
                    {location && (
                        <Map 
                        center={{ lat: location.latitude, lng: location.longitude }} 
                        style={{ width: '485px', height: '360px' }} 
                        level={3}
                        >
                            <MapMarker position={{ lat: location.latitude, lng: location.longitude }} />
                        </Map>
                    )}
                </div>
            </div>
        </>
    );

};

export default ConnectUserSettingLocation