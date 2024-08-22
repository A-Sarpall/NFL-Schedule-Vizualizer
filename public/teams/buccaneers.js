import stadiums from "../stadiums.js";

const TampaBayCoordinates = [
  stadiums.TB,
  stadiums.DET,
  stadiums.TB,
  stadiums.TB,
  stadiums.ATL,
  stadiums.NO,
  stadiums.TB,
  stadiums.TB,
  stadiums.KC,
  stadiums.TB,
  stadiums.TB, // BYE
  stadiums.NYG,
  stadiums.CAR,
  stadiums.TB,
  stadiums.LAC,
  stadiums.DAL,
  stadiums.TB,
  stadiums.TB,
];

function createBuccaneersFlightPath() {
  return new google.maps.Polyline({
    path: TampaBayCoordinates,
    geodesic: false,
    strokeColor: "#ce0d0a",
    strokeOpacity: 1.0,
    strokeWeight: 2,
  });
}

// Function to animate the camera along the flight path
function buccaneersCamera(map, index = 0) {
  if (index >= TampaBayCoordinates.length - 1) return;

  const start = TampaBayCoordinates[index];
  const end = TampaBayCoordinates[index + 1];
  const totalSteps = 600; // Number of steps for the animation
  const stepDuration = 1; // Time per step in milliseconds

  let currentStep = 0;

  function moveCamera() {
    if (currentStep >= totalSteps) {
      setTimeout(() => {
        buccaneersCamera(map, index + 1);
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

export { createBuccaneersFlightPath, buccaneersCamera };
