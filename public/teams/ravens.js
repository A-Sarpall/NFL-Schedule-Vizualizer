import stadiums from "../stadiums.js";

const BaltimoreCoordinates = [
  stadiums.KC,
  stadiums.BAL,
  stadiums.DAL,
  stadiums.BAL,
  stadiums.CIN,
  stadiums.BAL,
  stadiums.TB,
  stadiums.CLE,
  stadiums.BAL,
  stadiums.BAL,
  stadiums.PIT,
  stadiums.LAC,
  stadiums.BAL,
  stadiums.BAL, // BYE
  stadiums.NYG,
  stadiums.BAL,
  stadiums.HOU,
  stadiums.BAL,
];

function createRavensFlightPath() {
  return new google.maps.Polyline({
    path: BaltimoreCoordinates,
    geodesic: false,
    strokeColor: "#24135f",
    strokeOpacity: 1.0,
    strokeWeight: 2,
  });
}

// Function to animate the camera along the flight path
function ravensCamera(map, index = 0) {
  if (index >= BaltimoreCoordinates.length - 1) return;

  const start = BaltimoreCoordinates[index];
  const end = BaltimoreCoordinates[index + 1];
  const totalSteps = 600; // Number of steps for the animation
  const stepDuration = 1; // Time per step in milliseconds

  let currentStep = 0;

  function moveCamera() {
    if (currentStep >= totalSteps) {
      setTimeout(() => {
        ravensCamera(map, index + 1);
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

export { createRavensFlightPath, ravensCamera };
