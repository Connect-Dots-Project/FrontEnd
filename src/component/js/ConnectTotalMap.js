import { useEffect, useState } from 'react';
import { Map, MapMarker, MapInfoWindow } from 'react-kakao-maps-sdk';

const ConnectTotalMap = () => {
  const [hpData, setHpData] = useState([]);
  const [hoveredLocation, setHoveredLocation] = useState(null);
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

  const handleMarkerMouseEnter = (location) => {
    setHoveredLocation(location);
  };

  const handleMarkerMouseLeave = () => {
    setHoveredLocation(null);
  };

  const locations = hpData.map((item) => {
    const { hotplaceName, hotplaceLatitude, hotplaceLongitude, hotplaceAddress, hotplaceImage } = item;
    return {
      title: hotplaceName,
      latlng: { lat: parseFloat(hotplaceLatitude), lng: parseFloat(hotplaceLongitude) },
      address: hotplaceAddress,
      image: hotplaceImage,
    };
  });

  return (
    <Map center={{ lat: 37.4996237314472, lng: 127.03051594993698 }} style={{ width: '800px', height: '600px' }} level={3}>
      {locations.map((loc) => (
        <MapMarker
          key={`${loc.title}-${loc.latlng}`}
          position={loc.latlng}
          title={loc.title}
          clickable={true}
          onClick={() => handleMarkerClick(loc)}
          onMouseEnter={() => handleMarkerMouseEnter(loc)}
          onMouseLeave={handleMarkerMouseLeave}
          image={{
            src: 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png',
            size: { width: 24, height: 35 },
          }}
        />
      ))}
      {selectedLocation && (
        <MapInfoWindow position={selectedLocation.latlng} onClose={() => setSelectedLocation(null)}>
          <div style={{ backgroundColor: 'white', padding: '10px', borderRadius: '5px' }}>
            <img src={selectedLocation.image} alt={selectedLocation.title} style={{ width: '200px', height: '150px', marginBottom: '10px' }} />
            <h4>{selectedLocation.title}</h4>
            <p>{selectedLocation.address}</p>
          </div>
        </MapInfoWindow>
      )}
      {hoveredLocation && (
        <MapInfoWindow position={hoveredLocation.latlng} onClose={() => setHoveredLocation(null)}>
          <div style={{ backgroundColor: 'white', padding: '10px', borderRadius: '5px' }}>
            <img src={hoveredLocation.image} alt={hoveredLocation.title} style={{ width: '200px', height: '150px', marginBottom: '10px' }} />
            <h4>{hoveredLocation.title}</h4>
            <p>{hoveredLocation.address}</p>
          </div>
        </MapInfoWindow>
      )}
    </Map>
  );
};

export default ConnectTotalMap;