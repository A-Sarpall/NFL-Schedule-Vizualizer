import stadiums from "../stadiums.js";

const MinnesotaCoordinates = [
  stadiums.NYG,
  stadiums.MIN,
  stadiums.MIN,
  stadiums.GB,
  stadiums.UKTOT,
  stadiums.MIN, // BYE
  stadiums.MIN,
  stadiums.LAR,
  stadiums.MIN,
  stadiums.JAX,
  stadiums.TEN,
  stadiums.CHI,
  stadiums.MIN,
  stadiums.MIN,
  stadiums.MIN,
  stadiums.SEA,
  stadiums.MIN,
  stadiums.DET,
];

function createVikingsFlightPath() {
  return new google.maps.Polyline({
    path: MinnesotaCoordinates,
    geodesic: false,
    strokeColor: "#4f2681",
    strokeOpacity: 1.0,
    strokeWeight: 2,
  });
}

// Function to animate the camera along the flight path
function vikingsCamera(map, index = 0) {
  if (index >= MinnesotaCoordinates.length - 1) return;

  const start = MinnesotaCoordinates[index];
  const end = MinnesotaCoordinates[index + 1];
  const totalSteps = 600; // Number of steps for the animation
  const stepDuration = 1; // Time per step in milliseconds

  let currentStep = 0;

  function moveCamera() {
    if (currentStep >= totalSteps) {
      setTimeout(() => {
        vikingsCamera(map, index + 1);
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

export { createVikingsFlightPath, vikingsCamera };
