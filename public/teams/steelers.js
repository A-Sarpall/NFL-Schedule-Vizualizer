import stadiums from "../stadiums.js";

const PittsburghCoordinates = [
  stadiums.ATL,
  stadiums.DEN,
  stadiums.PIT,
  stadiums.IND,
  stadiums.PIT,
  stadiums.LV,
  stadiums.PIT,
  stadiums.PIT,
  stadiums.PIT, // BYE
  stadiums.WSH,
  stadiums.PIT,
  stadiums.CLE,
  stadiums.CIN,
  stadiums.PIT,
  stadiums.PHI,
  stadiums.BAL,
  stadiums.PIT,
  stadiums.PIT,
];

function createSteelersFlightPath() {
  return new google.maps.Polyline({
    path: PittsburghCoordinates,
    geodesic: false,
    strokeColor: "#e7a81e",
    strokeOpacity: 1.0,
    strokeWeight: 2,
  });
}

// Function to animate the camera along the flight path
function steelersCamera(map, index = 0) {
  if (index >= PittsburghCoordinates.length - 1) return;

  const start = PittsburghCoordinates[index];
  const end = PittsburghCoordinates[index + 1];
  const totalSteps = 600; // Number of steps for the animation
  const stepDuration = 1; // Time per step in milliseconds

  let currentStep = 0;

  function moveCamera() {
    if (currentStep >= totalSteps) {
      setTimeout(() => {
        steelersCamera(map, index + 1);
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

export { createSteelersFlightPath, steelersCamera };
