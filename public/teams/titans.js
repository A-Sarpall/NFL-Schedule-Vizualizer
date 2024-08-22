import stadiums from "../stadiums.js";

const TennesseeCoordinates = [
  stadiums.CHI,
  stadiums.TEN,
  stadiums.TEN,
  stadiums.MIA,
  stadiums.TEN, // BYE
  stadiums.TEN,
  stadiums.BUF,
  stadiums.DET,
  stadiums.TEN,
  stadiums.LAC,
  stadiums.TEN,
  stadiums.HOU,
  stadiums.WSH,
  stadiums.TEN,
  stadiums.TEN,
  stadiums.IND,
  stadiums.JAX,
  stadiums.TEN,
];

function createTitansFlightPath() {
  return new google.maps.Polyline({
    path: TennesseeCoordinates,
    geodesic: false,
    strokeColor: "#5185bc",
    strokeOpacity: 1.0,
    strokeWeight: 2,
  });
}

// Function to animate the camera along the flight path
function titansCamera(map, index = 0) {
  if (index >= TennesseeCoordinates.length - 1) return;

  const start = TennesseeCoordinates[index];
  const end = TennesseeCoordinates[index + 1];
  const totalSteps = 600; // Number of steps for the animation
  const stepDuration = 1; // Time per step in milliseconds

  let currentStep = 0;

  function moveCamera() {
    if (currentStep >= totalSteps) {
      setTimeout(() => {
        titansCamera(map, index + 1);
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

export { createTitansFlightPath, titansCamera };
