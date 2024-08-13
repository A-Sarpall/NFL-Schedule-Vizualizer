import stadiums from "../stadiums.js";

const NewOrleansCoordinates = [
  stadiums.NO,
  stadiums.DAL,
  stadiums.NO,
  stadiums.ATL,
  stadiums.KC,
  stadiums.NO,
  stadiums.NO,
  stadiums.LAC,
  stadiums.CAR,
  stadiums.NO,
  stadiums.NO,
  stadiums.NO, // BYE
  stadiums.NO,
  stadiums.NYG,
  stadiums.NO,
  stadiums.GB,
  stadiums.NO,
  stadiums.TB,
];

function createSaintsFlightPath() {
  return new google.maps.Polyline({
    path: NewOrleansCoordinates,
    geodesic: false,
    strokeColor: "#ccb788",
    strokeOpacity: 1.0,
    strokeWeight: 2,
  });
}

export default createSaintsFlightPath;
