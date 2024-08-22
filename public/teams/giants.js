import stadiums from "../stadiums.js";

const NewYorkGCoordinates = [
  stadiums.NYG,
  stadiums.WSH,
  stadiums.CLE,
  stadiums.NYG,
  stadiums.SEA,
  stadiums.NYG,
  stadiums.NYG,
  stadiums.PIT,
  stadiums.NYG,
  stadiums.GERMANY,
  stadiums.NYG, // BYE
  stadiums.NYG,
  stadiums.DAL,
  stadiums.NYG,
  stadiums.NYG,
  stadiums.ATL,
  stadiums.NYG,
  stadiums.PHI,
];

function createGiantsFlightPath() {
  return new google.maps.Polyline({
    path: NewYorkGCoordinates,
    geodesic: false,
    strokeColor: "#073191",
    strokeOpacity: 1.0,
    strokeWeight: 2,
  });
}

// Function to animate the camera along the flight path
function giantsCamera(map, index = 0) {
  if (index >= NewYorkGCoordinates.length - 1) return;

  const start = NewYorkGCoordinates[index];
  const end = NewYorkGCoordinates[index + 1];
  const totalSteps = 600; // Number of steps for the animation
  const stepDuration = 1; // Time per step in milliseconds

  let currentStep = 0;

  function moveCamera() {
    if (currentStep >= totalSteps) {
      setTimeout(() => {
        giantsCamera(map, index + 1);
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

export { createGiantsFlightPath, giantsCamera };
