import stadiums from "../stadiums.js";

const NewYorkJCoordinates = [
  stadiums.SF,
  stadiums.TEN,
  stadiums.NYJ,
  stadiums.NYJ,
  stadiums.UKTOT,
  stadiums.NYJ,
  stadiums.PIT,
  stadiums.NE,
  stadiums.NYJ,
  stadiums.ARI,
  stadiums.NYJ,
  stadiums.NYJ, // BYE
  stadiums.NYJ,
  stadiums.MIA,
  stadiums.JAX,
  stadiums.NYJ,
  stadiums.BUF,
  stadiums.NYJ,
];

function createJetsFlightPath() {
  return new google.maps.Polyline({
    path: NewYorkJCoordinates,
    geodesic: false,
    strokeColor: "#0c371c",
    strokeOpacity: 1.0,
    strokeWeight: 2,
  });
}

export default createJetsFlightPath;
