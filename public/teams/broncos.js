import stadiums from "../stadiums.js";

const DenverCoordinates = [
  stadiums.SEA,
  stadiums.DEN,
  stadiums.TB,
  stadiums.NYJ,
  stadiums.DEN,
  stadiums.DEN,
  stadiums.NO,
  stadiums.DEN,
  stadiums.BAL,
  stadiums.KC,
  stadiums.DEN,
  stadiums.LV,
  stadiums.DEN,
  stadiums.DEN, // BYE
  stadiums.DEN,
  stadiums.LAC,
  stadiums.CIN,
  stadiums.DEN,
];

function createBroncosFlightPath() {
  return new google.maps.Polyline({
    path: DenverCoordinates,
    geodesic: false,
    strokeColor: "#f44d14",
    strokeOpacity: 1.0,
    strokeWeight: 2,
  });
}

export default createBroncosFlightPath;
