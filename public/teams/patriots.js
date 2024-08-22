import stadiums from "../stadiums.js";

const NewEnglandCoordinates = [
  stadiums.CIN,
  stadiums.NE,
  stadiums.NYJ,
  stadiums.SF,
  stadiums.NE,
  stadiums.NE,
  stadiums.UKWEM,
  stadiums.NE,
  stadiums.TEN,
  stadiums.CHI,
  stadiums.LAR,
  stadiums.MIA,
  stadiums.NE,
  stadiums.NE, // BYE
  stadiums.ARI,
  stadiums.BUF,
  stadiums.NE,
  stadiums.NE,
];

function createPatriotsFlightPath() {
  return new google.maps.Polyline({
    path: NewEnglandCoordinates,
    geodesic: false,
    strokeColor: "#0d254d",
    strokeOpacity: 1.0,
    strokeWeight: 2,
  });
}

// Function to animate the camera along the flight path
function patriotsCamera(map, index = 0) {
  if (index >= NewEnglandCoordinates.length - 1) return;

  const start = NewEnglandCoordinates[index];
  const end = NewEnglandCoordinates[index + 1];
  const totalSteps = 600; // Number of steps for the animation
  const stepDuration = 1; // Time per step in milliseconds

  let currentStep = 0;

  function moveCamera() {
    if (currentStep >= totalSteps) {
      setTimeout(() => {
        patriotsCamera(map, index + 1);
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

export { createPatriotsFlightPath, patriotsCamera };
