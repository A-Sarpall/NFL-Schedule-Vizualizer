import stadiums from "../stadiums.js";

const LosAngelesCCoordinates = [
  stadiums.LAC,
  stadiums.CAR,
  stadiums.PIT,
  stadiums.LAC,
  stadiums.LAC, // BYE
  stadiums.DEN,
  stadiums.ARI,
  stadiums.LAC,
  stadiums.CLE,
  stadiums.LAC,
  stadiums.LAC,
  stadiums.LAC,
  stadiums.ATL,
  stadiums.KC,
  stadiums.LAC,
  stadiums.LAC,
  stadiums.NE,
  stadiums.LV,
];

function createChargersFlightPath() {
  return new google.maps.Polyline({
    path: LosAngelesCCoordinates,
    geodesic: false,
    strokeColor: "#f6be1d",
    strokeOpacity: 1.0,
    strokeWeight: 2,
  });
}

// Function to animate the camera along the flight path
function chargersCamera(map, index = 0) {
  if (index >= LosAngelesCCoordinates.length - 1) return;

  const start = LosAngelesCCoordinates[index];
  const end = LosAngelesCCoordinates[index + 1];
  const totalSteps = 600; // Number of steps for the animation
  const stepDuration = 1; // Time per step in milliseconds

  let currentStep = 0;

  function moveCamera() {
    if (currentStep >= totalSteps) {
      setTimeout(() => {
        chargersCamera(map, index + 1);
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

export { createChargersFlightPath, chargersCamera };
