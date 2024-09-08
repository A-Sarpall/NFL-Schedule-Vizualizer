import stadiums from "../stadiums.js";

// Map stadiums to their respective team logos
const teamLogos = {
  HOU: "./images/texans.jpeg",
  IND: "./images/colts.jpeg",
  CHI: "./images/bears.jpeg",
  MIN: "./images/vikings.jpeg",
  JAX: "./images/jaguars.jpeg",
  BUF: "./images/bills.jpeg",
  NE: "./images/patriots.jpeg",
  GB: "./images/packers.jpeg",
  NYJ: "./images/jets.jpeg",
  DET: "./images/lions.jpeg",
  DAL: "./images/cowboys.jpeg",
  TEN: "./images/titans.jpeg",
  MIA: "./images/dolphins.jpeg",
  KC: "./images/chiefs.jpeg",
  BAL: "./images/ravens.jpeg",
};

const schedule = [
  { week: 1, home: "IND", away: "HOU" },
  { week: 2, home: "HOU", away: "CHI" },
  { week: 3, home: "MIN", away: "HOU" },
  { week: 4, home: "HOU", away: "JAX" },
  { week: 5, home: "HOU", away: "BUF" },
  { week: 6, home: "NE", away: "HOU" },
  { week: 7, home: "GB", away: "HOU" },
  { week: 8, home: "HOU", away: "IND" },
  { week: 9, home: "NYJ", away: "HOU" },
  { week: 10, home: "HOU", away: "DET" },
  { week: 11, home: "DAL", away: "HOU" },
  { week: 12, home: "HOU", away: "TEN" },
  { week: 13, home: "JAX", away: "HOU" },
  { week: 14, home: "HOU", away: "HOU" }, //BYE
  { week: 15, home: "HOU", away: "MIA" },
  { week: 16, home: "KC", away: "HOU" },
  { week: 17, home: "HOU", away: "BAL" },
  { week: 18, home: "TEN", away: "HOU" },
];

const HoustonCoordinates = [
  stadiums.IND,
  stadiums.HOU,
  stadiums.MIN,
  stadiums.HOU,
  stadiums.HOU,
  stadiums.NE,
  stadiums.GB,
  stadiums.HOU,
  stadiums.NYJ,
  stadiums.HOU,
  stadiums.DAL,
  stadiums.HOU,
  stadiums.JAX,
  stadiums.HOU, //BYE
  stadiums.HOU,
  stadiums.HOU,
  stadiums.KC,
  stadiums.HOU,
  stadiums.TEN,
];

function createTexansFlightPath() {
  return new google.maps.Polyline({
    path: HoustonCoordinates,
    geodesic: false,
    strokeColor: "#06192e",
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
function texansCamera(map, index = 0) {
  if (index >= HoustonCoordinates.length) return;

  const start = HoustonCoordinates[index];
  const end = HoustonCoordinates[index + 1];
  const totalSteps = 300; // Number of steps for the animation
  const stepDuration = 1; // Time per step in milliseconds

  updateTeamLogos(index);
  updateWeek(index);

  let currentStep = 0;

  function moveCamera() {
    if (currentStep >= totalSteps) {
      setTimeout(() => {
        texansCamera(map, index + 1);
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

export { createTexansFlightPath, texansCamera };
