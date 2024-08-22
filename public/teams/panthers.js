import stadiums from "../stadiums.js";

const CarolinaCoordinates = [
  stadiums.NO,
  stadiums.CAR,
  stadiums.LV,
  stadiums.CAR,
  stadiums.CHI,
  stadiums.CAR,
  stadiums.WSH,
  stadiums.DEN,
  stadiums.CAR,
  stadiums.GERMANY,
  stadiums.CAR, //BYE
  stadiums.CAR,
  stadiums.CAR,
  stadiums.PHI,
  stadiums.CAR,
  stadiums.CAR,
  stadiums.TB,
  stadiums.ATL,
];

function createPanthersFlightPath() {
  return new google.maps.Polyline({
    path: CarolinaCoordinates,
    geodesic: false,
    strokeColor: "#0085ca",
    strokeOpacity: 1.0,
    strokeWeight: 2,
  });
}

// Function to animate the camera along the flight path
function panthersCamera(map, index = 0) {
  if (index >= CarolinaCoordinates.length - 1) return;

  const start = CarolinaCoordinates[index];
  const end = CarolinaCoordinates[index + 1];
  const totalSteps = 600; // Number of steps for the animation
  const stepDuration = 1; // Time per step in milliseconds

  let currentStep = 0;

  function moveCamera() {
    if (currentStep >= totalSteps) {
      setTimeout(() => {
        panthersCamera(map, index + 1);
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

export { createPanthersFlightPath, panthersCamera };
