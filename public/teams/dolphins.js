import stadiums from "../stadiums.js";

const MiamiCoordinates = [
  stadiums.MIA,
  stadiums.MIA,
  stadiums.SEA,
  stadiums.MIA,
  stadiums.NE,
  stadiums.MIA, // BYE
  stadiums.IND,
  stadiums.MIA,
  stadiums.BUF,
  stadiums.LAR,
  stadiums.MIA,
  stadiums.MIA,
  stadiums.GB,
  stadiums.MIA,
  stadiums.HOU,
  stadiums.MIA,
  stadiums.CLE,
  stadiums.NYJ,
];

function createDolphinsFlightPath() {
  return new google.maps.Polyline({
    path: MiamiCoordinates,
    geodesic: false,
    strokeColor: "#008c95",
    strokeOpacity: 1.0,
    strokeWeight: 2,
  });
}

// Function to animate the camera along the flight path
function dolphinsCamera(map, index = 0) {
  if (index >= MiamiCoordinates.length - 1) return;

  const start = MiamiCoordinates[index];
  const end = MiamiCoordinates[index + 1];
  const totalSteps = 600; // Number of steps for the animation
  const stepDuration = 1; // Time per step in milliseconds

  let currentStep = 0;

  function moveCamera() {
    if (currentStep >= totalSteps) {
      setTimeout(() => {
        dolphinsCamera(map, index + 1);
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

export { createDolphinsFlightPath, dolphinsCamera };
