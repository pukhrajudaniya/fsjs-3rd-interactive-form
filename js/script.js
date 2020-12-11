// ============================================================================
// Global functions
// ============================================================================

// Job Title function
// ============================================================================

function handleJobTitle() {
  //if 'other' is selected option, show Job Role Text Input otherwise hide it
  jobTitle.value.toLowerCase() === "other" ? otherJobRoleInput.removeAttribute("hidden") : otherJobRoleInput.setAttribute("hidden", "");
}

// Shirt Design function
// ============================================================================

function handleShirtDesign() {
  const allOptions = document.querySelectorAll("#color option[data-theme]"),
    selectedOptions = document.querySelectorAll(`[data-theme='${shirtDesign.value}']`);

  //enable shirt color select input
  shirtColor.removeAttribute("disabled");
  //hide all select options & remove 'selected' attribute
  allOptions.forEach((option) => option.setAttribute("hidden", ""));
  allOptions.forEach((option) => option.removeAttribute("selected", ""));
  //show only options that are related to input selected by user
  selectedOptions.forEach((option) => option.removeAttribute("hidden"));
  //set first option as selected in list of options that are shown
  selectedOptions[0].setAttribute("selected", "");
}

// Activities Fieldset function
// ============================================================================

function handleActivitiesFieldset(e) {
  //if event occurred on checkbox
  if (e.target.getAttribute("type") === "checkbox") {
    //if checkbox was checked or unchecked, add the cost or remove
    e.target.checked ? (activitiesCostValue += parseInt(e.target.dataset.cost)) : (activitiesCostValue -= parseInt(e.target.dataset.cost));
    activitiesCost.innerHTML = `Total: $${activitiesCostValue}`;

    //if an activity was checked or unchecked, disable or enable the conflicting activities
    e.target.checked
      ? activitiesInputs.forEach((activity) => {
          if (e.target !== activity && e.target.getAttribute("data-day-and-time") === activity.getAttribute("data-day-and-time")) {
            activity.setAttribute("disabled", "");
            activity.parentElement.classList.add("disabled");
          }
        })
      : activitiesInputs.forEach((activity) => {
          if (e.target !== activity && e.target.getAttribute("data-day-and-time") === activity.getAttribute("data-day-and-time")) {
            activity.removeAttribute("disabled", "");
            activity.parentElement.classList.remove("disabled");
          }
        });
  }
}

// Payment Selection function
// ============================================================================

function handlePaymentSelection() {
  //handle payments option selection, only show the inputs related to selected payment option
  paymentMethods.forEach((method) => (method.getAttribute("id") === paymentSelection.value.toLowerCase() ? (method.style.display = "block") : (method.style.display = "none")));
}

// Form submit function
// ============================================================================

function handleFormSubmit(e) {
  const isNameValid = nameValidator(),
    isEmailValid = emailValidator(),
    isActivityValid = activityValidator(),
    isCardValid = cardValidator();

  //if any validator fails, form submission is stopped
  if (!(isNameValid && isEmailValid && isActivityValid && isCardValid)) {
    e.preventDefault();
  }
}

// Name validator function
// ============================================================================

function nameValidator() {
  let isValid = false;
  const name = document.querySelector("#name"),
    regex = /^[a-z]+(([a-z ])?[a-z]*)*$/gi;

  isValid = regex.test(name.value) ? true : false;
  //if input is valid, show valid input feedback
  //if input is not valid, show invalid input feedback
  isValid ? addValidStyles(name) : addErrorStyles(name);
  return isValid;
}

// email validator function
// ============================================================================

function emailValidator() {
  let isValid = false;
  const email = document.querySelector("#email"),
    regex = /^[a-z0-9]+@[a-z0-9]+.com$/gi;

  isValid = regex.test(email.value) ? true : false;
  //if input is valid, show valid input feedback
  //if input is not valid, show invalid input feedback
  isValid ? addValidStyles(email) : addErrorStyles(email);

  const conditionalRegex = /^[a-z0-9]+.com$/gi;

  //if input is not valid but missed ak '@' only, show helpful error message feedback
  if (!isValid && conditionalRegex.test(email.value)) {
    email.parentElement.lastElementChild.innerHTML = "Email address is missing '@'";
    addErrorStyles(email);
  }

  return isValid;
}

// Activity validator function
// ============================================================================

function activityValidator() {
  let isValid = false;
  const activitiesBox = document.querySelector("#activities-box");

  //if total cost is 0, no activities are selected
  activitiesCostValue === 0 ? (isValid = false) : (isValid = true);
  //if input is valid, show valid input feedback
  //if input is not valid, show invalid input feedback
  isValid ? addValidStyles(activitiesBox) : addErrorStyles(activitiesBox);
  return isValid;
}

// Card validator function
// ============================================================================

function cardValidator() {
  let isCardValid = true,
    isZipValid = true,
    isCvvValid = true;
  const ccNum = document.querySelector("#cc-num"),
    zip = document.querySelector("#zip"),
    cvv = document.querySelector("#cvv"),
    cardRegex = /^[0-9]{13,16}$/g,
    zipRegex = /^[0-9]{5}$/g,
    cvvRegex = /^[0-9]{3}$/g;

  //if credit-card is the selected payment, validate card number, zip and cvv
  if (paymentSelection.value === "credit-card") {
    isCardValid = cardRegex.test(ccNum.value) ? true : false;
    isZipValid = zipRegex.test(zip.value) ? true : false;
    isCvvValid = cvvRegex.test(cvv.value) ? true : false;

    //if input is valid, show valid input feedback
    //if input is not valid, show invalid input feedback
    isCardValid ? addValidStyles(ccNum) : addErrorStyles(ccNum);
    isZipValid ? addValidStyles(zip) : addErrorStyles(zip);
    isCvvValid ? addValidStyles(cvv) : addErrorStyles(cvv);
  }

  //if credit-card is not the selected payment return cardValidator() function as true
  const isValid = isCardValid && isZipValid && isCvvValid;
  return isValid;
}

// Valid & Error styles functions
// ============================================================================

function addValidStyles(element) {
  //add 'valid' & remove 'not-valid' class to parent of element
  element.parentElement.classList.add("valid");
  element.parentElement.classList.remove("not-valid");
  //set 'display:none' to hide error hint element
  element.parentElement.lastElementChild.style.display = "none";
}
function addErrorStyles(element) {
  //add 'not-valid' & remove 'valid' class to parent of element
  element.parentElement.classList.add("not-valid");
  element.parentElement.classList.remove("valid");
  //set 'display:block' to show error hint element
  element.parentElement.lastElementChild.style.display = "block";
}

// Activities focus & blur functions
// ============================================================================

function handleActivitiesFocus(e) {
  //add 'focus' class to parent of event target
  e.target.parentNode.classList.add("focus");
}
function handleActivitiesBlur(e) {
  //remove 'focus' class from parent of event target
  e.target.parentNode.classList.remove("focus");
}

// ============================================================================
// Global Variables
// ============================================================================

let activitiesCostValue = 0;
const otherJobRoleInput = document.querySelector(".other-job-role"),
  jobTitle = document.querySelector("#title"),
  shirtColor = document.querySelector("#color"),
  shirtDesign = document.querySelector("#design"),
  activitiesFieldset = document.querySelector("#activities"),
  activitiesCost = document.querySelector("#activities-cost"),
  paymentSelection = document.querySelector("#payment"),
  paymentOptions = document.querySelectorAll("#payment option"),
  paymentMethods = document.querySelectorAll(".payment-methods div[id]"),
  form = document.querySelector("form"),
  activitiesInputs = document.querySelectorAll("#activities-box input"),
  nameInput = document.querySelector("#name");

// ============================================================================
// Global event listeners & loops
// ============================================================================

// Job title event listener
// ============================================================================

otherJobRoleInput.setAttribute("hidden", "");
jobTitle.addEventListener("input", handleJobTitle);

// Shirt design event listener
// ============================================================================

shirtColor.setAttribute("disabled", "");
shirtDesign.addEventListener("input", handleShirtDesign);

// Payment methods display loop
// ============================================================================

paymentOptions[1].setAttribute("selected", "");
paymentMethods.forEach((method) => (method.getAttribute("id") !== "credit-card" ? (method.style.display = "none") : false));

// Activities selection event listener
// ============================================================================

activitiesFieldset.addEventListener("click", handleActivitiesFieldset);

// payment option selection event listener
// ============================================================================

paymentSelection.addEventListener("input", handlePaymentSelection);

// Form Event Listener & Instant name input validator
// ============================================================================

form.addEventListener("submit", handleFormSubmit);
nameInput.addEventListener("keyup", nameValidator);

// Activities Focus Loops
// ============================================================================

activitiesInputs.forEach((input) => input.addEventListener("focus", handleActivitiesFocus));
activitiesInputs.forEach((input) => input.addEventListener("blur", handleActivitiesBlur));
