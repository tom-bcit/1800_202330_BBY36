getLocation();

// Gets user's geolocation
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    console.log ("Geolocation is not supported by this browser.");
  }
}

// Saves geolocation data to localStorage
function showPosition(position) {
  localStorage.setItem('latitude', position.coords.latitude);
  localStorage.setItem('longitude', position.coords.longitude);
}
