import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

const SetMapCenter = ({ positions }) => {
  const map = useMap();

  useEffect(() => {
    if (positions.length > 0) {
      map.setView([positions[0][0], positions[0][1]], map.getZoom());
    }
  }, [positions, map]);

  return null;
};

export default SetMapCenter;
