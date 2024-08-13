import stadiums from "../stadiums.js";

const CincinnatiCoordinates = [
  stadiums.CIN,
  stadiums.KC,
  stadiums.CIN,
  stadiums.CAR,
  stadiums.CIN,
  stadiums.NYG,
  stadiums.CLE,
  stadiums.CIN,
  stadiums.CIN,
  stadiums.BAL,
  stadiums.LAC,
  stadiums.CIN, //BYE
  stadiums.CIN,
  stadiums.DAL,
  stadiums.TEN,
  stadiums.CIN,
  stadiums.CIN,
  stadiums.PIT,
];

function createBengalsFlightPath() {
  return new google.maps.Polyline({
    path: CincinnatiCoordinates,
    geodesic: false,
    strokeColor: "#ff2800",
    strokeOpacity: 1.0,
    strokeWeight: 2,
  });
}

export default createBengalsFlightPath;
