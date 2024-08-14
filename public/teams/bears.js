import stadiums from "../stadiums.js";

const ChicagoCoordinates = [
  stadiums.CHI,
  stadiums.HOU,
  stadiums.IND,
  stadiums.CHI,
  stadiums.CHI,
  stadiums.UKTOT,
  stadiums.CHI, //BYE
  stadiums.WSH,
  stadiums.ARI,
  stadiums.CHI,
  stadiums.CHI,
  stadiums.CHI,
  stadiums.DET,
  stadiums.SF,
  stadiums.MIN,
  stadiums.CHI,
  stadiums.CHI,
  stadiums.GB,
];

function createBearsFlightPath() {
  return new google.maps.Polyline({
    path: ChicagoCoordinates,
    geodesic: false,
    strokeColor: "#df3f00",
    strokeOpacity: 1.0,
    strokeWeight: 2,
  });
}

export default createBearsFlightPath;
