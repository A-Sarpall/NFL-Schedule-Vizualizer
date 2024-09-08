import stadiums from "../stadiums.js";

// Map stadiums to their respective team logos
const teamLogos = {
  DAL: "./images/cowboys.jpeg",
  CLE: "./images/browns.jpeg",
  NO: "./images/saints.jpeg",
  BAL: "./images/ravens.jpeg",
  NYG: "./images/giants.jpeg",
  PIT: "./images/steelers.jpeg",
  DET: "./images/lions.jpeg",
  SF: "./images/49ers.jpeg",
  ATL: "./images/falcons.jpeg",
  PHI: "./images/eagles.jpeg",
  HOU: "./images/texans.jpeg",
  WSH: "./images/commanders.jpeg",
  CIN: "./images/bengals.jpeg",
  CAR: "./images/panthers.jpeg",
  TB: "./images/buccaneers.jpeg",
};
// Define the schedule for each week
const schedule = [
  { week: 1, home: "CLE", away: "DAL" },
  { week: 2, home: "DAL", away: "NO" },
  { week: 3, home: "DAL", away: "BAL" },
  { week: 4, home: "NYG", away: "DAL" },
  { week: 5, home: "PIT", away: "DAL" },
  { week: 6, home: "DAL", away: "DET" },
  { week: 7, home: "DAL", away: "DAL" }, //BYE
  { week: 8, home: "SF", away: "DAL" },
  { week: 9, home: "ATL", away: "DAL" },
  { week: 10, home: "DAL", away: "PHI" },
  { week: 11, home: "DAL", away: "HOU" },
  { week: 12, home: "WSH", away: "DAL" },
  { week: 13, home: "DAL", away: "NYG" },
  { week: 14, home: "DAL", away: "CIN" },
  { week: 15, home: "CAR", away: "DAL" },
  { week: 16, home: "DAL", away: "TB" },
  { week: 17, home: "PHI", away: "DAL" },
  { week: 18, home: "DAL", away: "WSH" },
];

const DallasCoordinates = [
  stadiums.CLE,
  stadiums.DAL,
  stadiums.DAL,
  stadiums.NYG,
  stadiums.PIT,
  stadiums.DAL,
  stadiums.DAL, //BYE
  stadiums.SF,
  stadiums.ATL,
  stadiums.DAL,
  stadiums.DAL,
  stadiums.WSH,
  stadiums.DAL,
  stadiums.DAL,
  stadiums.CAR,
  stadiums.DAL,
  stadiums.PHI,
  stadiums.DAL,
];

function createCowboysFlightPath() {
  return new google.maps.Polyline({
    path: DallasCoordinates,
    geodesic: false,
    strokeColor: "#002a5b",
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
function cowboysCamera(map, index = 0) {
  if (index >= DallasCoordinates.length) return;

  const start = DallasCoordinates[index];
  const end = DallasCoordinates[index + 1];
  const totalSteps = 300; // Number of steps for the animation
  const stepDuration = 1; // Time per step in milliseconds

  updateTeamLogos(index);
  updateWeek(index);

  let currentStep = 0;

  function moveCamera() {
    if (currentStep >= totalSteps) {
      setTimeout(() => {
        cowboysCamera(map, index + 1);
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

export { createCowboysFlightPath, cowboysCamera };
