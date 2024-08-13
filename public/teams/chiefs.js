import stadiums from "../stadiums.js";

const KansasCityCoordinates = [
  stadiums.KC,
  stadiums.KC,
  stadiums.ATL,
  stadiums.LAC,
  stadiums.KC,
  stadiums.KC, // BYE
  stadiums.SF,
  stadiums.LV,
  stadiums.KC,
  stadiums.KC,
  stadiums.BUF,
  stadiums.CAR,
  stadiums.KC,
  stadiums.KC,
  stadiums.CLE,
  stadiums.KC,
  stadiums.PIT,
  stadiums.DEN,
];

function createChiefsFlightPath() {
  return new google.maps.Polyline({
    path: KansasCityCoordinates,
    geodesic: false,
    strokeColor: "#c9243f",
    strokeOpacity: 1.0,
    strokeWeight: 2,
  });
}

export default createChiefsFlightPath;
