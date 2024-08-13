import stadiums from "../stadiums.js";

const LosAngelesRCoordinates = [
  stadiums.DET,
  stadiums.ARI,
  stadiums.LAR,
  stadiums.CHI,
  stadiums.LAR,
  stadiums.LAR, // BYE
  stadiums.LAR,
  stadiums.LAR,
  stadiums.SEA,
  stadiums.LAR,
  stadiums.NE,
  stadiums.LAR,
  stadiums.NO,
  stadiums.LAR,
  stadiums.SF,
  stadiums.NYJ,
  stadiums.LAR,
  stadiums.LAR,
];

function createRamsFlightPath() {
  return new google.maps.Polyline({
    path: LosAngelesRCoordinates,
    geodesic: false,
    strokeColor: "#013594",
    strokeOpacity: 1.0,
    strokeWeight: 2,
  });
}

export default createRamsFlightPath;
