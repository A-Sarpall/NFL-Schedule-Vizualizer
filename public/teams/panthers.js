import stadiums from "../stadiums.js";

const CarolinaCoordinates = [
  stadiums.NO,
  stadiums.CAR,
  stadiums.LV,
  stadiums.CAR,
  stadiums.CHI,
  stadiums.CAR,
  stadiums.WSH,
  stadiums.DEN,
  stadiums.CAR,
  stadiums.GERMANY,
  stadiums.CAR, //BYE
  stadiums.CAR,
  stadiums.CAR,
  stadiums.PHI,
  stadiums.CAR,
  stadiums.CAR,
  stadiums.TB,
  stadiums.ATL,
];

function createPanthersFlightPath() {
  return new google.maps.Polyline({
    path: CarolinaCoordinates,
    geodesic: false,
    strokeColor: "#0085ca",
    strokeOpacity: 1.0,
    strokeWeight: 2,
  });
}

export default createPanthersFlightPath;
