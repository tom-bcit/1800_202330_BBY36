getLocation();

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    console.log ("Geolocation is not supported by this browser.");
  }
}

function showPosition(position) {
  localStorage.setItem('latitude', position.coords.latitude);
  localStorage.setItem('longitude', position.coords.longitude);
}
