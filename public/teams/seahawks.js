import stadiums from "../stadiums.js";

const SeattleCoordinates = [
  stadiums.SEA,
  stadiums.NE,
  stadiums.SEA,
  stadiums.DET,
  stadiums.SEA,
  stadiums.SEA,
  stadiums.ATL,
  stadiums.SEA,
  stadiums.SEA,
  stadiums.SEA, // BYE
  stadiums.SF,
  stadiums.SEA,
  stadiums.NYJ,
  stadiums.ARI,
  stadiums.SEA,
  stadiums.SEA,
  stadiums.CHI,
  stadiums.LAR,
];

function createSeahawksFlightPath() {
  return new google.maps.Polyline({
    path: SeattleCoordinates,
    geodesic: false,
    strokeColor: "#65b628",
    strokeOpacity: 1.0,
    strokeWeight: 2,
  });
}

// Function to animate the camera along the flight path
function seahawksCamera(map, index = 0) {
  if (index >= SeattleCoordinates.length - 1) return;

  const start = SeattleCoordinates[index];
  const end = SeattleCoordinates[index + 1];
  const totalSteps = 600; // Number of steps for the animation
  const stepDuration = 1; // Time per step in milliseconds

  let currentStep = 0;

  function moveCamera() {
    if (currentStep >= totalSteps) {
      setTimeout(() => {
        seahawksCamera(map, index + 1);
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

export { createSeahawksFlightPath, seahawksCamera };
