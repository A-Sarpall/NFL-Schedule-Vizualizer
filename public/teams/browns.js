import stadiums from "../stadiums.js";

const ClevelandCoordinates = [
  stadiums.CLE,
  stadiums.JAX,
  stadiums.CLE,
  stadiums.LV,
  stadiums.WSH,
  stadiums.PHI,
  stadiums.CLE,
  stadiums.CLE,
  stadiums.CLE,
  stadiums.CLE, //BYE
  stadiums.NO,
  stadiums.CLE,
  stadiums.DEN,
  stadiums.PIT,
  stadiums.CLE,
  stadiums.CIN,
  stadiums.CLE,
  stadiums.BAL,
];

function createBrownsFlightPath() {
  return new google.maps.Polyline({
    path: ClevelandCoordinates,
    geodesic: false,
    strokeColor: "#e34911",
    strokeOpacity: 1.0,
    strokeWeight: 2,
  });
}

// Function to animate the camera along the flight path
function brownsCamera(map, index = 0) {
  if (index >= ClevelandCoordinates.length - 1) return;

  const start = ClevelandCoordinates[index];
  const end = ClevelandCoordinates[index + 1];
  const totalSteps = 600; // Number of steps for the animation
  const stepDuration = 1; // Time per step in milliseconds

  let currentStep = 0;

  function moveCamera() {
    if (currentStep >= totalSteps) {
      setTimeout(() => {
        brownsCamera(map, index + 1);
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

export { createBrownsFlightPath, brownsCamera };
