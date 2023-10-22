// VARIABLES
const metricSelector = document.querySelector(".calculator-metric-input");
const imperialSelector = document.querySelector(".calculator-imperial-input");
const metricHeightInput = document.querySelector(
  ".calculator-height-input-metric"
);
const imperialHeightInputFt = document.querySelector(
  ".calculator-height-input-imperial-ft"
);
const imperialHeightInputIn = document.querySelector(
  ".calculator-height-input-imperial-in"
);
const imperialWeightInputSt = document.querySelector(
  ".calculator-weight-input-imperial-st"
);
const imperialWeightInputLbs = document.querySelector(
  ".calculator-weight-input-imperial-lbs"
);
const metricWeightInput = document.querySelector(
  ".calculator-weight-input-metric"
);
const imperialInputContainer = document.querySelectorAll(
  ".calculator-input-imperial-container"
);
const cm = document.querySelector(".cm");
const kg = document.querySelector(".kg");
const ft = document.querySelector(".ft");
const inch = document.querySelector(".in");
const st = document.querySelector(".st");
const lbs = document.querySelector(".lbs");
const bmiResult = document.querySelector(".calculator-result");
const firstInRange = document.querySelector(".first-in-range");
const lastInRange = document.querySelector(".last-in-range");
const healthStatus = document.querySelector(".health-status");

// FUNCTIONS
function imperialChecked() {
  if (imperialSelector.checked) {
    imperialInputContainer.forEach((container) => {
      container.style.display = "flex";
    });
    metricHeightInput.style.display = "none";
    metricWeightInput.style.display = "none";
    cm.style.display = "none";
    kg.style.display = "none";
    ft.style.display = "flex";
    inch.style.display = "flex";
    st.style.display = "flex";
    lbs.style.display = "flex";
  }
}

function metricChecked() {
  if (metricSelector.checked) {
    metricHeightInput.style.display = "flex";
    metricWeightInput.style.display = "flex";
    cm.style.display = "flex";
    kg.style.display = "flex";
    ft.style.display = "none";
    inch.style.display = "none";
    st.style.display = "none";
    lbs.style.display = "none";
    imperialInputContainer.forEach((container) => {
      container.style.display = "none";
    });
  }
}

function calculateMetricBMI() {
  // Obtén los valores ingresados por el usuario y conviértelos a números.
  const weightInKg = parseFloat(metricWeightInput.value);
  const heightInCm = parseFloat(metricHeightInput.value);
  const userHeightInMeters = heightInCm / 100;
  const minimumIdealWeightMetric =
    userHeightInMeters * userHeightInMeters * 18.5;
  const maximunIdealWeightMetric =
    userHeightInMeters * userHeightInMeters * 24.9;

  // Realiza el cálculo del IMC en el sistema métrico.
  const heightInM = heightInCm / 100; // Convertir altura de cm a metros
  const bmi = weightInKg / Math.pow(heightInM, 2);

  // Muestra el resultado con dos decimales en el elemento 'bmiResult'.
  bmiResult.textContent = bmi.toFixed(2);

  firstInRange.textContent = minimumIdealWeightMetric.toFixed(2);
  lastInRange.textContent = maximunIdealWeightMetric.toFixed(2);

  // Define un margen de error pequeño
  const margin = 0.01;

  if (
    weightInKg >= minimumIdealWeightMetric - margin &&
    weightInKg <= maximunIdealWeightMetric + margin
  ) {
    healthStatus.textContent = " a healthy weight";
  } else {
    healthStatus.textContent = "not within the healthy weight range";
  }
}

function calculateImperialBMI() {
  // Obtén los valores ingresados por el usuario y conviértelos a números.
  const stValue = parseFloat(imperialWeightInputSt.value);
  const lbsValue = parseFloat(imperialWeightInputLbs.value);
  const ftValue = parseFloat(imperialHeightInputFt.value);
  const inchValue = parseFloat(imperialHeightInputIn.value);

  // Realiza la conversión a libras e inches.
  const weightInLbs = stValue * 14 + lbsValue;
  const heightInInches = ftValue * 12 + inchValue;

  // Calcula el IMC en libras e inches.
  const bmi = (weightInLbs / (heightInInches * heightInInches)) * 703;

  // Muestra el resultado con dos decimales en el elemento 'bmiResult'.
  bmiResult.textContent = bmi.toFixed(2);
}

// EVENT LISTENERS
imperialSelector.addEventListener("change", imperialChecked);
metricSelector.addEventListener("change", metricChecked);
metricWeightInput.addEventListener("input", calculateMetricBMI);
imperialWeightInputLbs.addEventListener("input", calculateImperialBMI);
