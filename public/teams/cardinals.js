import stadiums from "../stadiums.js";

const ArizonaCoordinates = [
  stadiums.BUF,
  stadiums.ARI,
  stadiums.ARI,
  stadiums.ARI,
  stadiums.SF,
  stadiums.GB,
  stadiums.ARI,
  stadiums.MIA,
  stadiums.ARI,
  stadiums.ARI,
  stadiums.ARI,
  stadiums.ARI, // BYE
  stadiums.SEA,
  stadiums.MIN,
  stadiums.ARI,
  stadiums.ARI,
  stadiums.CAR,
  stadiums.LAR,
  stadiums.ARI,
];

function createCardinalsFlightPath() {
  return new google.maps.Polyline({
    path: ArizonaCoordinates,
    geodesic: false,
    strokeColor: "#b1063a",
    strokeOpacity: 1.0,
    strokeWeight: 2,
  });
}

// Function to animate the camera along the flight path
function cardinalsCamera(map, index = 0) {
  if (index >= ArizonaCoordinates.length - 1) return;

  const start = ArizonaCoordinates[index];
  const end = ArizonaCoordinates[index + 1];
  const totalSteps = 600; // Number of steps for the animation
  const stepDuration = 1; // Time per step in milliseconds

  let currentStep = 0;

  function moveCamera() {
    if (currentStep >= totalSteps) {
      setTimeout(() => {
        cardinalsCamera(map, index + 1);
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

export { createCardinalsFlightPath, cardinalsCamera };
