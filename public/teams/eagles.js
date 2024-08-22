import stadiums from "../stadiums.js";

const PhiladelphiaCoordinates = [
  stadiums.BRAZIL,
  stadiums.PHI,
  stadiums.NO,
  stadiums.TB,
  stadiums.PHI, //BYE
  stadiums.PHI,
  stadiums.NYG,
  stadiums.CIN,
  stadiums.PHI,
  stadiums.DAL,
  stadiums.PHI,
  stadiums.LAR,
  stadiums.BAL,
  stadiums.PHI,
  stadiums.PHI,
  stadiums.WSH,
  stadiums.PHI,
  stadiums.PHI,
];

function createEaglesFlightPath() {
  return new google.maps.Polyline({
    path: PhiladelphiaCoordinates,
    geodesic: false,
    strokeColor: "#004d56",
    strokeOpacity: 1.0,
    strokeWeight: 2,
  });
}

// Function to animate the camera along the flight path
function eaglesCamera(map, index = 0) {
  if (index >= PhiladelphiaCoordinates.length - 1) return;

  const start = PhiladelphiaCoordinates[index];
  const end = PhiladelphiaCoordinates[index + 1];
  const totalSteps = 600; // Number of steps for the animation
  const stepDuration = 1; // Time per step in milliseconds

  let currentStep = 0;

  function moveCamera() {
    if (currentStep >= totalSteps) {
      setTimeout(() => {
        eaglesCamera(map, index + 1);
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

export { createEaglesFlightPath, eaglesCamera };
