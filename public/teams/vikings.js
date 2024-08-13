import stadiums from "../stadiums.js";

const MinnesotaCoordinates = [
  stadiums.NYG,
  stadiums.MIN,
  stadiums.MIN,
  stadiums.GB,
  stadiums.UKTOT,
  stadiums.MIN, // BYE
  stadiums.MIN,
  stadiums.LAR,
  stadiums.MIN,
  stadiums.JAX,
  stadiums.TEN,
  stadiums.CHI,
  stadiums.MIN,
  stadiums.MIN,
  stadiums.MIN,
  stadiums.SEA,
  stadiums.MIN,
  stadiums.DET,
];

function createVikingsFlightPath() {
  return new google.maps.Polyline({
    path: MinnesotaCoordinates,
    geodesic: false,
    strokeColor: "#4f2681",
    strokeOpacity: 1.0,
    strokeWeight: 2,
  });
}

export default createVikingsFlightPath;
