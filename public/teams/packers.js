import stadiums from "../stadiums.js";

const GreenBayCoordinates = [
  stadiums.BRAZIL,
  stadiums.GB,
  stadiums.TEN,
  stadiums.GB,
  stadiums.LAR,
  stadiums.GB,
  stadiums.GB,
  stadiums.JAX,
  stadiums.GB,
  stadiums.GB, // BYE
  stadiums.CHI,
  stadiums.GB,
  stadiums.GB,
  stadiums.DET,
  stadiums.SEA,
  stadiums.GB,
  stadiums.MIN,
  stadiums.GB,
];

function createPackersFlightPath() {
  return new google.maps.Polyline({
    path: GreenBayCoordinates,
    geodesic: false,
    strokeColor: "#1c2e26",
    strokeOpacity: 1.0,
    strokeWeight: 2,
  });
}

// Function to animate the camera along the flight path
function packersCamera(map, index = 0) {
  if (index >= GreenBayCoordinates.length - 1) return;

  const start = GreenBayCoordinates[index];
  const end = GreenBayCoordinates[index + 1];
  const totalSteps = 600; // Number of steps for the animation
  const stepDuration = 1; // Time per step in milliseconds

  let currentStep = 0;

  function moveCamera() {
    if (currentStep >= totalSteps) {
      setTimeout(() => {
        packersCamera(map, index + 1);
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

export { createPackersFlightPath, packersCamera };
