import stadiums from "../stadiums.js";

const DallasCoordinates = [
  stadiums.CLE,
  stadiums.DAL,
  stadiums.DAL,
  stadiums.NYG,
  stadiums.PIT,
  stadiums.DAL,
  stadiums.DAL, //BYE
  stadiums.SF,
  stadiums.ATL,
  stadiums.DAL,
  stadiums.DAL,
  stadiums.WSH,
  stadiums.DAL,
  stadiums.DAL,
  stadiums.CAR,
  stadiums.DAL,
  stadiums.PHI,
  stadiums.DAL,
];

function createCowboysFlightPath() {
  return new google.maps.Polyline({
    path: DallasCoordinates,
    geodesic: false,
    strokeColor: "#002a5b",
    strokeOpacity: 1.0,
    strokeWeight: 2,
  });
}

export default createCowboysFlightPath;
