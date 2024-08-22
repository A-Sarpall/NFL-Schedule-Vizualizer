import stadiums from "../stadiums.js";

const JacksonvilleCoordinates = [
  stadiums.MIA,
  stadiums.JAX,
  stadiums.BUF,
  stadiums.HOU,
  stadiums.JAX,
  stadiums.UKTOT,
  stadiums.UKWEM,
  stadiums.JAX,
  stadiums.PHI,
  stadiums.JAX,
  stadiums.DET,
  stadiums.JAX, // BYE
  stadiums.JAX,
  stadiums.TEN,
  stadiums.JAX,
  stadiums.LV,
  stadiums.JAX,
  stadiums.IND,
];

function createJaguarsFlightPath() {
  return new google.maps.Polyline({
    path: JacksonvilleCoordinates,
    geodesic: false,
    strokeColor: "#ce9d1d",
    strokeOpacity: 1.0,
    strokeWeight: 2,
  });
}

// Function to animate the camera along the flight path
function jaguarsCamera(map, index = 0) {
  if (index >= JacksonvilleCoordinates.length - 1) return;

  const start = JacksonvilleCoordinates[index];
  const end = JacksonvilleCoordinates[index + 1];
  const totalSteps = 600; // Number of steps for the animation
  const stepDuration = 1; // Time per step in milliseconds

  let currentStep = 0;

  function moveCamera() {
    if (currentStep >= totalSteps) {
      setTimeout(() => {
        jaguarsCamera(map, index + 1);
      }, 500); // Wait before moving to the next point
      return;
    }

    const lat = start.lat + (end.lat - start.lat) * (currentStep / totalSteps);
    const lng = start.lng + (end.lng - start.lng) * (currentStep / totalSteps);

    map.panTo(new google.maps.LatLng(lat, lng));
    map.setZoom(7); // Adjust the zoom level as needed

    currentStep++;
    setTimeout(moveCamera, stepDuration);
  }

  moveCamera();
}

export { createJaguarsFlightPath, jaguarsCamera };
