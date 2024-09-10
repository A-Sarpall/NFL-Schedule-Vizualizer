import stadiums from "../stadiums.js";

// Map stadiums to their respective team logos
const teamLogos = {
  NO: "./images/saints.jpeg",
  CAR: "./images/panthers.jpeg",
  DAL: "./images/cowboys.jpeg",
  PHI: "./images/eagles.jpeg",
  ATL: "./images/falcons.jpeg",
  KC: "./images/chiefs.jpeg",
  TB: "./images/buccaneers.jpeg",
  DEN: "./images/broncos.jpeg",
  LAC: "./images/chargers.jpeg",
  CLE: "./images/browns.jpeg",
  LAR: "./images/rams.jpeg",
  NYG: "./images/giants.jpeg",
  WSH: "./images/commanders.jpeg",
  GB: "./images/packers.jpeg",
  LV: "./images/raiders.jpeg",
};

const schedule = [
  { week: 1, home: "NO", away: "CAR" },
  { week: 2, home: "DAL", away: "NO" },
  { week: 3, home: "NO", away: "PHI" },
  { week: 4, home: "ATL", away: "NO" },
  { week: 5, home: "KC", away: "NO" },
  { week: 6, home: "NO", away: "TB" },
  { week: 7, home: "NO", away: "DEN" },
  { week: 8, home: "LAC", away: "NO" },
  { week: 9, home: "CAR", away: "NO" },
  { week: 10, home: "NO", away: "ATL" },
  { week: 11, home: "NO", away: "CLE" },
  { week: 12, home: "NO", away: "NO" }, //BYE
  { week: 13, home: "NO", away: "LAR" },
  { week: 14, home: "NYG", away: "NO" },
  { week: 15, home: "NO", away: "WSH" },
  { week: 16, home: "GB", away: "NO" },
  { week: 17, home: "NO", away: "LV" },
  { week: 18, home: "TB", away: "NO" },
];

const NewOrleansCoordinates = [
  stadiums.NO,
  stadiums.DAL,
  stadiums.NO,
  stadiums.ATL,
  stadiums.KC,
  stadiums.NO,
  stadiums.NO,
  stadiums.LAC,
  stadiums.CAR,
  stadiums.NO,
  stadiums.NO,
  stadiums.NO, // BYE
  stadiums.NO,
  stadiums.NYG,
  stadiums.NO,
  stadiums.GB,
  stadiums.NO,
  stadiums.TB,
];

let animationFrameId = null;
let isAnimating = false;

function createSaintsFlightPath() {
  return new google.maps.Polyline({
    path: NewOrleansCoordinates,
    geodesic: false,
    strokeColor: "#ccb788",
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
function saintsCamera(map, index = 0) {
  const teamSelect = document.getElementById("team-select");

  // Disable the dropdown menu before the animation starts
  teamSelect.disabled = true;

  // Check if we have finished the entire flight path
  if (index >= NewOrleansCoordinates.length - 1) {
    // Update for the final week
    updateTeamLogos(NewOrleansCoordinates.length - 1);
    updateWeek(NewOrleansCoordinates.length - 1);

    // Re-enable the dropdown menu when the animation is complete
    teamSelect.disabled = false;
    return;
  }

  if (isAnimating) {
    cancelAnimationFrame(animationFrameId);
    isAnimating = false;
  }

  const start = NewOrleansCoordinates[index];
  const end = NewOrleansCoordinates[index + 1];

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
        saintsCamera(map, index + 1);
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

export { createSaintsFlightPath, saintsCamera };
