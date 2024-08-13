import stadiums from "../stadiums.js";

const LasVegasCoordinates = [
  stadiums.LAC,
  stadiums.BAL,
  stadiums.LV,
  stadiums.LV,
  stadiums.DEN,
  stadiums.LV,
  stadiums.LAR,
  stadiums.LV,
  stadiums.CIN,
  stadiums.LV, // BYE
  stadiums.MIA,
  stadiums.LV,
  stadiums.KC,
  stadiums.TB,
  stadiums.LV,
  stadiums.LV,
  stadiums.NO,
  stadiums.LV,
];

function createRaidersFlightPath() {
  return new google.maps.Polyline({
    path: LasVegasCoordinates,
    geodesic: false,
    strokeColor: "#000000",
    strokeOpacity: 1.0,
    strokeWeight: 2,
  });
}

export default createRaidersFlightPath;
