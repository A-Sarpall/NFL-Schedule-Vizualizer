import stadiums from "../stadiums.js";

const HoustonCoordinates = [
  stadiums.IND,
  stadiums.HOU,
  stadiums.MIN,
  stadiums.HOU,
  stadiums.HOU,
  stadiums.NE,
  stadiums.GB,
  stadiums.HOU,
  stadiums.NYJ,
  stadiums.HOU,
  stadiums.DAL,
  stadiums.HOU,
  stadiums.JAX,
  stadiums.HOU, //BYE
  stadiums.HOU,
  stadiums.HOU,
  stadiums.KC,
  stadiums.HOU,
  stadiums.TEN,
];

function createTexansFlightPath() {
  return new google.maps.Polyline({
    path: HoustonCoordinates,
    geodesic: false,
    strokeColor: "#06192e",
    strokeOpacity: 1.0,
    strokeWeight: 2,
  });
}

// Function to animate the camera along the flight path
function texansCamera(map, index = 0) {
  if (index >= HoustonCoordinates.length - 1) return;

  const start = HoustonCoordinates[index];
  const end = HoustonCoordinates[index + 1];
  const totalSteps = 600; // Number of steps for the animation
  const stepDuration = 1; // Time per step in milliseconds

  let currentStep = 0;

  function moveCamera() {
    if (currentStep >= totalSteps) {
      setTimeout(() => {
        texansCamera(map, index + 1);
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

export { createTexansFlightPath, texansCamera };
