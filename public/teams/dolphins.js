import stadiums from "../stadiums.js";

const MiamiCoordinates = [
  stadiums.MIA,
  stadiums.MIA,
  stadiums.SEA,
  stadiums.MIA,
  stadiums.NE,
  stadiums.MIA, // BYE
  stadiums.IND,
  stadiums.MIA,
  stadiums.BUF,
  stadiums.LAR,
  stadiums.MIA,
  stadiums.MIA,
  stadiums.GB,
  stadiums.MIA,
  stadiums.HOU,
  stadiums.MIA,
  stadiums.CLE,
  stadiums.NYJ,
];

function createDolphinsFlightPath() {
  return new google.maps.Polyline({
    path: MiamiCoordinates,
    geodesic: false,
    strokeColor: "#008c95",
    strokeOpacity: 1.0,
    strokeWeight: 2,
  });
}

export default createDolphinsFlightPath;
