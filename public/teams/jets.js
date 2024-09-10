import stadiums from "../stadiums.js";
// Map stadiums to their respective team logos
const teamLogos = {
  NYJ: "./images/jets.jpeg",
  SF: "./images/49ers.jpeg",
  TEN: "./images/titans.jpeg",
  NE: "./images/patriots.jpeg",
  DEN: "./images/broncos.jpeg",
  MIN: "./images/vikings.jpeg",
  BUF: "./images/bills.jpeg",
  PIT: "./images/steelers.jpeg",
  HOU: "./images/texans.jpeg",
  ARI: "./images/cardinals.jpeg",
  IND: "./images/colts.jpeg",
  SEA: "./images/seahawks.jpeg",
  MIA: "./images/dolphins.jpeg",
  JAX: "./images/jaguars.jpeg",
  LAR: "./images/rams.jpeg",
};

const schedule = [
  { week: 1, home: "SF", away: "NYJ" },
  { week: 2, home: "TEN", away: "NYJ" },
  { week: 3, home: "NYJ", away: "NE" },
  { week: 4, home: "NYJ", away: "DEN" },
  { week: 5, home: "MIN", away: "NYJ" },
  { week: 6, home: "NYJ", away: "BUF" },
  { week: 7, home: "PIT", away: "NYJ" },
  { week: 8, home: "NE", away: "NYJ" },
  { week: 9, home: "NYJ", away: "HOU" },
  { week: 10, home: "ARI", away: "NYJ" },
  { week: 11, home: "NYJ", away: "IND" },
  { week: 12, home: "NYJ", away: "NYJ" }, //BYE
  { week: 13, home: "NYJ", away: "SEA" },
  { week: 14, home: "MIA", away: "NYJ" },
  { week: 15, home: "JAX", away: "NYJ" },
  { week: 16, home: "NYJ", away: "LAR" },
  { week: 17, home: "BUF", away: "NYJ" },
  { week: 18, home: "NYJ", away: "MIA" },
];

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

let animationFrameId = null;
let isAnimating = false;

function createJetsFlightPath() {
  return new google.maps.Polyline({
    path: NewYorkJCoordinates,
    geodesic: false,
    strokeColor: "#0c371c",
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
function jetsCamera(map, index = 0) {
  const teamSelect = document.getElementById("team-select");

  // Disable the dropdown menu before the animation starts
  teamSelect.disabled = true;

  // Check if we have finished the entire flight path
  if (index >= NewYorkJCoordinates.length - 1) {
    // Update for the final week
    updateTeamLogos(NewYorkJCoordinates.length - 1);
    updateWeek(NewYorkJCoordinates.length - 1);

    // Re-enable the dropdown menu when the animation is complete
    teamSelect.disabled = false;
    return;
  }

  if (isAnimating) {
    cancelAnimationFrame(animationFrameId);
    isAnimating = false;
  }

  const start = NewYorkJCoordinates[index];
  const end = NewYorkJCoordinates[index + 1];

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
        jetsCamera(map, index + 1);
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

export { createJetsFlightPath, jetsCamera };
