import stadiums from "../stadiums.js";

const DenverCoordinates = [
  stadiums.SEA,
  stadiums.DEN,
  stadiums.TB,
  stadiums.NYJ,
  stadiums.DEN,
  stadiums.DEN,
  stadiums.NO,
  stadiums.DEN,
  stadiums.BAL,
  stadiums.KC,
  stadiums.DEN,
  stadiums.LV,
  stadiums.DEN,
  stadiums.DEN, // BYE
  stadiums.DEN,
  stadiums.LAC,
  stadiums.CIN,
  stadiums.DEN,
];

function createBroncosFlightPath() {
  return new google.maps.Polyline({
    path: DenverCoordinates,
    geodesic: false,
    strokeColor: "#f44d14",
    strokeOpacity: 1.0,
    strokeWeight: 2,
  });
}

// Function to animate the camera along the flight path
function broncosCamera(map, index = 0) {
  if (index >= DenverCoordinates.length - 1) return;

  const start = DenverCoordinates[index];
  const end = DenverCoordinates[index + 1];
  const totalSteps = 600; // Number of steps for the animation
  const stepDuration = 1; // Time per step in milliseconds

  let currentStep = 0;

  function moveCamera() {
    if (currentStep >= totalSteps) {
      setTimeout(() => {
        broncosCamera(map, index + 1);
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

export { createBroncosFlightPath, broncosCamera };
