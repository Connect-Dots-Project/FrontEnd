import { useEffect, useState } from 'react';
import { Map, MapMarker, MapInfoWindow } from 'react-kakao-maps-sdk';

const ConnectTotalMap = () => {
  const [hpData, setHpData] = useState([]);
  // const [hoveredLocation, setHoveredLocation] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8181/contents/hot-place', {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((result) => {
        const list = [...result.hotplaceList];
        console.log(list);
        setHpData(list);
      });
  }, []);

  const handleMarkerClick = (location) => {
    setSelectedLocation(location);
  };


  const locations = hpData.map((item) => {
    const { hotplaceName, hotplaceLatitude, hotplaceLongitude, hotplaceFullAddress, hotplaceImage } = item;
    return {
      title: hotplaceName,
      latlng: { lat: parseFloat(hotplaceLatitude), lng: parseFloat(hotplaceLongitude) },
      address: hotplaceFullAddress,
      image: hotplaceImage,
    };
  });

  return (
    <>
        <Map center={{ lat: 37.4996237314472, lng: 127.03051594993698 }} style={{ width: '855px', height: '700px', border: '1px solid #000', borderBottom: '5px solid #1247ad' }} level={3}>
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
                <h4>{selectedLocation.title}</h4>
                <img src={selectedLocation.image} style={{ width: '200px', height: '120px', paddingLeft: '10px', margin: '10px 0px' }} />
                <p>{selectedLocation.address}</p>
              </div>
            </MapInfoWindow>
          )}
          </Map>

    </>
  );
};

export default ConnectTotalMap;
