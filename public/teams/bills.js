import stadiums from "../stadiums.js";

const BuffaloCoordinates = [
  stadiums.BUF,
  stadiums.MIA,
  stadiums.BUF,
  stadiums.BAL,
  stadiums.HOU,
  stadiums.NYJ,
  stadiums.BUF,
  stadiums.SEA,
  stadiums.BUF,
  stadiums.IND,
  stadiums.BUF,
  stadiums.BUF, // BYE
  stadiums.BUF,
  stadiums.LAR,
  stadiums.DET,
  stadiums.BUF,
  stadiums.BUF,
  stadiums.NE,
];

function createBillsFlightPath() {
  return new google.maps.Polyline({
    path: BuffaloCoordinates,
    geodesic: false,
    strokeColor: "#0066b3",
    strokeOpacity: 1.0,
    strokeWeight: 2,
  });
}

// Function to animate the camera along the flight path
function billsCamera(map, index = 0) {
  if (index >= BuffaloCoordinates.length - 1) return;

  const start = BuffaloCoordinates[index];
  const end = BuffaloCoordinates[index + 1];
  const totalSteps = 600; // Number of steps for the animation
  const stepDuration = 1; // Time per step in milliseconds

  let currentStep = 0;

  function moveCamera() {
    if (currentStep >= totalSteps) {
      setTimeout(() => {
        billsCamera(map, index + 1);
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

export { createBillsFlightPath, billsCamera };
