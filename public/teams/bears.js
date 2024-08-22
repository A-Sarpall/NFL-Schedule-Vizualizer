import stadiums from "../stadiums.js";

const ChicagoCoordinates = [
  stadiums.CHI,
  stadiums.HOU,
  stadiums.IND,
  stadiums.CHI,
  stadiums.CHI,
  stadiums.UKTOT,
  stadiums.CHI, //BYE
  stadiums.WSH,
  stadiums.ARI,
  stadiums.CHI,
  stadiums.CHI,
  stadiums.CHI,
  stadiums.DET,
  stadiums.SF,
  stadiums.MIN,
  stadiums.CHI,
  stadiums.CHI,
  stadiums.GB,
];

let animationFrameId = null;
let isAnimating = false;

function createBearsFlightPath(map) {
  const flightPath = new google.maps.Polyline({
    path: ChicagoCoordinates,
    geodesic: false,
    strokeColor: "#df3f00",
    strokeOpacity: 1.0,
    strokeWeight: 2,
  });

  flightPath.setMap(map);

  return flightPath;
}

// Function to animate the camera along the flight path
function bearsCamera(map, index = 0) {
  if (index >= ChicagoCoordinates.length - 1) return;

  if (isAnimating) {
    cancelAnimationFrame(animationFrameId);
    isAnimating = false;
  }

  const start = ChicagoCoordinates[index];
  const end = ChicagoCoordinates[index + 1];
  const totalSteps = 600; // Number of steps for the animation
  const stepDuration = 1; // Time per step in milliseconds

  let currentStep = 0;

  function moveCamera() {
    if (currentStep >= totalSteps) {
      setTimeout(() => {
        bearsCamera(map, index + 1);
      }, 500); // Wait before moving to the next point
      return;
    }

    const lat = start.lat + (end.lat - start.lat) * (currentStep / totalSteps);
    const lng = start.lng + (end.lng - start.lng) * (currentStep / totalSteps);

    map.panTo(new google.maps.LatLng(lat, lng));
    map.setZoom(7); // Adjust the zoom level as needed

    currentStep++;
    animationFrameId = requestAnimationFrame(moveCamera);
    isAnimating = true;
  }

  moveCamera();
}

export { createBearsFlightPath, bearsCamera };
