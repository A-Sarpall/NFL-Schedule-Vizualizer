import stadiums from "../stadiums.js";

// Map stadiums to their respective team logos
const teamLogos = {
  TEN: "./images/titans.jpeg",
  CHI: "./images/bears.jpeg",
  NYJ: "./images/jets.jpeg",
  GB: "./images/packers.jpeg",
  MIA: "./images/dolphins.jpeg",
  IND: "./images/colts.jpeg",
  BUF: "./images/bills.jpeg",
  DET: "./images/lions.jpeg",
  NE: "./images/patriots.jpeg",
  LAC: "./images/chargers.jpeg",
  MIN: "./images/vikings.jpeg",
  HOU: "./images/texans.jpeg",
  WSH: "./images/commanders.jpeg",
  JAX: "./images/jaguars.jpeg",
  CIN: "./images/bengals.jpeg",
};

const schedule = [
  { week: 1, home: "CHI", away: "TEN" },
  { week: 2, home: "TEN", away: "NYJ" },
  { week: 3, home: "TEN", away: "GB" },
  { week: 4, home: "MIA", away: "TEN" },
  { week: 5, home: "TEN", away: "TEN" }, //BYE
  { week: 6, home: "TEN", away: "IND" },
  { week: 7, home: "BUF", away: "TEN" },
  { week: 8, home: "DET", away: "TEN" },
  { week: 9, home: "TEN", away: "NE" },
  { week: 10, home: "LAC", away: "TEN" },
  { week: 11, home: "TEN", away: "MIN" },
  { week: 12, home: "HOU", away: "TEN" },
  { week: 13, home: "WSH", away: "TEN" },
  { week: 14, home: "TEN", away: "JAX" },
  { week: 15, home: "TEN", away: "CIN" },
  { week: 16, home: "IND", away: "TEN" },
  { week: 17, home: "JAX", away: "TEN" },
  { week: 18, home: "TEN", away: "HOU" },
];

const TennesseeCoordinates = [
  stadiums.CHI,
  stadiums.TEN,
  stadiums.TEN,
  stadiums.MIA,
  stadiums.TEN, // BYE
  stadiums.TEN,
  stadiums.BUF,
  stadiums.DET,
  stadiums.TEN,
  stadiums.LAC,
  stadiums.TEN,
  stadiums.HOU,
  stadiums.WSH,
  stadiums.TEN,
  stadiums.TEN,
  stadiums.IND,
  stadiums.JAX,
  stadiums.TEN,
];

function createTitansFlightPath() {
  return new google.maps.Polyline({
    path: TennesseeCoordinates,
    geodesic: false,
    strokeColor: "#5185bc",
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
function titansCamera(map, index = 0) {
  if (index >= TennesseeCoordinates.length) return;

  const start = TennesseeCoordinates[index];
  const end = TennesseeCoordinates[index + 1];
  const totalSteps = 300; // Number of steps for the animation
  const stepDuration = 1; // Time per step in milliseconds

  updateTeamLogos(index);
  updateWeek(index);

  let currentStep = 0;

  function moveCamera() {
    if (currentStep >= totalSteps) {
      setTimeout(() => {
        titansCamera(map, index + 1);
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

export { createTitansFlightPath, titansCamera };
