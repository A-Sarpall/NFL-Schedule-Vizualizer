import stadiums from "../stadiums.js";

const DetroitCoordinates = [
  stadiums.DET,
  stadiums.DET,
  stadiums.ARI,
  stadiums.DET,
  stadiums.DET, // BYE
  stadiums.DAL,
  stadiums.MIN,
  stadiums.DET,
  stadiums.GB,
  stadiums.HOU,
  stadiums.DET,
  stadiums.IND,
  stadiums.DET,
  stadiums.DET,
  stadiums.DET,
  stadiums.CHI,
  stadiums.SF,
  stadiums.DET,
];

function createLionsFlightPath() {
  return new google.maps.Polyline({
    path: DetroitCoordinates,
    geodesic: false,
    strokeColor: "#006db0",
    strokeOpacity: 1.0,
    strokeWeight: 2,
  });
}

export default createLionsFlightPath;
