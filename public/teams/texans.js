import stadiums from "../stadiums.js";

const HoustonCoordinates = [
  stadiums.IND,
  stadiums.HOU,
  stadiums.MIN,
  stadiums.HOU,
  stadiums.HOU,
  stadiums.NE,
  stadiums.GB,
  stadiums.HOU,
  stadiums.NYJ,
  stadiums.HOU,
  stadiums.DAL,
  stadiums.HOU,
  stadiums.JAX,
  stadiums.HOU, //BYE
  stadiums.HOU,
  stadiums.HOU,
  stadiums.KC,
  stadiums.HOU,
  stadiums.TEN,
];

function createTexansFlightPath() {
  return new google.maps.Polyline({
    path: HoustonCoordinates,
    geodesic: false,
    strokeColor: "#06192e",
    strokeOpacity: 1.0,
    strokeWeight: 2,
  });
}

export default createTexansFlightPath;
