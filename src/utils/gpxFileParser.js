
export const parseGPX = (gpxData) => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(gpxData, 'application/xml');

    const parseError = xmlDoc.getElementsByTagName('parsererror');
    if (parseError.length > 0) {
        throw new Error('Error parsing XML');
    }

    const track = {
        name: '',
        points: []
    };

    const nameElement = xmlDoc.getElementsByTagName('name')[0];
    if (nameElement) {
        track.name = nameElement.textContent;
    }

    // Haversine formula to calculate distance between two points
    const haversine = (lat1, lon1, lat2, lon2) => {
        const R = 6371; // Radius of the Earth in kilometers
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a = 
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c; // Distance in kilometers
    };

    const trkptElements = xmlDoc.getElementsByTagName('trkpt');
    let totalDistance = 0;
    let previousPoint = null;

    for (let i = 0; i < trkptElements.length; i++) {
        const trkpt = trkptElements[i];
        const lat = parseFloat(trkpt.getAttribute('lat'));
        const lon = parseFloat(trkpt.getAttribute('lon'));
        const timeElement = trkpt.getElementsByTagName('time')[0];
        const speedElement = trkpt.getElementsByTagName('speed')[0];

        if (previousPoint) {
            totalDistance += haversine(previousPoint.latitude, previousPoint.longitude, lat, lon);
        }

        const point = {
            latitude: lat,
            longitude: lon,
            time: timeElement ? timeElement.textContent : null,
            speed: speedElement ? parseFloat(speedElement.textContent) : 0,
            distance: parseFloat(totalDistance.toFixed(2))
        };

        track.points.push(point);
        previousPoint = point;
    }

    return track;
};
