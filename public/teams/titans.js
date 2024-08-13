import stadiums from "../stadiums.js";

const TennesseeCoordinates = [
  stadiums.CHI,
  stadiums.TEN,
  stadiums.TEN,
  stadiums.MIA,
  stadiums.TEN, // BYE
  stadiums.TEN,
  stadiums.BUF,
  stadiums.DET,
  stadiums.TEN,
  stadiums.LAC,
  stadiums.TEN,
  stadiums.HOU,
  stadiums.WSH,
  stadiums.TEN,
  stadiums.TEN,
  stadiums.IND,
  stadiums.JAX,
  stadiums.TEN,
];

function createTitansFlightPath() {
  return new google.maps.Polyline({
    path: TennesseeCoordinates,
    geodesic: false,
    strokeColor: "#5185bc",
    strokeOpacity: 1.0,
    strokeWeight: 2,
  });
}

export default createTitansFlightPath;
