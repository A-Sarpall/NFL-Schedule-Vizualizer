import stadiums from "../stadiums.js";

const WashingtonCoordinates = [
  stadiums.TB,
  stadiums.WSH,
  stadiums.CIN,
  stadiums.ARI,
  stadiums.WSH,
  stadiums.BAL,
  stadiums.WSH,
  stadiums.WSH,
  stadiums.NYG,
  stadiums.WSH,
  stadiums.PHI,
  stadiums.WSH,
  stadiums.WSH,
  stadiums.WSH, // BYE
  stadiums.NO,
  stadiums.WSH,
  stadiums.WSH,
  stadiums.DAL,
];

function createCommandersFlightPath() {
  return new google.maps.Polyline({
    path: WashingtonCoordinates,
    geodesic: false,
    strokeColor: "#5a1514",
    strokeOpacity: 1.0,
    strokeWeight: 2,
  });
}

// Function to animate the camera along the flight path
function commandersCamera(map, index = 0) {
  if (index >= WashingtonCoordinates.length - 1) return;

  const start = WashingtonCoordinates[index];
  const end = WashingtonCoordinates[index + 1];
  const totalSteps = 600; // Number of steps for the animation
  const stepDuration = 1; // Time per step in milliseconds

  let currentStep = 0;

  function moveCamera() {
    if (currentStep >= totalSteps) {
      setTimeout(() => {
        commandersCamera(map, index + 1);
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

export { createCommandersFlightPath, commandersCamera };
