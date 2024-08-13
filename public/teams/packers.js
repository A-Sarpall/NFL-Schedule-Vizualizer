import stadiums from "../stadiums.js";

const GreenBayCoordinates = [
  stadiums.BRAZIL,
  stadiums.GB,
  stadiums.TEN,
  stadiums.GB,
  stadiums.LAR,
  stadiums.GB,
  stadiums.GB,
  stadiums.JAX,
  stadiums.GB,
  stadiums.GB, // BYE
  stadiums.CHI,
  stadiums.GB,
  stadiums.GB,
  stadiums.DET,
  stadiums.SEA,
  stadiums.GB,
  stadiums.MIN,
  stadiums.GB,
];

function createPackersFlightPath() {
  return new google.maps.Polyline({
    path: GreenBayCoordinates,
    geodesic: false,
    strokeColor: "#1c2e26",
    strokeOpacity: 1.0,
    strokeWeight: 2,
  });
}

export default createPackersFlightPath;
