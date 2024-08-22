import stadiums from "../stadiums.js";

const IndianapolisCoordinates = [
  stadiums.IND,
  stadiums.GB,
  stadiums.IND,
  stadiums.IND,
  stadiums.JAX,
  stadiums.TEN,
  stadiums.IND,
  stadiums.HOU,
  stadiums.MIN,
  stadiums.IND,
  stadiums.NYJ,
  stadiums.IND,
  stadiums.NE,
  stadiums.IND, // BYE
  stadiums.DEN,
  stadiums.IND,
  stadiums.NYG,
  stadiums.IND,
];

function createColtsFlightPath() {
  return new google.maps.Polyline({
    path: IndianapolisCoordinates,
    geodesic: false,
    strokeColor: "#003b7b",
    strokeOpacity: 1.0,
    strokeWeight: 2,
  });
}

// Function to animate the camera along the flight path
function coltsCamera(map, index = 0) {
  if (index >= IndianapolisCoordinates.length - 1) return;

  const start = IndianapolisCoordinates[index];
  const end = IndianapolisCoordinates[index + 1];
  const totalSteps = 600; // Number of steps for the animation
  const stepDuration = 1; // Time per step in milliseconds

  let currentStep = 0;

  function moveCamera() {
    if (currentStep >= totalSteps) {
      setTimeout(() => {
        coltsCamera(map, index + 1);
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

export { createColtsFlightPath, coltsCamera };
