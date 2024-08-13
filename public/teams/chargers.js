import stadiums from "../stadiums.js";

const LosAngelesCCoordinates = [
  stadiums.LAC,
  stadiums.CAR,
  stadiums.PIT,
  stadiums.LAC,
  stadiums.LAC, // BYE
  stadiums.DEN,
  stadiums.ARI,
  stadiums.LAC,
  stadiums.CLE,
  stadiums.LAC,
  stadiums.LAC,
  stadiums.LAC,
  stadiums.ATL,
  stadiums.KC,
  stadiums.LAC,
  stadiums.LAC,
  stadiums.NE,
  stadiums.LV,
];

function createChargersFlightPath() {
  return new google.maps.Polyline({
    path: LosAngelesCCoordinates,
    geodesic: false,
    strokeColor: "#f6be1d",
    strokeOpacity: 1.0,
    strokeWeight: 2,
  });
}

export default createChargersFlightPath;
