import stadiums from "../stadiums.js";

const NewYorkJCoordinates = [
  stadiums.SF,
  stadiums.TEN,
  stadiums.NYJ,
  stadiums.NYJ,
  stadiums.UKTOT,
  stadiums.NYJ,
  stadiums.PIT,
  stadiums.NE,
  stadiums.NYJ,
  stadiums.ARI,
  stadiums.NYJ,
  stadiums.NYJ, // BYE
  stadiums.NYJ,
  stadiums.MIA,
  stadiums.JAX,
  stadiums.NYJ,
  stadiums.BUF,
  stadiums.NYJ,
];

function createJetsFlightPath() {
  return new google.maps.Polyline({
    path: NewYorkJCoordinates,
    geodesic: false,
    strokeColor: "#0c371c",
    strokeOpacity: 1.0,
    strokeWeight: 2,
  });
}

// Function to animate the camera along the flight path
function jetsCamera(map, index = 0) {
  if (index >= NewYorkJCoordinates.length - 1) return;

  const start = NewYorkJCoordinates[index];
  const end = NewYorkJCoordinates[index + 1];
  const totalSteps = 600; // Number of steps for the animation
  const stepDuration = 1; // Time per step in milliseconds

  let currentStep = 0;

  function moveCamera() {
    if (currentStep >= totalSteps) {
      setTimeout(() => {
        jetsCamera(map, index + 1);
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

export { createJetsFlightPath, jetsCamera };
