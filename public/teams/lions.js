import stadiums from "../stadiums.js";

const DetroitCoordinates = [
  stadiums.DET,
  stadiums.DET,
  stadiums.ARI,
  stadiums.DET,
  stadiums.DET, // BYE
  stadiums.DAL,
  stadiums.MIN,
  stadiums.DET,
  stadiums.GB,
  stadiums.HOU,
  stadiums.DET,
  stadiums.IND,
  stadiums.DET,
  stadiums.DET,
  stadiums.DET,
  stadiums.CHI,
  stadiums.SF,
  stadiums.DET,
];

function createLionsFlightPath() {
  return new google.maps.Polyline({
    path: DetroitCoordinates,
    geodesic: false,
    strokeColor: "#006db0",
    strokeOpacity: 1.0,
    strokeWeight: 2,
  });
}

// Function to animate the camera along the flight path
function lionsCamera(map, index = 0) {
  if (index >= DetroitCoordinates.length - 1) return;

  const start = DetroitCoordinates[index];
  const end = DetroitCoordinates[index + 1];
  const totalSteps = 600; // Number of steps for the animation
  const stepDuration = 1; // Time per step in milliseconds

  let currentStep = 0;

  function moveCamera() {
    if (currentStep >= totalSteps) {
      setTimeout(() => {
        lionsCamera(map, index + 1);
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

export { createLionsFlightPath, lionsCamera };
