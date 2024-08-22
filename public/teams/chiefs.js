import stadiums from "../stadiums.js";

const KansasCityCoordinates = [
  stadiums.KC,
  stadiums.KC,
  stadiums.ATL,
  stadiums.LAC,
  stadiums.KC,
  stadiums.KC, // BYE
  stadiums.SF,
  stadiums.LV,
  stadiums.KC,
  stadiums.KC,
  stadiums.BUF,
  stadiums.CAR,
  stadiums.KC,
  stadiums.KC,
  stadiums.CLE,
  stadiums.KC,
  stadiums.PIT,
  stadiums.DEN,
];

function createChiefsFlightPath() {
  return new google.maps.Polyline({
    path: KansasCityCoordinates,
    geodesic: false,
    strokeColor: "#c9243f",
    strokeOpacity: 1.0,
    strokeWeight: 2,
  });
}

// Function to animate the camera along the flight path
function chiefsCamera(map, index = 0) {
  if (index >= KansasCityCoordinates.length - 1) return;

  const start = KansasCityCoordinates[index];
  const end = KansasCityCoordinates[index + 1];
  const totalSteps = 600; // Number of steps for the animation
  const stepDuration = 1; // Time per step in milliseconds

  let currentStep = 0;

  function moveCamera() {
    if (currentStep >= totalSteps) {
      setTimeout(() => {
        chiefsCamera(map, index + 1);
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

export { createChiefsFlightPath, chiefsCamera };
