import stadiums from "../stadiums.js";

const ClevelandCoordinates = [
  stadiums.CLE,
  stadiums.JAX,
  stadiums.CLE,
  stadiums.LV,
  stadiums.WSH,
  stadiums.PHI,
  stadiums.CLE,
  stadiums.CLE,
  stadiums.CLE,
  stadiums.CLE, //BYE
  stadiums.NO,
  stadiums.CLE,
  stadiums.DEN,
  stadiums.PIT,
  stadiums.CLE,
  stadiums.CIN,
  stadiums.CLE,
  stadiums.BAL,
];

function createBrownsFlightPath() {
  return new google.maps.Polyline({
    path: ClevelandCoordinates,
    geodesic: false,
    strokeColor: "#e34911",
    strokeOpacity: 1.0,
    strokeWeight: 2,
  });
}

export default createBrownsFlightPath;
