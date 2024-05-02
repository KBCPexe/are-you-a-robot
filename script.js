let bot = new RiveScript();

const brains = ["brain/subs.rive", "brain/brain.rive"];

bot.loadFile(brains).then(botReady).catch(botNotReady);

const message_container = document.querySelector(".messages");

const form = document.querySelector("form");

const input_box = document.querySelector("input");

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
  console.log("An error has occurred.", err);
}

        function countdown() {
            let seconds = 600;
            const timer = setInterval(() => {
                if (seconds <= 0) {
                    clearInterval(timer);
                    console.log("Countdown finished!");
                } else {
                    updateTimerDisplay(seconds);
                    seconds--;
                }
            }, 1000); // Countdown every 1 second (1000 milliseconds)
        }

        function updateTimerDisplay(seconds) {
            const timerElement = document.getElementById("timer");
            if (timerElement) {
                timerElement.textContent = seconds;
            }
        }

        countdown(); // Start the countdown





console.log('By Kissane, Sahand, Dom and Josh :)')