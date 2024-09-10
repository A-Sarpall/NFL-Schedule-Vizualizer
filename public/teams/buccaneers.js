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

let animationFrameId = null;
let isAnimating = false;

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
  const teamSelect = document.getElementById("team-select");

  // Disable the dropdown menu before the animation starts
  teamSelect.disabled = true;

  // Check if we have finished the entire flight path
  if (index >= TampaBayCoordinates.length - 1) {
    // Update for the final week
    updateTeamLogos(TampaBayCoordinates.length - 1);
    updateWeek(TampaBayCoordinates.length - 1);

    // Re-enable the dropdown menu when the animation is complete
    teamSelect.disabled = false;
    return;
  }

  if (isAnimating) {
    cancelAnimationFrame(animationFrameId);
    isAnimating = false;
  }

  const start = TampaBayCoordinates[index];
  const end = TampaBayCoordinates[index + 1];

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
        buccaneersCamera(map, index + 1);
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

export { createBuccaneersFlightPath, buccaneersCamera };
