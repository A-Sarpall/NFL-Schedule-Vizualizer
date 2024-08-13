import stadiums from "../stadiums.js";

const BaltimoreCoordinates = [
  stadiums.KC,
  stadiums.BAL,
  stadiums.DAL,
  stadiums.BAL,
  stadiums.CIN,
  stadiums.BAL,
  stadiums.TB,
  stadiums.CLE,
  stadiums.BAL,
  stadiums.BAL,
  stadiums.PIT,
  stadiums.LAC,
  stadiums.BAL,
  stadiums.BAL, // BYE
  stadiums.NYG,
  stadiums.BAL,
  stadiums.HOU,
  stadiums.BAL,
];

function createRavensFlightPath() {
  return new google.maps.Polyline({
    path: BaltimoreCoordinates,
    geodesic: false,
    strokeColor: "#24135f",
    strokeOpacity: 1.0,
    strokeWeight: 2,
  });
}

export default createRavensFlightPath;
