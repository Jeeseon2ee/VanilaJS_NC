const greetingForm = document.querySelector('.greeting-form'),
  greetingInput = greetingForm.querySelector('input'),
  greetingFill = document.querySelector('.greeting-fill');

const USER = "currentUser",
  SHOWING = "showing";

function saveName (text) {
    localStorage.setItem(USER, text);
}

function handleSubmit (event) {
    event.preventDefault ();
    const currentValue = greetingInput.value;
    fillGreeting(currentValue);
    saveName(currentValue);
}

function askName () {
  greetingForm.classList.add(SHOWING);
  greetingForm.addEventListener("submit", handleSubmit);
}

function fillGreeting (text) {
  greetingForm.classList.remove(SHOWING);
  greetingFill.innerText = `Hello ${text} :)`
}

function loadName () {
  const currentUser = localStorage.getItem(USER);
  if (currentUser === null) {
    askName();
  } else {
    fillGreeting(currentUser);
  };
}

function init() {
  loadName();
};

init();