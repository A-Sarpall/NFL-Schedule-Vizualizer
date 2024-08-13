import stadiums from "./stadiums.js";
import createCardinalsFlightPath from "./teams/cardinals.js";
import createFalconsFlightPath from "./teams/falcons.js";
import createRavensFlightPath from "./teams/ravens.js";
import createBillsFlightPath from "./teams/bills.js";
import createPanthersFlightPath from "./teams/panthers.js";
import createBearsFlightPath from "./teams/bears.js";
import createBengalsFlightPath from "./teams/bengals.js";
import createBrownsFlightPath from "./teams/browns.js";
import createCowboysFlightPath from "./teams/cowboys.js";
import createBroncosFlightPath from "./teams/broncos.js";
import createLionsFlightPath from "./teams/lions.js";
import createPackersFlightPath from "./teams/packers.js";
import createTexansFlightPath from "./teams/texans.js";
import createColtsFlightPath from "./teams/colts.js";
import createJaguarsFlightPath from "./teams/jaguars.js";
import createChiefsFlightPath from "./teams/chiefs.js";
import createChargersFlightPath from "./teams/chargers.js";
import createRamsFlightPath from "./teams/rams.js";
import createRaidersFlightPath from "./teams/raiders.js";
import createDolphinsFlightPath from "./teams/dolphins.js";
import createVikingsFlightPath from "./teams/vikings.js";
import createPatriotsFlightPath from "./teams/patriots.js";
import createSaintsFlightPath from "./teams/saints.js";
import createGiantsFlightPath from "./teams/giants.js";
import createJetsFlightPath from "./teams/jets.js";
import createEaglesFlightPath from "./teams/eagles.js";
import createSteelersFlightPath from "./teams/steelers.js";
import createSanFran49ersFlightPath from "./teams/sanfran49ers.js";
import createSeahawksFlightPath from "./teams/seahawks.js";
import createBuccaneersFlightPath from "./teams/buccaneers.js";
import createTitansFlightPath from "./teams/titans.js";
import createCommandersFlightPath from "./teams/commanders.js";

console.log(stadiums);
function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 3,
    center: { lat: 12.349664016667157, lng: -71.31211192239618 },
    mapTypeId: "terrain",
    restriction: {
      latLngBounds: {
        north: 85,
        south: -85,
        west: -290,
        east: 80,
      },
      strictBounds: true,
    },
  });

  const cardinalsFlightPath = createCardinalsFlightPath();
  const falconsFlightPath = createFalconsFlightPath();
  const ravensFlightPath = createRavensFlightPath();
  const billsFlightPath = createBillsFlightPath();
  const panthersFlightPath = createPanthersFlightPath();
  const bearsFlightPath = createBearsFlightPath();
  const bengalsFlightPath = createBengalsFlightPath();
  const brownsFlightPath = createBrownsFlightPath();
  const cowboysFlightPath = createCowboysFlightPath();
  const broncosFlightPath = createBroncosFlightPath();
  const lionsFlightPath = createLionsFlightPath();
  const packersFlightPath = createPackersFlightPath();
  const texansFlightPath = createTexansFlightPath();
  const coltsFlightPath = createColtsFlightPath();
  const jaguarsFlightPath = createJaguarsFlightPath();
  const chiefsFlightPath = createChiefsFlightPath();
  const chargersFlightPath = createChargersFlightPath();
  const ramsFlightPath = createRamsFlightPath();
  const raidersFlightPath = createRaidersFlightPath();
  const dolphinsFlightPath = createDolphinsFlightPath();
  const vikingsFlightPath = createVikingsFlightPath();
  const patriotsFlightPath = createPatriotsFlightPath();
  const saintsFlightPath = createSaintsFlightPath();
  const giantsFlightPath = createGiantsFlightPath();
  const jetsFlightPath = createJetsFlightPath();
  const eaglesFlightPath = createEaglesFlightPath();
  const steelersFlightPath = createSteelersFlightPath();
  const sanfran49ersFlightPath = createSanFran49ersFlightPath();
  const seahawksFlightPath = createSeahawksFlightPath();
  const buccaneersFlightPath = createBuccaneersFlightPath();
  const titansFlightPath = createTitansFlightPath();
  const commandersFlightPath = createCommandersFlightPath();

  // Function to set map based on dropdown selection
  function setMapBasedOnSelection(selection) {
    cardinalsFlightPath.setMap(null);
    falconsFlightPath.setMap(null);
    ravensFlightPath.setMap(null);
    billsFlightPath.setMap(null);
    panthersFlightPath.setMap(null);
    bearsFlightPath.setMap(null);
    bengalsFlightPath.setMap(null);
    brownsFlightPath.setMap(null);
    cowboysFlightPath.setMap(null);
    broncosFlightPath.setMap(null);
    lionsFlightPath.setMap(null);
    packersFlightPath.setMap(null);
    texansFlightPath.setMap(null);
    coltsFlightPath.setMap(null);
    jaguarsFlightPath.setMap(null);
    chiefsFlightPath.setMap(null);
    chargersFlightPath.setMap(null);
    ramsFlightPath.setMap(null);
    raidersFlightPath.setMap(null);
    dolphinsFlightPath.setMap(null);
    vikingsFlightPath.setMap(null);
    patriotsFlightPath.setMap(null);
    saintsFlightPath.setMap(null);
    giantsFlightPath.setMap(null);
    jetsFlightPath.setMap(null);
    eaglesFlightPath.setMap(null);
    steelersFlightPath.setMap(null);
    sanfran49ersFlightPath.setMap(null);
    seahawksFlightPath.setMap(null);
    buccaneersFlightPath.setMap(null);
    titansFlightPath.setMap(null);
    commandersFlightPath.setMap(null);

    if (selection === "arizona") {
      cardinalsFlightPath.setMap(map);
    } else if (selection === "atlanta") {
      falconsFlightPath.setMap(map);
    } else if (selection === "baltimore") {
      ravensFlightPath.setMap(map);
    } else if (selection === "buffalo") {
      billsFlightPath.setMap(map);
    } else if (selection === "carolina") {
      panthersFlightPath.setMap(map);
    } else if (selection === "chicago") {
      bearsFlightPath.setMap(map);
    } else if (selection === "cincinnati") {
      bengalsFlightPath.setMap(map);
    } else if (selection === "cleveland") {
      brownsFlightPath.setMap(map);
    } else if (selection === "dallas") {
      cowboysFlightPath.setMap(map);
    } else if (selection === "denver") {
      broncosFlightPath.setMap(map);
    } else if (selection === "detroit") {
      lionsFlightPath.setMap(map);
    } else if (selection === "green bay") {
      packersFlightPath.setMap(map);
    } else if (selection === "houston") {
      texansFlightPath.setMap(map);
    } else if (selection === "indianapolis") {
      coltsFlightPath.setMap(map);
    } else if (selection === "jacksonville") {
      jaguarsFlightPath.setMap(map);
    } else if (selection === "kansas city") {
      chiefsFlightPath.setMap(map);
    } else if (selection === "lac") {
      chargersFlightPath.setMap(map);
    } else if (selection === "lar") {
      ramsFlightPath.setMap(map);
    } else if (selection === "las vegas") {
      raidersFlightPath.setMap(map);
    } else if (selection === "miami") {
      dolphinsFlightPath.setMap(map);
    } else if (selection === "minnesota") {
      vikingsFlightPath.setMap(map);
    } else if (selection === "new england") {
      patriotsFlightPath.setMap(map);
    } else if (selection === "new orleans") {
      saintsFlightPath.setMap(map);
    } else if (selection === "nyg") {
      giantsFlightPath.setMap(map);
    } else if (selection === "nyj") {
      jetsFlightPath.setMap(map);
    } else if (selection === "philadelphia") {
      eaglesFlightPath.setMap(map);
    } else if (selection === "pittsburgh") {
      steelersFlightPath.setMap(map);
    } else if (selection === "san francisco") {
      sanfran49ersFlightPath.setMap(map);
    } else if (selection === "seattle") {
      seahawksFlightPath.setMap(map);
    } else if (selection === "tampa bay") {
      buccaneersFlightPath.setMap(map);
    } else if (selection === "tennessee") {
      titansFlightPath.setMap(map);
    } else if (selection === "washington") {
      commandersFlightPath.setMap(map);
    }
  }

  // Add event listener to dropdown menu
  document
    .getElementById("team-select")
    .addEventListener("change", function () {
      setMapBasedOnSelection(this.value);
    });

  // Initially set no polylines
  setMapBasedOnSelection("none");
}

window.initMap = initMap;
