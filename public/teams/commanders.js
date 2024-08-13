import stadiums from "../stadiums.js";

const WashingtonCoordinates = [
  stadiums.TB,
  stadiums.WSH,
  stadiums.CIN,
  stadiums.ARI,
  stadiums.WSH,
  stadiums.BAL,
  stadiums.WSH,
  stadiums.WSH,
  stadiums.NYG,
  stadiums.WSH,
  stadiums.PHI,
  stadiums.WSH,
  stadiums.WSH,
  stadiums.WSH, // BYE
  stadiums.NO,
  stadiums.WSH,
  stadiums.WSH,
  stadiums.DAL,
];

function createCommandersFlightPath() {
  return new google.maps.Polyline({
    path: WashingtonCoordinates,
    geodesic: false,
    strokeColor: "#5a1514",
    strokeOpacity: 1.0,
    strokeWeight: 2,
  });
}

export default createCommandersFlightPath;
