import stadiums from "../stadiums.js";

const PhiladelphiaCoordinates = [
  stadiums.BRAZIL,
  stadiums.PHI,
  stadiums.NO,
  stadiums.TB,
  stadiums.PHI, //BYE
  stadiums.PHI,
  stadiums.NYG,
  stadiums.CIN,
  stadiums.PHI,
  stadiums.DAL,
  stadiums.PHI,
  stadiums.LAR,
  stadiums.BAL,
  stadiums.PHI,
  stadiums.PHI,
  stadiums.WSH,
  stadiums.PHI,
  stadiums.PHI,
];

function createEaglesFlightPath() {
  return new google.maps.Polyline({
    path: PhiladelphiaCoordinates,
    geodesic: false,
    strokeColor: "#004d56",
    strokeOpacity: 1.0,
    strokeWeight: 2,
  });
}

export default createEaglesFlightPath;
