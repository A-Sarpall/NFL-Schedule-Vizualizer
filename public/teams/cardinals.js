import stadiums from "../stadiums.js";

const ArizonaCoordinates = [
  stadiums.BUF,
  stadiums.ARI,
  stadiums.ARI,
  stadiums.ARI,
  stadiums.SF,
  stadiums.GB,
  stadiums.ARI,
  stadiums.MIA,
  stadiums.ARI,
  stadiums.ARI,
  stadiums.ARI,
  stadiums.ARI, // BYE
  stadiums.SEA,
  stadiums.MIN,
  stadiums.ARI,
  stadiums.ARI,
  stadiums.CAR,
  stadiums.LAR,
  stadiums.ARI,
];

function createCardinalsFlightPath() {
  return new google.maps.Polyline({
    path: ArizonaCoordinates,
    geodesic: false,
    strokeColor: "#b1063a",
    strokeOpacity: 1.0,
    strokeWeight: 2,
  });
}

export default createCardinalsFlightPath;
