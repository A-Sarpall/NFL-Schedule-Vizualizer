import stadiums from "../stadiums.js";

const TampaBayCoordinates = [
  stadiums.TB,
  stadiums.DET,
  stadiums.TB,
  stadiums.TB,
  stadiums.ATL,
  stadiums.NO,
  stadiums.TB,
  stadiums.TB,
  stadiums.KC,
  stadiums.TB,
  stadiums.TB, // BYE
  stadiums.NYG,
  stadiums.CAR,
  stadiums.TB,
  stadiums.LAC,
  stadiums.DAL,
  stadiums.TB,
  stadiums.TB,
];

function createBuccaneersFlightPath() {
  return new google.maps.Polyline({
    path: TampaBayCoordinates,
    geodesic: false,
    strokeColor: "#ce0d0a",
    strokeOpacity: 1.0,
    strokeWeight: 2,
  });
}

export default createBuccaneersFlightPath;
