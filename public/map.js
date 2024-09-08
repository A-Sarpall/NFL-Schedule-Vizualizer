import stadiums from "./stadiums.js";
import {
  createCardinalsFlightPath,
  cardinalsCamera,
} from "./teams/cardinals.js";
import { createFalconsFlightPath, falconsCamera } from "./teams/falcons.js";
import { createRavensFlightPath, ravensCamera } from "./teams/ravens.js";
import { createBillsFlightPath, billsCamera } from "./teams/bills.js";
import { createPanthersFlightPath, panthersCamera } from "./teams/panthers.js";
import { createBearsFlightPath, bearsCamera } from "./teams/bears.js";
import { createBengalsFlightPath, bengalsCamera } from "./teams/bengals.js";
import { createBrownsFlightPath, brownsCamera } from "./teams/browns.js";
import { createCowboysFlightPath, cowboysCamera } from "./teams/cowboys.js";
import { createBroncosFlightPath, broncosCamera } from "./teams/broncos.js";
import { createLionsFlightPath, lionsCamera } from "./teams/lions.js";
import { createPackersFlightPath, packersCamera } from "./teams/packers.js";
import { createTexansFlightPath, texansCamera } from "./teams/texans.js";
import { createColtsFlightPath, coltsCamera } from "./teams/colts.js";
import { createJaguarsFlightPath, jaguarsCamera } from "./teams/jaguars.js";
import { createChiefsFlightPath, chiefsCamera } from "./teams/chiefs.js";
import { createChargersFlightPath, chargersCamera } from "./teams/chargers.js";
import { createRamsFlightPath, ramsCamera } from "./teams/rams.js";
import { createRaidersFlightPath, raidersCamera } from "./teams/raiders.js";
import { createDolphinsFlightPath, dolphinsCamera } from "./teams/dolphins.js";
import { createVikingsFlightPath, vikingsCamera } from "./teams/vikings.js";
import { createPatriotsFlightPath, patriotsCamera } from "./teams/patriots.js";
import { createSaintsFlightPath, saintsCamera } from "./teams/saints.js";
import { createGiantsFlightPath, giantsCamera } from "./teams/giants.js";
import { createJetsFlightPath, jetsCamera } from "./teams/jets.js";
import { createEaglesFlightPath, eaglesCamera } from "./teams/eagles.js";
import { createSteelersFlightPath, steelersCamera } from "./teams/steelers.js";
import {
  createSanFran49ersFlightPath,
  sanfran49ersCamera,
} from "./teams/sanfran49ers.js";
import { createSeahawksFlightPath, seahawksCamera } from "./teams/seahawks.js";
import {
  createBuccaneersFlightPath,
  buccaneersCamera,
} from "./teams/buccaneers.js";
import { createTitansFlightPath, titansCamera } from "./teams/titans.js";
import {
  createCommandersFlightPath,
  commandersCamera,
} from "./teams/commanders.js";

function loadGoogleMaps() {
  const apiKey = "AIzaSyDIGk3VO9K19xgxwV38DdP5AeJrAklNeBc"; // Replace with your actual API key
  const script = document.createElement("script");
  script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&loading=async&callback=initMap`;
  script.defer = true;
  document.head.appendChild(script);
}

loadGoogleMaps();
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
      cardinalsCamera(map);
    } else if (selection === "atlanta") {
      falconsFlightPath.setMap(map);
      falconsCamera(map);
    } else if (selection === "baltimore") {
      ravensFlightPath.setMap(map);
      ravensCamera(map);
    } else if (selection === "buffalo") {
      billsFlightPath.setMap(map);
      billsCamera(map);
    } else if (selection === "carolina") {
      panthersFlightPath.setMap(map);
      panthersCamera(map);
    } else if (selection === "chicago") {
      bearsFlightPath.setMap(map);
      bearsCamera(map);
    } else if (selection === "cincinnati") {
      bengalsFlightPath.setMap(map);
      bengalsCamera(map);
    } else if (selection === "cleveland") {
      brownsFlightPath.setMap(map);
      brownsCamera(map);
    } else if (selection === "dallas") {
      cowboysFlightPath.setMap(map);
      cowboysCamera(map);
    } else if (selection === "denver") {
      broncosFlightPath.setMap(map);
      broncosCamera(map);
    } else if (selection === "detroit") {
      lionsFlightPath.setMap(map);
      lionsCamera(map);
    } else if (selection === "green bay") {
      packersFlightPath.setMap(map);
      packersCamera(map);
    } else if (selection === "houston") {
      texansFlightPath.setMap(map);
      texansCamera(map);
    } else if (selection === "indianapolis") {
      coltsFlightPath.setMap(map);
      coltsCamera(map);
    } else if (selection === "jacksonville") {
      jaguarsFlightPath.setMap(map);
      jaguarsCamera(map);
    } else if (selection === "kansas city") {
      chiefsFlightPath.setMap(map);
      chiefsCamera(map);
    } else if (selection === "lac") {
      chargersFlightPath.setMap(map);
      chargersCamera(map);
    } else if (selection === "lar") {
      ramsFlightPath.setMap(map);
      ramsCamera(map);
    } else if (selection === "las vegas") {
      raidersFlightPath.setMap(map);
      raidersCamera(map);
    } else if (selection === "miami") {
      dolphinsFlightPath.setMap(map);
      dolphinsCamera(map);
    } else if (selection === "minnesota") {
      vikingsFlightPath.setMap(map);
      vikingsCamera(map);
    } else if (selection === "new england") {
      patriotsFlightPath.setMap(map);
      patriotsCamera(map);
    } else if (selection === "new orleans") {
      saintsFlightPath.setMap(map);
      saintsCamera(map);
    } else if (selection === "nyg") {
      giantsFlightPath.setMap(map);
      giantsCamera(map);
    } else if (selection === "nyj") {
      jetsFlightPath.setMap(map);
      jetsCamera(map);
    } else if (selection === "philadelphia") {
      eaglesFlightPath.setMap(map);
      eaglesCamera(map);
    } else if (selection === "pittsburgh") {
      steelersFlightPath.setMap(map);
      steelersCamera(map);
    } else if (selection === "san francisco") {
      sanfran49ersFlightPath.setMap(map);
      sanfran49ersCamera(map);
    } else if (selection === "seattle") {
      seahawksFlightPath.setMap(map);
      seahawksCamera(map);
    } else if (selection === "tampa bay") {
      buccaneersFlightPath.setMap(map);
      buccaneersCamera(map);
    } else if (selection === "tennessee") {
      titansFlightPath.setMap(map);
      titansCamera(map);
    } else if (selection === "washington") {
      commandersFlightPath.setMap(map);
      commandersCamera(map);
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
