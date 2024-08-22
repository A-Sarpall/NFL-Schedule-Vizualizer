import stadiums from "../stadiums.js";

const LosAngelesRCoordinates = [
  stadiums.DET,
  stadiums.ARI,
  stadiums.LAR,
  stadiums.CHI,
  stadiums.LAR,
  stadiums.LAR, // BYE
  stadiums.LAR,
  stadiums.LAR,
  stadiums.SEA,
  stadiums.LAR,
  stadiums.NE,
  stadiums.LAR,
  stadiums.NO,
  stadiums.LAR,
  stadiums.SF,
  stadiums.NYJ,
  stadiums.LAR,
  stadiums.LAR,
];

function createRamsFlightPath() {
  return new google.maps.Polyline({
    path: LosAngelesRCoordinates,
    geodesic: false,
    strokeColor: "#013594",
    strokeOpacity: 1.0,
    strokeWeight: 2,
  });
}

// Function to animate the camera along the flight path
function ramsCamera(map, index = 0) {
  if (index >= LosAngelesRCoordinates.length - 1) return;

  const start = LosAngelesRCoordinates[index];
  const end = LosAngelesRCoordinates[index + 1];
  const totalSteps = 600; // Number of steps for the animation
  const stepDuration = 1; // Time per step in milliseconds

  let currentStep = 0;

  function moveCamera() {
    if (currentStep >= totalSteps) {
      setTimeout(() => {
        ramsCamera(map, index + 1);
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

export { createRamsFlightPath, ramsCamera };
