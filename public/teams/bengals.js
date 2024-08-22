import stadiums from "../stadiums.js";

const CincinnatiCoordinates = [
  stadiums.CIN,
  stadiums.KC,
  stadiums.CIN,
  stadiums.CAR,
  stadiums.CIN,
  stadiums.NYG,
  stadiums.CLE,
  stadiums.CIN,
  stadiums.CIN,
  stadiums.BAL,
  stadiums.LAC,
  stadiums.CIN, //BYE
  stadiums.CIN,
  stadiums.DAL,
  stadiums.TEN,
  stadiums.CIN,
  stadiums.CIN,
  stadiums.PIT,
];

function createBengalsFlightPath(map) {
  const flightPath = new google.maps.Polyline({
    path: CincinnatiCoordinates,
    geodesic: false,
    strokeColor: "#df3f00",
    strokeOpacity: 1.0,
    strokeWeight: 2,
  });

  flightPath.setMap(map);

  return flightPath;
}

// Function to animate the camera along the flight path
function bengalsCamera(map, index = 0) {
  if (index >= CincinnatiCoordinates.length - 1) return;

  const start = CincinnatiCoordinates[index];
  const end = CincinnatiCoordinates[index + 1];
  const totalSteps = 600; // Number of steps for the animation
  const stepDuration = 1; // Time per step in milliseconds

  let currentStep = 0;

  function moveCamera() {
    if (currentStep >= totalSteps) {
      setTimeout(() => {
        bengalsCamera(map, index + 1);
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

export { createBengalsFlightPath, bengalsCamera };
