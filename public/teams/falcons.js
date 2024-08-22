import stadiums from "../stadiums.js";

const AtlantaCoordinates = [
  stadiums.ATL,
  stadiums.PHI,
  stadiums.ATL,
  stadiums.ATL,
  stadiums.ATL,
  stadiums.CAR,
  stadiums.ATL,
  stadiums.TB,
  stadiums.ATL,
  stadiums.NO,
  stadiums.DEN,
  stadiums.ATL, //BYE
  stadiums.ATL,
  stadiums.MIN,
  stadiums.LV,
  stadiums.ATL,
  stadiums.WSH,
  stadiums.ATL,
];

function createFalconsFlightPath() {
  return new google.maps.Polyline({
    path: AtlantaCoordinates,
    geodesic: false,
    strokeColor: "#bd0c19",
    strokeOpacity: 1.0,
    strokeWeight: 2,
  });
}

// Function to animate the camera along the flight path
function falconsCamera(map, index = 0) {
  if (index >= AtlantaCoordinates.length - 1) return;

  const start = AtlantaCoordinates[index];
  const end = AtlantaCoordinates[index + 1];
  const totalSteps = 600; // Number of steps for the animation
  const stepDuration = 1; // Time per step in milliseconds

  let currentStep = 0;

  function moveCamera() {
    if (currentStep >= totalSteps) {
      setTimeout(() => {
        falconsCamera(map, index + 1);
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

export { createFalconsFlightPath, falconsCamera };
