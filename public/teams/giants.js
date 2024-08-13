import stadiums from "../stadiums.js";

const NewYorkGCoordinates = [
  stadiums.NYG,
  stadiums.WSH,
  stadiums.CLE,
  stadiums.NYG,
  stadiums.SEA,
  stadiums.NYG,
  stadiums.NYG,
  stadiums.PIT,
  stadiums.NYG,
  stadiums.GERMANY,
  stadiums.NYG, // BYE
  stadiums.NYG,
  stadiums.DAL,
  stadiums.NYG,
  stadiums.NYG,
  stadiums.ATL,
  stadiums.NYG,
  stadiums.PHI,
];

function createGiantsFlightPath() {
  return new google.maps.Polyline({
    path: NewYorkGCoordinates,
    geodesic: false,
    strokeColor: "#073191",
    strokeOpacity: 1.0,
    strokeWeight: 2,
  });
}

export default createGiantsFlightPath;
