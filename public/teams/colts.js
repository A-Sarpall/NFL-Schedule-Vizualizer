import stadiums from "../stadiums.js";

const IndianapolisCoordinates = [
  stadiums.IND,
  stadiums.GB,
  stadiums.IND,
  stadiums.IND,
  stadiums.JAX,
  stadiums.TEN,
  stadiums.IND,
  stadiums.HOU,
  stadiums.MIN,
  stadiums.IND,
  stadiums.NYJ,
  stadiums.IND,
  stadiums.NE,
  stadiums.IND, // BYE
  stadiums.DEN,
  stadiums.IND,
  stadiums.NYG,
  stadiums.IND,
];

function createColtsFlightPath() {
  return new google.maps.Polyline({
    path: IndianapolisCoordinates,
    geodesic: false,
    strokeColor: "#003b7b",
    strokeOpacity: 1.0,
    strokeWeight: 2,
  });
}

export default createColtsFlightPath;
