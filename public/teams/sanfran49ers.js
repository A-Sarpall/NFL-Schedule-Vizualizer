import stadiums from "../stadiums.js";

// Map stadiums to their respective team logos
const teamLogos = {
  SF: "./images/49ers.jpeg",
  NYJ: "./images/jets.jpeg",
  MIN: "./images/vikings.jpeg",
  LAR: "./images/rams.jpeg",
  NE: "./images/patriots.jpeg",
  ARI: "./images/cardinals.jpeg",
  SEA: "./images/seahawks.jpeg",
  KC: "./images/chiefs.jpeg",
  DAL: "./images/cowboys.jpeg",
  TB: "./images/buccaneers.jpeg",
  GB: "./images/packers.jpeg",
  BUF: "./images/bills.jpeg",
  CHI: "./images/bears.jpeg",
  MIA: "./images/dolphins.jpeg",
  DET: "./images/lions.jpeg",
};

const schedule = [
  { week: 1, home: "SF", away: "NYJ" },
  { week: 2, home: "MIN", away: "SF" },
  { week: 3, home: "LAR", away: "SF" },
  { week: 4, home: "SF", away: "NE" },
  { week: 5, home: "SF", away: "ARI" },
  { week: 6, home: "SEA", away: "SF" },
  { week: 7, home: "SF", away: "KC" },
  { week: 8, home: "SF", away: "DAL" },
  { week: 9, home: "SF", away: "SF" }, //BYE
  { week: 10, home: "TB", away: "SF" },
  { week: 11, home: "SF", away: "SEA" },
  { week: 12, home: "GB", away: "SF" },
  { week: 13, home: "BUF", away: "SF" },
  { week: 14, home: "SF", away: "CHI" },
  { week: 15, home: "SF", away: "LAR" },
  { week: 16, home: "MIA", away: "SF" },
  { week: 17, home: "SF", away: "DET" },
  { week: 18, home: "ARI", away: "SF" },
];

const SanFranciscoCoordinates = [
  stadiums.SF,
  stadiums.MIN,
  stadiums.LAR,
  stadiums.SF,
  stadiums.SF,
  stadiums.SEA,
  stadiums.SF,
  stadiums.SF,
  stadiums.SF, // BYE
  stadiums.TB,
  stadiums.SF,
  stadiums.GB,
  stadiums.BUF,
  stadiums.SF,
  stadiums.SF,
  stadiums.MIA,
  stadiums.SF,
  stadiums.ARI,
];

let animationFrameId = null;
let isAnimating = false;

function createSanFran49ersFlightPath() {
  return new google.maps.Polyline({
    path: SanFranciscoCoordinates,
    geodesic: false,
    strokeColor: "#af1f2d",
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
function sanfran49ersCamera(map, index = 0) {
  const teamSelect = document.getElementById("team-select");

  // Disable the dropdown menu before the animation starts
  teamSelect.disabled = true;

  // Check if we have finished the entire flight path
  if (index >= SanFranciscoCoordinates.length - 1) {
    // Update for the final week
    updateTeamLogos(SanFranciscoCoordinates.length - 1);
    updateWeek(SanFranciscoCoordinates.length - 1);

    // Re-enable the dropdown menu when the animation is complete
    teamSelect.disabled = false;
    return;
  }

  if (isAnimating) {
    cancelAnimationFrame(animationFrameId);
    isAnimating = false;
  }

  const start = SanFranciscoCoordinates[index];
  const end = SanFranciscoCoordinates[index + 1];

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
        sanfran49ersCamera(map, index + 1);
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

export { createSanFran49ersFlightPath, sanfran49ersCamera };
