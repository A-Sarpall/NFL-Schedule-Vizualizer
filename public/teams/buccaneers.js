import stadiums from "../stadiums.js";

const teamLogos = {
  TB: "./images/buccaneers.jpeg",
  WSH: "./images/commanders.jpeg",
  DET: "./images/lions.jpeg",
  DEN: "./images/broncos.jpeg",
  PHI: "./images/eagles.jpeg",
  ATL: "./images/falcons.jpeg",
  NO: "./images/saints.jpeg",
  BAL: "./images/ravens.jpeg",
  KC: "./images/chiefs.jpeg",
  SF: "./images/49ers.jpeg",
  NYG: "./images/giants.jpeg",
  CAR: "./images/panthers.jpeg",
  LV: "./images/raiders.jpeg",
  LAC: "./images/chargers.jpeg",
  DAL: "./images/cowboys.jpeg",
};

// Define the schedule for each week
const schedule = [
  { week: 1, home: "TB", away: "WSH" },
  { week: 2, home: "DET", away: "TB" },
  { week: 3, home: "TB", away: "DEN" },
  { week: 4, home: "TB", away: "PHI" },
  { week: 5, home: "ATL", away: "TB" },
  { week: 6, home: "NO", away: "TB" },
  { week: 7, home: "TB", away: "BAL" },
  { week: 8, home: "TB", away: "ATL" },
  { week: 9, home: "KC", away: "TB" },
  { week: 10, home: "TB", away: "SF" },
  { week: 11, home: "TB", away: "TB" }, //BYE
  { week: 12, home: "NYG", away: "TB" },
  { week: 13, home: "CAR", away: "TB" },
  { week: 14, home: "TB", away: "LV" },
  { week: 15, home: "LAC", away: "TB" },
  { week: 16, home: "DAL", away: "TB" },
  { week: 17, home: "TB", away: "CAR" },
  { week: 18, home: "TB", away: "NO" },
];

const TampaBayCoordinates = [
  stadiums.TB,
  stadiums.DET,
  stadiums.TB,
  stadiums.TB,
  stadiums.ATL,
  stadiums.NO,
  stadiums.TB,
  stadiums.TB,
  stadiums.KC,
  stadiums.TB,
  stadiums.TB, // BYE
  stadiums.NYG,
  stadiums.CAR,
  stadiums.TB,
  stadiums.LAC,
  stadiums.DAL,
  stadiums.TB,
  stadiums.TB,
];

function createBuccaneersFlightPath() {
  return new google.maps.Polyline({
    path: TampaBayCoordinates,
    geodesic: false,
    strokeColor: "#ce0d0a",
    strokeOpacity: 1.0,
    strokeWeight: 2,
  });
}

function updateTeamLogos(weekIndex) {
  const homeImg = document.getElementById("home-team-img");
  const awayImg = document.getElementById("away-team-img");

  const currentMatch = schedule[weekIndex];
  if (!currentMatch) {
    console.error("No match found for this week");
    return;
  }

  const homeTeam = currentMatch.home;
  const awayTeam = currentMatch.away;

  homeImg.src = teamLogos[homeTeam] || "./images/default_home.jpeg";
  awayImg.src = teamLogos[awayTeam] || "./images/default_away.jpeg";

  console.log(`Home Image Set To: ${homeImg.src}`);
  console.log(`Away Image Set To: ${awayImg.src}`);
}

// Function to update the week display
function updateWeek(weekIndex) {
  const weekElement = document.querySelector(".week h2");
  weekElement.textContent = `Week ${weekIndex + 1}`; // Weeks start from 1
}

// Function to animate the camera along the flight path
function buccaneersCamera(map, index = 0) {
  if (index >= TampaBayCoordinates.length) return;

  const start = TampaBayCoordinates[index];
  const end = TampaBayCoordinates[index + 1];
  const totalSteps = 300; // Number of steps for the animation
  const stepDuration = 1; // Time per step in milliseconds

  updateTeamLogos(index);
  updateWeek(index);

  let currentStep = 0;

  function moveCamera() {
    if (currentStep >= totalSteps) {
      setTimeout(() => {
        buccaneersCamera(map, index + 1);
      }, 1000); // Wait before moving to the next point
      return;
    }

    const lat = start.lat + (end.lat - start.lat) * (currentStep / totalSteps);
    const lng = start.lng + (end.lng - start.lng) * (currentStep / totalSteps);

    map.panTo(new google.maps.LatLng(lat, lng));
    map.setZoom(7); // Adjust the zoom level as needed

    currentStep++;
    setTimeout(moveCamera, stepDuration);
  }

  moveCamera();
}

export { createBuccaneersFlightPath, buccaneersCamera };
