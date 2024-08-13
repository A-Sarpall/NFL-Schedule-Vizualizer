import stadiums from "../stadiums.js";

const BuffaloCoordinates = [
  stadiums.BUF,
  stadiums.MIA,
  stadiums.BUF,
  stadiums.BAL,
  stadiums.HOU,
  stadiums.NYJ,
  stadiums.BUF,
  stadiums.SEA,
  stadiums.BUF,
  stadiums.IND,
  stadiums.BUF,
  stadiums.BUF, // BYE
  stadiums.BUF,
  stadiums.LAR,
  stadiums.DET,
  stadiums.BUF,
  stadiums.BUF,
  stadiums.NE,
];

function createBillsFlightPath() {
  return new google.maps.Polyline({
    path: BuffaloCoordinates,
    geodesic: false,
    strokeColor: "#0066b3",
    strokeOpacity: 1.0,
    strokeWeight: 2,
  });
}

export default createBillsFlightPath;
