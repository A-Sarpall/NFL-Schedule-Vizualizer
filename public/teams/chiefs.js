import stadiums from "../stadiums.js";

// Map stadiums to their respective team logos
const teamLogos = {
  KC: "./images/chiefs.jpeg",
  BAL: "./images/ravens.jpeg",
  CIN: "./images/bengals.jpeg",
  ATL: "./images/falcons.jpeg",
  LAC: "./images/chargers.jpeg",
  NO: "./images/saints.jpeg",
  SF: "./images/49ers.jpeg",
  LV: "./images/raiders.jpeg",
  TB: "./images/buccaneers.jpeg",
  DEN: "./images/broncos.jpeg",
  BUF: "./images/bills.jpeg",
  CAR: "./images/panthers.jpeg",
  CLE: "./images/browns.jpeg",
  HOU: "./images/texans.jpeg",
  PIT: "./images/steelers.jpeg",
};

// Define the schedule for each week
const schedule = [
  { week: 1, home: "KC", away: "BAL" },
  { week: 2, home: "KC", away: "CIN" },
  { week: 3, home: "ATL", away: "KC" },
  { week: 4, home: "LAC", away: "KC" },
  { week: 5, home: "KC", away: "NO" },
  { week: 6, home: "KC", away: "KC" }, //BYE
  { week: 7, home: "SF", away: "KC" },
  { week: 8, home: "LV", away: "KC" },
  { week: 9, home: "KC", away: "TB" },
  { week: 10, home: "KC", away: "DEN" },
  { week: 11, home: "BUF", away: "KC" },
  { week: 12, home: "CAR", away: "KC" },
  { week: 13, home: "KC", away: "LV" },
  { week: 14, home: "KC", away: "LAC" },
  { week: 15, home: "CLE", away: "KC" },
  { week: 16, home: "KC", away: "HOU" },
  { week: 17, home: "PIT", away: "KC" },
  { week: 18, home: "DEN", away: "KC" },
];

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
function chiefsCamera(map, index = 0) {
  if (index >= KansasCityCoordinates.length) return;

  const start = KansasCityCoordinates[index];
  const end = KansasCityCoordinates[index + 1];
  const totalSteps = 600; // Number of steps for the animation
  const stepDuration = 1; // Time per step in milliseconds

  updateTeamLogos(index);
  updateWeek(index);

  let currentStep = 0;

  function moveCamera() {
    if (currentStep >= totalSteps) {
      setTimeout(() => {
        chiefsCamera(map, index + 1);
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

export { createChiefsFlightPath, chiefsCamera };
