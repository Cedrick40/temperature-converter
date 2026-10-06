// Get the elements from the page
const form = document.getElementById("converter-form");
const celsiusInput = document.getElementById("celsius");
const fahrenheitInput = document.getElementById("fahrenheit");
const kelvinInput = document.getElementById("kelvin");
const message = document.getElementById("message");

const allInputs = [celsiusInput, fahrenheitInput, kelvinInput];

// Nothing can be colder than absolute zero
const ABSOLUTE_ZERO = -273.15;

// ---------- One function for each conversion ----------
function celsiusToFahrenheit(c) {
  return c * 9 / 5 + 32;
}

function celsiusToKelvin(c) {
  return c + 273.15;
}

function fahrenheitToCelsius(f) {
  return (f - 32) * 5 / 9;
}

function fahrenheitToKelvin(f) {
  return fahrenheitToCelsius(f) + 273.15;
}

function kelvinToCelsius(k) {
  return k - 273.15;
}

function kelvinToFahrenheit(k) {
  return celsiusToFahrenheit(kelvinToCelsius(k));
}

// ---------- Helper functions ----------

// Round to 2 decimal places and drop extra zeros (32.00 becomes "32")
function formatNumber(value) {
  return String(Number(value.toFixed(2)));
}

// Show an error message and mark the box in red
function showError(input, text) {
  message.textContent = text;
  input.classList.add("invalid");
}

// Remove the error message and the red border
function clearError() {
  message.textContent = "";
  allInputs.forEach(function (input) {
    input.classList.remove("invalid");
  });
}

// Empty every box except the one the user is typing in
function clearOthers(source) {
  allInputs.forEach(function (input) {
    if (input !== source) {
      input.value = "";
    }
  });
}

// ---------- Main function: runs every time the user types ----------
function convert(source) {
  clearError();

  const text = source.value.trim();

  // Empty box, or the user has only typed "-" or "." so far
  if (text === "" || text === "-" || text === "." || text === "-.") {
    clearOthers(source);
    return;
  }

  const number = Number(text);

  // Validation 1: it must be a real number (no letters or symbols)
  if (!isFinite(number)) {
    clearOthers(source);
    showError(source, "Please enter a valid number.");
    return;
  }

  // Validation 2: it can not be below absolute zero.
  // First find the value in Celsius so we can check it.
  let celsius;
  if (source === celsiusInput) {
    celsius = number;
  } else if (source === fahrenheitInput) {
    celsius = fahrenheitToCelsius(number);
  } else {
    celsius = kelvinToCelsius(number);
  }

  if (celsius < ABSOLUTE_ZERO - 0.000001) {
    clearOthers(source);
    showError(source, "That is below absolute zero (-273.15 °C, -459.67 °F, 0 K).");
    return;
  }

  // Fill in the other two boxes
  if (source === celsiusInput) {
    fahrenheitInput.value = formatNumber(celsiusToFahrenheit(number));
    kelvinInput.value = formatNumber(celsiusToKelvin(number));
  } else if (source === fahrenheitInput) {
    celsiusInput.value = formatNumber(fahrenheitToCelsius(number));
    kelvinInput.value = formatNumber(fahrenheitToKelvin(number));
  } else {
    celsiusInput.value = formatNumber(kelvinToCelsius(number));
    fahrenheitInput.value = formatNumber(kelvinToFahrenheit(number));
  }
}

// ---------- Events ----------

// "input" fires every time the text in a box changes
celsiusInput.addEventListener("input", function () {
  convert(celsiusInput);
});

fahrenheitInput.addEventListener("input", function () {
  convert(fahrenheitInput);
});

kelvinInput.addEventListener("input", function () {
  convert(kelvinInput);
});

// Stop the page from reloading if the user presses Enter
form.addEventListener("submit", function (event) {
  event.preventDefault();
});