import stadiums from "../stadiums.js";

const SanFranciscoCoordinates = [
  stadiums.SF,
  stadiums.MIN,
  stadiums.LAR,
  stadiums.SF,
  stadiums.SF,
  stadiums.SEA,
  stadiums.SF,
  stadiums.SF,
  stadiums.SF, // BYE
  stadiums.TB,
  stadiums.SF,
  stadiums.GB,
  stadiums.BUF,
  stadiums.SF,
  stadiums.SF,
  stadiums.MIA,
  stadiums.SF,
  stadiums.ARI,
];

function createSanFran49ersFlightPath() {
  return new google.maps.Polyline({
    path: SanFranciscoCoordinates,
    geodesic: false,
    strokeColor: "#af1f2d",
    strokeOpacity: 1.0,
    strokeWeight: 2,
  });
}

// Function to animate the camera along the flight path
function sanfran49ersCamera(map, index = 0) {
  if (index >= SanFranciscoCoordinates.length - 1) return;

  const start = SanFranciscoCoordinates[index];
  const end = SanFranciscoCoordinates[index + 1];
  const totalSteps = 600; // Number of steps for the animation
  const stepDuration = 1; // Time per step in milliseconds

  let currentStep = 0;

  function moveCamera() {
    if (currentStep >= totalSteps) {
      setTimeout(() => {
        sanfran49ersCamera(map, index + 1);
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

export { createSanFran49ersFlightPath, sanfran49ersCamera };
