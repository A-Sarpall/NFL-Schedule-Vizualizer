import stadiums from "../stadiums.js";

const teamLogos = {
  DEN: "./images/broncos.jpeg",
  SEA: "./images/seahawks.jpeg",
  PIT: "./images/steelers.jpeg",
  TB: "./images/buccaneers.jpeg",
  NYJ: "./images/jets.jpeg",
  LV: "./images/raiders.jpeg",
  LAC: "./images/chargers.jpeg",
  NO: "./images/saints.jpeg",
  CAR: "./images/panthers.jpeg",
  BAL: "./images/ravens.jpeg",
  KC: "./images/chiefs.jpeg",
  ATL: "./images/falcons.jpeg",
  CLE: "./images/browns.jpeg",
  IND: "./images/colts.jpeg",
  CIN: "./images/bengals.jpeg",
};

const schedule = [
  { week: 1, home: "SEA", away: "DEN" },
  { week: 2, home: "DEN", away: "PIT" },
  { week: 3, home: "TB", away: "DEN" },
  { week: 4, home: "NYJ", away: "DEN" },
  { week: 5, home: "DEN", away: "LV" },
  { week: 6, home: "DEN", away: "LAC" },
  { week: 7, home: "NO", away: "DEN" },
  { week: 8, home: "DEN", away: "CAR" },
  { week: 9, home: "BAL", away: "DEN" },
  { week: 10, home: "KC", away: "DEN" },
  { week: 11, home: "DEN", away: "ATL" },
  { week: 12, home: "LV", away: "DEN" },
  { week: 13, home: "DEN", away: "CLE" },
  { week: 14, home: "DEN", away: "DEN" }, //BYE
  { week: 15, home: "DEN", away: "IND" },
  { week: 16, home: "LAC", away: "DEN" },
  { week: 17, home: "CIN", away: "DEN" },
  { week: 18, home: "DEN", away: "KC" },
];

const DenverCoordinates = [
  stadiums.SEA,
  stadiums.DEN,
  stadiums.TB,
  stadiums.NYJ,
  stadiums.DEN,
  stadiums.DEN,
  stadiums.NO,
  stadiums.DEN,
  stadiums.BAL,
  stadiums.KC,
  stadiums.DEN,
  stadiums.LV,
  stadiums.DEN,
  stadiums.DEN, // BYE
  stadiums.DEN,
  stadiums.LAC,
  stadiums.CIN,
  stadiums.DEN,
];

function createBroncosFlightPath() {
  return new google.maps.Polyline({
    path: DenverCoordinates,
    geodesic: false,
    strokeColor: "#f44d14",
    strokeOpacity: 1.0,
    strokeWeight: 2,
  });
}

// Function to update the team logos based on the current week
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

  homeImg.src = teamLogos[homeTeam] || "./images/default_home.jpg";
  awayImg.src = teamLogos[awayTeam] || "./images/default_away.jpg";

  console.log(`Home Image Set To: ${homeImg.src}`);
  console.log(`Away Image Set To: ${awayImg.src}`);
}

// Function to update the week display
function updateWeek(weekIndex) {
  const weekElement = document.querySelector(".week h2");
  weekElement.textContent = `Week ${weekIndex + 1}`; // Weeks start from 1
}

// Function to animate the camera along the flight path
function broncosCamera(map, index = 0) {
  if (index >= DenverCoordinates.length) return;

  const start = DenverCoordinates[index];
  const end = DenverCoordinates[index + 1];
  const totalSteps = 300; // Number of steps for the animation
  const stepDuration = 1; // Time per step in milliseconds

  // Update team logos and the week based on the current index (week)
  updateTeamLogos(index);
  updateWeek(index);

  let currentStep = 0;

  function moveCamera() {
    if (currentStep >= totalSteps) {
      setTimeout(() => {
        broncosCamera(map, index + 1);
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

export { createBroncosFlightPath, broncosCamera };
