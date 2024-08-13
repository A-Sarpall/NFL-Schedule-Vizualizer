import stadiums from "../stadiums.js";

const JacksonvilleCoordinates = [
  stadiums.MIA,
  stadiums.JAX,
  stadiums.BUF,
  stadiums.HOU,
  stadiums.JAX,
  stadiums.UKTOT,
  stadiums.UKWEM,
  stadiums.JAX,
  stadiums.PHI,
  stadiums.JAX,
  stadiums.DET,
  stadiums.JAX, // BYE
  stadiums.JAX,
  stadiums.TEN,
  stadiums.JAX,
  stadiums.LV,
  stadiums.JAX,
  stadiums.IND,
];

function createJaguarsFlightPath() {
  return new google.maps.Polyline({
    path: JacksonvilleCoordinates,
    geodesic: false,
    strokeColor: "#ce9d1d",
    strokeOpacity: 1.0,
    strokeWeight: 2,
  });
}

export default createJaguarsFlightPath;
