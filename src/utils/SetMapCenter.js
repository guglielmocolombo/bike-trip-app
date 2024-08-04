import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

const SetMapCenter = ({ positions, hoveredPosition }) => {
  const map = useMap();

  useEffect(() => {
    if(hoveredPosition && hoveredPosition.length > 0){
      map.setView(hoveredPosition, map.getZoom());
    } else if (positions.length > 0) {
      map.setView([positions[Math.floor(positions.length / 2)][0], positions[Math.floor(positions.length / 2)][1]], map.getZoom());
    }
  }, [hoveredPosition,, positions, map]);

  return null;
};

export default SetMapCenter;
