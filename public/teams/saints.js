import stadiums from "../stadiums.js";

const NewOrleansCoordinates = [
  stadiums.NO,
  stadiums.DAL,
  stadiums.NO,
  stadiums.ATL,
  stadiums.KC,
  stadiums.NO,
  stadiums.NO,
  stadiums.LAC,
  stadiums.CAR,
  stadiums.NO,
  stadiums.NO,
  stadiums.NO, // BYE
  stadiums.NO,
  stadiums.NYG,
  stadiums.NO,
  stadiums.GB,
  stadiums.NO,
  stadiums.TB,
];

function createSaintsFlightPath() {
  return new google.maps.Polyline({
    path: NewOrleansCoordinates,
    geodesic: false,
    strokeColor: "#ccb788",
    strokeOpacity: 1.0,
    strokeWeight: 2,
  });
}

// Function to animate the camera along the flight path
function saintsCamera(map, index = 0) {
  if (index >= NewOrleansCoordinates.length - 1) return;

  const start = NewOrleansCoordinates[index];
  const end = NewOrleansCoordinates[index + 1];
  const totalSteps = 600; // Number of steps for the animation
  const stepDuration = 1; // Time per step in milliseconds

  let currentStep = 0;

  function moveCamera() {
    if (currentStep >= totalSteps) {
      setTimeout(() => {
        saintsCamera(map, index + 1);
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

export { createSaintsFlightPath, saintsCamera };
