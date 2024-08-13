import stadiums from "../stadiums.js";

const NewEnglandCoordinates = [
  stadiums.CIN,
  stadiums.NE,
  stadiums.NYJ,
  stadiums.SF,
  stadiums.NE,
  stadiums.NE,
  stadiums.UKWEM,
  stadiums.NE,
  stadiums.TEN,
  stadiums.CHI,
  stadiums.LAR,
  stadiums.MIA,
  stadiums.NE,
  stadiums.NE, // BYE
  stadiums.ARI,
  stadiums.BUF,
  stadiums.NE,
  stadiums.NE,
];

function createPatriotsFlightPath() {
  return new google.maps.Polyline({
    path: NewEnglandCoordinates,
    geodesic: false,
    strokeColor: "#0d254d",
    strokeOpacity: 1.0,
    strokeWeight: 2,
  });
}

export default createPatriotsFlightPath;
