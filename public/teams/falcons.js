import stadiums from "../stadiums.js";

const AtlantaCoordinates = [
  stadiums.ATL,
  stadiums.PHI,
  stadiums.ATL,
  stadiums.ATL,
  stadiums.ATL,
  stadiums.CAR,
  stadiums.ATL,
  stadiums.TB,
  stadiums.ATL,
  stadiums.NO,
  stadiums.DEN,
  stadiums.ATL, //BYE
  stadiums.ATL,
  stadiums.MIN,
  stadiums.LV,
  stadiums.ATL,
  stadiums.WSH,
  stadiums.ATL,
];

function createFalconsFlightPath() {
  return new google.maps.Polyline({
    path: AtlantaCoordinates,
    geodesic: false,
    strokeColor: "#bd0c19",
    strokeOpacity: 1.0,
    strokeWeight: 2,
  });
}

export default createFalconsFlightPath;
