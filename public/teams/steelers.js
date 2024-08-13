import stadiums from "../stadiums.js";

const PittsburghCoordinates = [
  stadiums.ATL,
  stadiums.DEN,
  stadiums.PIT,
  stadiums.IND,
  stadiums.PIT,
  stadiums.LV,
  stadiums.PIT,
  stadiums.PIT,
  stadiums.PIT, // BYE
  stadiums.WSH,
  stadiums.PIT,
  stadiums.CLE,
  stadiums.CIN,
  stadiums.PIT,
  stadiums.PHI,
  stadiums.BAL,
  stadiums.PIT,
  stadiums.PIT,
];

function createSteelersFlightPath() {
  return new google.maps.Polyline({
    path: PittsburghCoordinates,
    geodesic: false,
    strokeColor: "#e7a81e",
    strokeOpacity: 1.0,
    strokeWeight: 2,
  });
}

export default createSteelersFlightPath;
