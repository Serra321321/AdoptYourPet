//Status van je huisdier
let hunger = 100;
let happiness = 100;
let health = 100;

//Timers voor de status
let hungerInterval, happinessInterval, healthInterval;

//Miauw geluidje 
const miauwSound = new Audio('sound/miauw.mp3');

document.getElementById('play-sound').addEventListener('click', () => {
  miauwSound.currentTime = 0;
  miauwSound.play();
});

// Geluidje toevoegen ChatGPT
// Prompt: Hoe kan ik doormiddel van op een knop klikken een geluidje laten afspelen op het start scherm?

//Huisdieren images
const petStyles = {
  Flip: { img: 'dog.png', bg: '#F2D0C7' },
  Flop: { img: 'cat.png', bg: '#9fdaff' }
};

//Voedselmenu
const foodOptions = [
  { name: "Hamburger", hunger: 20 },
  { name: "Vlees", hunger: 25 },
  { name: "Vis", hunger: 15 },
  { name: "Snoep", hunger: 5 }
];

document.addEventListener("DOMContentLoaded", () => {
  // Verberg het kies-scherm
  document.getElementById("choose-screen").classList.add("hidden");
});

//Functies

// Toon het kies-scherm na start
function showChooseScreen() {
  document.getElementById("start-screen").classList.add("hidden");
  document.getElementById("choose-screen").classList.remove("hidden");
}

// Kies een huisdier en sla op in local storage voor later
function choosePet(pet) {
  document.getElementById("chosen-pet-text").textContent = "Je hebt " + pet + " gekozen!";
  document.getElementById("start-tamagotchi-button").classList.remove("hidden");
  localStorage.setItem("chosenPet", pet);
}

//ChatGPT
// Prompt: Hoe kan ik op een makkelijke manier de keuze van een huisdier opslaan zodat ik deze later kan gebruiken op een andere pagina of in een ander scherm?
// https://blog.logrocket.com/localstorage-javascript-complete-guide/  


// Start het Tamagotchi spel
function startTamagotchi() {
  document.getElementById("choose-screen").classList.add("hidden");
  document.getElementById("tamagotchi-screen").classList.remove("hidden");

//Pak  huisdier uit local storage
  const chosenPet = localStorage.getItem("chosenPet");
  document.getElementById("pet-name").textContent = chosenPet;

//Juiste kleur achtergrond bij gekozen huisdier
  const style = petStyles[chosenPet];
  document.getElementById("pet-image-container").innerHTML = `<img src="images/${style.img}" alt="${chosenPet}" class="pet-image">`;
  document.body.style.backgroundColor = style.bg;

  // Start het langzaam afnemen van stats
  hungerInterval = setInterval(() => updateStat('hunger', -1), 300);
  happinessInterval = setInterval(() => updateStat('happiness', -1), 500);
  healthInterval = setInterval(() => updateStat('health', -1), 2000);

  updateBars();
}

// Update een statistiek en check spelstatus
function updateStat(stat, amount) {
  if (stat === 'hunger') hunger = Math.min(Math.max(hunger + amount, 0), 100);
  if (stat === 'happiness') happiness = Math.min(Math.max(happiness + amount, 0), 100);
  if (stat === 'health') health = Math.min(Math.max(health + amount, 0), 100);

  updateBars();
  checkGameOver();
}

// Update de visuele balken
function updateBars() {
  document.getElementById("hunger-bar").style.width = hunger + "%";
  document.getElementById("happiness-bar").style.width = happiness + "%";
  document.getElementById("health-bar").style.width = health + "%";
}

// Check of het spel voorbij is (een stat op 0)
function checkGameOver() {
  if (hunger === 0) {
    showGameOver("Je huisdier had te veel honger en liep weg 😢");
  } else if (happiness === 0) {
    showGameOver("Je huisdier was te verdrietig en liep weg 😢");
  } else if (health === 0) {
    showGameOver("Je huisdier voelde zich te ziek en liep weg 😢");
  }
}

function showGameOver(message) {
  clearInterval(hungerInterval);
  clearInterval(happinessInterval);
  clearInterval(healthInterval);

  document.getElementById("message").textContent = message;
  document.getElementById("message").classList.remove("hidden");
  document.getElementById("restart-button").classList.remove("hidden");
}

// Toon voedselkeuze menu
function feedPet() {
  document.getElementById("food-menu").classList.remove("hidden");
}

// Kies voedsel uit het menu
function chooseFood(index) {
  const food = foodOptions[index];
  updateStat('hunger', food.hunger);
  document.getElementById("food-menu").classList.add("hidden");
  showHungerIncrease("+" + food.hunger);
}

// Toon animatie van honger toename
function showHungerIncrease(amount) {
  const hungerIncrease = document.getElementById("hunger-increase");
  hungerIncrease.textContent = amount;
  hungerIncrease.style.top = "50%";
  hungerIncrease.style.left = "50%";

  hungerIncrease.classList.remove("hunger-animation", "hidden");
  // Trigger herstart animatie
  void hungerIncrease.offsetWidth;
  hungerIncrease.classList.add("hunger-animation");

  setTimeout(() => {
    hungerIncrease.classList.add("hidden");
    hungerIncrease.classList.remove("hunger-animation");
  }, 2100);
}

// Speel met huisdier (verhoog geluk)
function playWithPet() {
  updateStat('happiness', 10);
}

// Laat huisdier naar buiten (geluk word max)
function letPetOutside() {
  updateStat('happiness', 100 - happiness);
}

// Geef medicijn (verhoog gezondheid)
function giveMedicine() {
  updateStat('health', 20);
}

// Update de balken
function updateBars() {
  document.getElementById("hunger-bar").style.width = hunger + "%";
  document.getElementById("happiness-bar").style.width = happiness + "%";
  document.getElementById("health-bar").style.width = health + "%";
}

//Functie opm spel restarten
function restartGame() {
  // Reset stats
  hunger = 100;
  happiness = 100;
  health = 100;

  // Verberg melding en knop
  document.getElementById("message").classList.add("hidden");
  document.getElementById("restart-button").classList.add("hidden");

  // Start de interval timers opnieuw
  hungerInterval = setInterval(() => updateStat('hunger', -1), 300);
  happinessInterval = setInterval(() => updateStat('happiness', -1), 500);
  healthInterval = setInterval(() => updateStat('health', -1), 2000);

  updateBars();
}



