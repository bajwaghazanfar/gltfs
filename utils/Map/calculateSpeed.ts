function metersPerSecondToMilesPerHour(speedInMetersPerSecond) {
  const metersPerHour = speedInMetersPerSecond * 3600; // Convert to meters per hour
  const milesPerHour = metersPerHour / 1609.344; // Convert to miles per hour
  return milesPerHour;
}

export function calculateSpeed(hoverInfo: any) {
  const length = hoverInfo.length;

  let lat1 = hoverInfo[length - 2].coordinates[1];
  let lon1 = hoverInfo[length - 2].coordinates[0];
  let lat2 = hoverInfo[length - 1].coordinates[1];
  let lon2 = hoverInfo[length - 1].coordinates[0];
  const time1 = 1694518500 * 1000;
  const time2 = 1694518520 * 1000;

  // Convert latitude and longitude from degrees to radians
  const degToRad = (deg) => deg * (Math.PI / 180);
  lat1 = degToRad(lat1);
  lon1 = degToRad(lon1);
  lat2 = degToRad(lat2);
  lon2 = degToRad(lon2);

  // Radius of the Earth in meters
  const earthRadius = 6371000; // meters

  // Calculate the time difference in seconds
  const timeDifference = (time2 - time1) / 1000; // Convert milliseconds to seconds

  // Calculate the Haversine distance
  const dLat = lat2 - lat1;
  const dLon = lon2 - lon1;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = earthRadius * c;

  // Calculate speed in meters per second
  const speed = metersPerSecondToMilesPerHour(distance / timeDifference);

  return speed.toFixed(2); // Speed in meters per second
}
