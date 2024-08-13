import stadiums from "../stadiums.js";

const SanFranciscoCoordinates = [
  stadiums.SF,
  stadiums.MIN,
  stadiums.LAR,
  stadiums.SF,
  stadiums.SF,
  stadiums.SEA,
  stadiums.SF,
  stadiums.SF,
  stadiums.SF, // BYE
  stadiums.TB,
  stadiums.SF,
  stadiums.GB,
  stadiums.BUF,
  stadiums.SF,
  stadiums.SF,
  stadiums.MIA,
  stadiums.SF,
  stadiums.ARI,
];

function createSanFran49ersFlightPath() {
  return new google.maps.Polyline({
    path: SanFranciscoCoordinates,
    geodesic: false,
    strokeColor: "#af1f2d",
    strokeOpacity: 1.0,
    strokeWeight: 2,
  });
}

export default createSanFran49ersFlightPath;
