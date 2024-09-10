import stadiums from "../stadiums.js";

// Map stadiums to their respective team logos
const teamLogos = {
  BAL: "./images/ravens.jpeg",
  KC: "./images/chiefs.jpeg",
  LV: "./images/raiders.jpeg",
  DAL: "./images/cowboys.jpeg",
  BUF: "./images/bills.jpeg",
  CIN: "./images/bengals.jpeg",
  WSH: "./images/commanders.jpeg",
  TB: "./images/buccaneers.jpeg",
  CLE: "./images/browns.jpeg",
  DEN: "./images/broncos.jpeg",
  PIT: "./images/steelers.jpeg",
  LAC: "./images/chargers.jpeg",
  PHI: "./images/eagles.jpeg",
  NYG: "./images/giants.jpeg",
  HOU: "./images/texans.jpeg",
};

const schedule = [
  { week: 1, home: "KC", away: "BAL" },
  { week: 2, home: "BAL", away: "LV" },
  { week: 3, home: "DAL", away: "BAL" },
  { week: 4, home: "BAL", away: "BUF" },
  { week: 5, home: "CIN", away: "BAL" },
  { week: 6, home: "BAL", away: "WSH" },
  { week: 7, home: "TB", away: "BAL" },
  { week: 8, home: "CLE", away: "BAL" },
  { week: 9, home: "BAL", away: "DEN" },
  { week: 10, home: "BAL", away: "CIN" },
  { week: 11, home: "PIT", away: "BAL" },
  { week: 12, home: "LAC", away: "BAL" },
  { week: 13, home: "BAL", away: "PHI" },
  { week: 14, home: "BAL", away: "BAL" }, //BYE
  { week: 15, home: "NYG", away: "BAL" },
  { week: 16, home: "BAL", away: "PIT" },
  { week: 17, home: "HOU", away: "BAL" },
  { week: 18, home: "BAL", away: "CLE" },
];

const BaltimoreCoordinates = [
  stadiums.KC,
  stadiums.BAL,
  stadiums.DAL,
  stadiums.BAL,
  stadiums.CIN,
  stadiums.BAL,
  stadiums.TB,
  stadiums.CLE,
  stadiums.BAL,
  stadiums.BAL,
  stadiums.PIT,
  stadiums.LAC,
  stadiums.BAL,
  stadiums.BAL, // BYE
  stadiums.NYG,
  stadiums.BAL,
  stadiums.HOU,
  stadiums.BAL,
];

let animationFrameId = null;
let isAnimating = false;

function createRavensFlightPath() {
  return new google.maps.Polyline({
    path: BaltimoreCoordinates,
    geodesic: false,
    strokeColor: "#24135f",
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
function ravensCamera(map, index = 0) {
  const teamSelect = document.getElementById("team-select");

  // Disable the dropdown menu before the animation starts
  teamSelect.disabled = true;

  // Check if we have finished the entire flight path
  if (index >= BaltimoreCoordinates.length - 1) {
    // Update for the final week
    updateTeamLogos(BaltimoreCoordinates.length - 1);
    updateWeek(BaltimoreCoordinates.length - 1);

    // Re-enable the dropdown menu when the animation is complete
    teamSelect.disabled = false;
    return;
  }

  if (isAnimating) {
    cancelAnimationFrame(animationFrameId);
    isAnimating = false;
  }

  const start = BaltimoreCoordinates[index];
  const end = BaltimoreCoordinates[index + 1];

  // Check if 'start' and 'end' are defined
  if (!start || !end) {
    console.error(
      `Invalid coordinates at index ${index}. Start or end coordinate is undefined.`
    );
    teamSelect.disabled = false; // Re-enable dropdown even if an error occurs
    return;
  }

  const totalSteps = 100; // Number of steps for the animation

  // Update team logos and the week based on the current index (week)
  updateTeamLogos(index);
  updateWeek(index);

  let currentStep = 0;

  function moveCamera() {
    if (currentStep >= totalSteps) {
      // Move to the next segment after the current one finishes
      setTimeout(() => {
        ravensCamera(map, index + 1);
      }, 1000); // Wait before moving to the next point
      return;
    }

    const lat = start.lat + (end.lat - start.lat) * (currentStep / totalSteps);
    const lng = start.lng + (end.lng - start.lng) * (currentStep / totalSteps);

    map.panTo(new google.maps.LatLng(lat, lng));
    map.setZoom(7); // Adjust the zoom level as needed

    currentStep++;
    animationFrameId = requestAnimationFrame(moveCamera);
    isAnimating = true;
  }

  moveCamera();
}

export { createRavensFlightPath, ravensCamera };
