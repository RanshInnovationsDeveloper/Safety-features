//Function to calculate whether a location is expired or not
function calculateExpiration(expiration, createdAt) {
  if (expiration === -1) {
    return " ";
  }

  // Convert expiration to milliseconds and add it to the creation date
  const expirationDate =
    new Date(createdAt).getTime() + expiration * 60 * 1000;

  // Calculate the difference between the expiration date and the current date
  const diff = expirationDate - new Date().getTime();
  if (diff < 0) return "Expired";

  // Convert the difference to days, hours, and minutes
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  // Return the remaining time in a suitable format
  if (days > 0) {
    return `${days} day(s) left`;
  } else if (hours > 0) {
    return `${hours} hour(s) left`;
  } else {
    return `${minutes} minute(s) left`;
  }
}

//Function to calculate the distance between two points
function calculateDistance(lat, long, center) {
  // Check if center is not yet set
  if (!center || center?.lat == null || center?.lng == null) {
    return;
  }

  // Convert degree to radians
  let latRad = (lat * Math.PI) / 180;
  let longRad = (long * Math.PI) / 180;
  let centerLatRad = (center.lat * Math.PI) / 180;
  let centerLongRad = (center.lng * Math.PI) / 180;

  // Calculate the difference between the latitudes and longitudes
  const dlat = latRad - centerLatRad;
  const dlong = longRad - centerLongRad;

  // Calculate the distance
  const a =
    Math.pow(Math.sin(dlat / 2), 2) +
    Math.cos(latRad) *
      Math.cos(centerLatRad) *
      Math.pow(Math.sin(dlong / 2), 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = 6371 * c; // Multiply by the radius of the earth in km

  // If the distance is greater than 1 km, return it in km, otherwise return it in meters
  if (distance > 1) {
    return `${distance.toFixed(2)} km`;
  } else {
    return `${(distance * 1000).toFixed(2)} m`;
  }
}

function calculateDateDifferenceInMinutes(dateString1, dateString2) {
  // Parse the date strings to Date objects
  const date2 = new Date(dateString1);
  const date1 = new Date(dateString2);

  // Calculate the difference in milliseconds
  const diffInMilliseconds = date2 - date1;

  // Convert the difference to minutes
  const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));

  return diffInMinutes;
}
function calculateDateDifferenceInHours(dateString1, dateString2) {
  // Parse the date strings to Date objects
  const date2 = new Date(dateString1);
  const date1 = new Date(dateString2);

  // Calculate the difference in milliseconds
  const diffInMilliseconds = date2 - date1;

  // Convert the difference to hours
  const diffInHours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));

  return diffInHours;
}

export {
  calculateExpiration,
  calculateDistance,
  calculateDateDifferenceInMinutes,
  calculateDateDifferenceInHours,
};
