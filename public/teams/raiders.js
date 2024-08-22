import stadiums from "../stadiums.js";

const LasVegasCoordinates = [
  stadiums.LAC,
  stadiums.BAL,
  stadiums.LV,
  stadiums.LV,
  stadiums.DEN,
  stadiums.LV,
  stadiums.LAR,
  stadiums.LV,
  stadiums.CIN,
  stadiums.LV, // BYE
  stadiums.MIA,
  stadiums.LV,
  stadiums.KC,
  stadiums.TB,
  stadiums.LV,
  stadiums.LV,
  stadiums.NO,
  stadiums.LV,
];

function createRaidersFlightPath() {
  return new google.maps.Polyline({
    path: LasVegasCoordinates,
    geodesic: false,
    strokeColor: "#000000",
    strokeOpacity: 1.0,
    strokeWeight: 2,
  });
}

// Function to animate the camera along the flight path
function raidersCamera(map, index = 0) {
  if (index >= LasVegasCoordinates.length - 1) return;

  const start = LasVegasCoordinates[index];
  const end = LasVegasCoordinates[index + 1];
  const totalSteps = 600; // Number of steps for the animation
  const stepDuration = 1; // Time per step in milliseconds

  let currentStep = 0;

  function moveCamera() {
    if (currentStep >= totalSteps) {
      setTimeout(() => {
        raidersCamera(map, index + 1);
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

export { createRaidersFlightPath, raidersCamera };
