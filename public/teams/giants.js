import stadiums from "../stadiums.js";

// Map stadiums to their respective team logos
const teamLogos = {
  NYG: "./images/giants.jpeg",
  MIN: "./images/vikings.jpeg",
  WSH: "./images/commanders.jpeg",
  CLE: "./images/browns.jpeg",
  DAL: "./images/cowboys.jpeg",
  SEA: "./images/seahawks.jpeg",
  CIN: "./images/bengals.jpeg",
  PHI: "./images/eagles.jpeg",
  PIT: "./images/steelers.jpeg",
  CAR: "./images/panthers.jpeg",
  TB: "./images/buccaneers.jpeg",
  NO: "./images/saints.jpeg",
  BAL: "./images/ravens.jpeg",
  ATL: "./images/falcons.jpeg",
  IND: "./images/colts.jpeg",
};

const schedule = [
  { week: 1, home: "NYG", away: "MIN" },
  { week: 2, home: "WSH", away: "NYG" },
  { week: 3, home: "CLE", away: "NYG" },
  { week: 4, home: "NYG", away: "DAL" },
  { week: 5, home: "SEA", away: "NYG" },
  { week: 6, home: "NYG", away: "CIN" },
  { week: 7, home: "NYG", away: "PHI" },
  { week: 8, home: "PIT", away: "NYG" },
  { week: 9, home: "NYG", away: "WSH" },
  { week: 10, home: "CAR", away: "NYG" },
  { week: 11, home: "NYG", away: "NYG" }, //BYE
  { week: 12, home: "NYG", away: "TB" },
  { week: 13, home: "DAL", away: "NYG" },
  { week: 14, home: "NYG", away: "NO" },
  { week: 15, home: "NYG", away: "BAL" },
  { week: 16, home: "ATL", away: "NYG" },
  { week: 17, home: "NYG", away: "IND" },
  { week: 18, home: "PHI", away: "NYG" },
];

const NewYorkGCoordinates = [
  stadiums.NYG,
  stadiums.WSH,
  stadiums.CLE,
  stadiums.NYG,
  stadiums.SEA,
  stadiums.NYG,
  stadiums.NYG,
  stadiums.PIT,
  stadiums.NYG,
  stadiums.GERMANY,
  stadiums.NYG, // BYE
  stadiums.NYG,
  stadiums.DAL,
  stadiums.NYG,
  stadiums.NYG,
  stadiums.ATL,
  stadiums.NYG,
  stadiums.PHI,
];

let animationFrameId = null;
let isAnimating = false;

function createGiantsFlightPath() {
  return new google.maps.Polyline({
    path: NewYorkGCoordinates,
    geodesic: false,
    strokeColor: "#073191",
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
function giantsCamera(map, index = 0) {
  const teamSelect = document.getElementById("team-select");

  // Disable the dropdown menu before the animation starts
  teamSelect.disabled = true;

  // Check if we have finished the entire flight path
  if (index >= NewYorkGCoordinates.length - 1) {
    // Update for the final week
    updateTeamLogos(NewYorkGCoordinates.length - 1);
    updateWeek(NewYorkGCoordinates.length - 1);

    // Re-enable the dropdown menu when the animation is complete
    teamSelect.disabled = false;
    return;
  }

  if (isAnimating) {
    cancelAnimationFrame(animationFrameId);
    isAnimating = false;
  }

  const start = NewYorkGCoordinates[index];
  const end = NewYorkGCoordinates[index + 1];

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
        giantsCamera(map, index + 1);
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

export { createGiantsFlightPath, giantsCamera };
