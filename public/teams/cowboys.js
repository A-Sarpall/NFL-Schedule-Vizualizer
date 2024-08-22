import stadiums from "../stadiums.js";

const DallasCoordinates = [
  stadiums.CLE,
  stadiums.DAL,
  stadiums.DAL,
  stadiums.NYG,
  stadiums.PIT,
  stadiums.DAL,
  stadiums.DAL, //BYE
  stadiums.SF,
  stadiums.ATL,
  stadiums.DAL,
  stadiums.DAL,
  stadiums.WSH,
  stadiums.DAL,
  stadiums.DAL,
  stadiums.CAR,
  stadiums.DAL,
  stadiums.PHI,
  stadiums.DAL,
];

function createCowboysFlightPath() {
  return new google.maps.Polyline({
    path: DallasCoordinates,
    geodesic: false,
    strokeColor: "#002a5b",
    strokeOpacity: 1.0,
    strokeWeight: 2,
  });
}

// Function to animate the camera along the flight path
function cowboysCamera(map, index = 0) {
  if (index >= DallasCoordinates.length - 1) return;

  const start = DallasCoordinates[index];
  const end = DallasCoordinates[index + 1];
  const totalSteps = 600; // Number of steps for the animation
  const stepDuration = 1; // Time per step in milliseconds

  let currentStep = 0;

  function moveCamera() {
    if (currentStep >= totalSteps) {
      setTimeout(() => {
        cowboysCamera(map, index + 1);
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

export { createCowboysFlightPath, cowboysCamera };
