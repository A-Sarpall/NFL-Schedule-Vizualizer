import stadiums from "../stadiums.js";

const SeattleCoordinates = [
  stadiums.SEA,
  stadiums.NE,
  stadiums.SEA,
  stadiums.DET,
  stadiums.SEA,
  stadiums.SEA,
  stadiums.ATL,
  stadiums.SEA,
  stadiums.SEA,
  stadiums.SEA, // BYE
  stadiums.SF,
  stadiums.SEA,
  stadiums.NYJ,
  stadiums.ARI,
  stadiums.SEA,
  stadiums.SEA,
  stadiums.CHI,
  stadiums.LAR,
];

function createSeahawksFlightPath() {
  return new google.maps.Polyline({
    path: SeattleCoordinates,
    geodesic: false,
    strokeColor: "#65b628",
    strokeOpacity: 1.0,
    strokeWeight: 2,
  });
}

export default createSeahawksFlightPath;
