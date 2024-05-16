let bot = new RiveScript();

const brains = ["brain/subs.rive", "brain/brain.rive"];

bot.loadFile(brains).then(botReady).catch(botNotReady);

const message_container = document.querySelector(".messages");

const form = document.querySelector("form");

const input_box = document.querySelector("input");

const video = document.getElementById('starting-video');
const video2 = document.getElementById('explosion-meme');
video.volume = 0.8;
const videoContainer = document.getElementById('video-container');
const videoContainer2 = document.getElementById('video-container-2');
const websiteContainer = document.getElementById('website-container');

// Ensures starting video is removed and chat appears.
video.addEventListener('ended', () => {
  videoContainer.remove();
  websiteContainer.classList.add('visible');
})

form.addEventListener("submit", (e) => {
  e.preventDefault();
  selfReply(input_box.value);
  input_box.value = "";
  input_box.focus();
});

function botReply(message) {
  message_container.innerHTML += `<div class="bot">${message}</div>`;
}

function selfReply(message) {
  message_container.innerHTML += `<div class="self">${message}</div>`;

  bot
    .reply("local-user", message)
    .then(function (reply) {
      botReply(reply);
    })
    .then(function () {
      message_container.lastElementChild.scrollIntoView();
    });
}

function botReady() {
  bot.sortReplies();
}

function botNotReady(err) {
  console.log("Uh oh, something bad happened behind the scenes, friend. Reload the page!", err);
}

/// Countdown Code ///

let totalSeconds = 300;
let secondsToAdd = 60
let secondsToSubtract = 60
let timerInterval;
let subtractionFlag = false;

function countdown() {
  timerInterval = setInterval(() => {
      if (totalSeconds <= 0) {
          clearInterval(timerInterval);
          console.log("Hope you like my explosive gift!");
          websiteContainer.remove()
          videoContainer2.classList.remove("hidden");
          video2.muted = false
          video2.play()
      } else {
          const minutes = Math.floor(totalSeconds / 60);
          const seconds = totalSeconds % 60;
          updateTimerDisplay(minutes, seconds);
          totalSeconds--;
      }
  }, 1000); // Countdown every 1 second (1000 milliseconds)
}

function addSeconds(secondsToAdd) {
  totalSeconds += secondsToAdd;
  updateTimerDisplay(Math.floor(totalSeconds / 60), totalSeconds % 60);
}

function subtractSeconds(secondsToSubtract) {
  totalSeconds -= secondsToSubtract;
  if (totalSeconds < 0) {
      totalSeconds = 0;
  }
  updateTimerDisplay(Math.floor(totalSeconds / 60), totalSeconds % 60);
}

function updateTimerDisplay(minutes, seconds) {
  const timerElement = document.getElementById("timer");
  if (timerElement) {
      timerElement.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }
}

// Start countdown when the video ends
video.addEventListener("ended", function() {
  countdown(); // Start the countdown
});


//////////////// Skip Intro Video ////////////////

function skipVideo() {
  const videoElement = document.getElementById("video-container");
  if (videoElement) {
      videoElement.style.display = "none"; // Hide the video element
      websiteContainer.classList.add('visible')
      countdown();
  }
}

// Event listener for the skip button
const skipButton = document.getElementById("skip-button");
if (skipButton) {
  skipButton.addEventListener("click", skipVideo);
}

///////////////////////////////////////////////////

function preloadObject(url) {
  return new Promise((resolve, reject) => {
    const object = new Image();
    object.onload = () => resolve();
    object.onerror = () => reject();
    object.src = url;
  });
}



console.log('By Kissane, Sahand, Dom and Josh :)')