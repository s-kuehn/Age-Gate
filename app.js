'use strict';

// Initialize DOM elements

// Navbar elements
const toggleButton = document.querySelector('.toggle-button');
const navBarLinks = document.querySelector('.nav-links');
const navbar = document.querySelector('.navbar');

// Hero Image
const heroImageContainer = document.querySelector('.hero');

// Modal elements
const modalContainer = document.querySelector('.modal-container');
const modalSubmitBtn = document.querySelector('.submit-button');
const modalRememberBx = document.querySelector('#remember');
const modalBirthdayInput = document.querySelector('.birthday-input')
const modalRememberContainer = document.querySelector('.remember-container');
const modalH1 = document.querySelector('#modal-h1');
const modalH2 = document.querySelector('#modal-h2');
const modalP = document.querySelector('#modal-p');

// User input elements
const dayInput = document.querySelector('#day');
const monthInput = document.querySelector('#month');
const yearInput = document.querySelector('#year');

// Array of all date inputs
const dateInputs = [monthInput, dayInput, yearInput, modalSubmitBtn];

// Get current date
const curDate = new Date();
const curMonth = curDate.getMonth() + 1;
const curDay = curDate.getDate();
const curYear = curDate.getFullYear();


// Navbar hamburger button
toggleButton.addEventListener('click', () => {
    navBarLinks.classList.toggle('active');
    navBarLinks.classList.toggle('drop-down')
    heroImageContainer.classList.toggle('hero-menu-active');
});

// Redirect user
function redirect() {
    setTimeout(()=>{
        window.location.replace("https://google.com");
    }, 2000);
}

// Enter site and remove modal
function enterSite() {

    // Store rememberValue in local storage
    if (modalRememberBx.checked) {
        const rememberValue = true;
        localStorage.setItem('rememberVal', rememberValue);
    }

    // Fadeout and hide modal
    setTimeout(()=>{
        modalContainer.classList.remove('load');
        setTimeout(()=>{
            modalContainer.classList.add('hide');
        }, 800);
    }, 1400);
}

// Change modal to under age site message
function underAgeEvent() {
    modalSubmitBtn.classList.add('hide');
    modalRememberContainer.classList.add('hide');
    modalP.classList.add('hide');
    modalBirthdayInput.classList.add('hide');
    modalH1.innerHTML = 'You are under age.';
    modalH2.innerHTML = 'You will now be redirected.';
}

// Change modal to enter site message
function ofAgeEvent() {
    modalSubmitBtn.classList.add('hide');
    modalRememberContainer.classList.add('hide');
    modalP.classList.add('hide');
    modalBirthdayInput.classList.add('hide');
    modalH2.classList.add('hide');
}

// Change modal to birthday message
function birthdayEvent() {
    modalSubmitBtn.classList.add('hide');
    modalRememberContainer.classList.add('hide');
    modalP.classList.add('hide');
    modalBirthdayInput.classList.add('hide');
    modalH2.innerHTML = birthdayMessage(calculateAge());
}

// Change modal to birthday message under age
function birthdayRedirectEvent() {
    modalSubmitBtn.classList.add('hide');
    modalRememberContainer.classList.add('hide');
    modalP.classList.add('hide');
    modalBirthdayInput.classList.add('hide');
    modalH1.innerHTML = `${birthdayMessage(calculateAge())} However, you are underage.`;
    modalH2.innerHTML = 'You will now be redirected.';
}

// Formats user input (Adds 0s infront of single digits)
function formatDate(inputBox) {
    inputBox.addEventListener('focusout', ()=> {
        if (inputBox.value.toString().length === 1) {
            inputBox.value = `0${inputBox.value}`;
        }
    });
}

function checkInput() {
    // Arrays with all months containing 30 and 31 days
    const monthsWith31Days = [1, 3, 5, 7, 8, 10, 12];
    const monthsWith30Days = [4, 6, 9, 11];
    // Return value
    let errorFree = false;

    // Validate user input for year
    function checkYearInput() {
        if (yearInput.value >= 1900 && yearInput.value <= curYear) {

            errorFree = true;

        } else if (yearInput.value === '') {
            alert('Must enter a value in the year input box.');
    
        } else {
            alert('Must enter a valid year after 1900.');
        }
    }

    // Check for a leap year
    function isLeapYear(year) {
        if (year % 4 === 0 && year % 100 != 0 || year % 400 === 0) {
            return true;
        } else {
            return false;
        }
    }


    // Checks if month input is valid
    if (monthInput.value >= 1 && monthInput.value <= 12) {

        // Checks for correct day input if month should have a max of 31 days
        if (monthsWith31Days.includes(Number(monthInput.value))) {
            if (dayInput.value >= 1 && dayInput.value <= 31 && dayInput.value !== '') {
                checkYearInput();
            } else if (dayInput.value === '') {
                alert('Must enter a value in the day input box.');
        
            } else {
                alert('Must enter a valid day.');
            }

        // Checks for correct day input if month should have a max of 30 days
        } else if (monthsWith30Days.includes(Number(monthInput.value))) {
            if (dayInput.value >= 1 && dayInput.value <= 30 && dayInput.value !== '') {
                checkYearInput();
            } else if (dayInput.value === '') {
                alert('Must enter a value in the day input box.');
        
            } else {
                alert('Must enter a valid day.');
            }

        // Checks for correct day input if month should have a max of 29 days due to a leap year
        } else if (Number(monthInput.value) === 2 && isLeapYear(yearInput.value)) {
            if (dayInput.value >= 1 && dayInput.value <= 29 && dayInput.value !== '') {
                checkYearInput();
            } else if (dayInput.value === '') {
                alert('Must enter a value in the day input box.');
        
            } else {
                alert('Must enter a valid day.');
            }

        // Checks for correct day input if month should have a max of 28 days
        } else if (Number(monthInput.value) === 2) {
            if (dayInput.value >= 1 && dayInput.value <= 28 && dayInput.value !== '') {
                checkYearInput();
            } else if (dayInput.value === '') {
                alert('Must enter a value in the day input box.');
        
            } else {
                alert('Must enter a valid day.');
            }
        }

    // Check for no value in the month input
    } else if (monthInput.value === '') {
        alert('Must enter a value in the month input box.');

    } else {
        alert('Must enter a valid month.');
    }

    // Return if valid or invalid
    return errorFree;
}


function calculateAge() {

    // Init returned calculated age
    let calcAge = 0;

    // Calculate age
    if (curMonth > monthInput.value) {
        calcAge = curYear - yearInput.value;
    } else if (curMonth === Number(monthInput.value)) {
        if (curDay >= dayInput.value) {
            calcAge = curYear - yearInput.value;
        } else {
            calcAge = curYear - yearInput.value - 1;
        }
    } else {
        calcAge = curYear - yearInput.value - 1;
    }

    // Return user's age
    return calcAge;
}


function checkBirthday() {
    let isBirthday = false;

    // Check if today is the user's birthday
    if (curMonth === Number(monthInput.value) && curDay === Number(dayInput.value)) {
        isBirthday = true;
    } else {
        isBirthday = false;
    }

    return isBirthday;
}


// Create custom birthday message based on user's age
function birthdayMessage(userAge) {
    const ageLastDigit = userAge % 10;
    const yearSuffix = ["st", "nd", "rd", "th"]

    // Assign yearSuffix endings to bday message
    if (ageLastDigit > 0 && ageLastDigit < 4) {
        return `Happy ${userAge}${yearSuffix[ageLastDigit-1]} Birthday!`;
    } else {
        return `Happy ${userAge}${yearSuffix[3]} Birthday!`;
    }
}


// Adds extra 0 infront of days and months
formatDate(monthInput);
formatDate(dayInput);

// Jump to next input when maxlength has been reached
for (let i = 0; i < dateInputs.length; i++) {
    dateInputs[i].addEventListener('keyup', ()=> {
        if (i < dateInputs.length - 1){
            if (dateInputs[i].value.length >= dateInputs[i].maxLength) {
                dateInputs[i+1].focus();
                dateInputs[i].value = dateInputs[i].value.substr(0, dateInputs[i].maxLength);
            }
        }
    });
}

// Check if user previously selected remember me option
if(!localStorage.getItem('rememberVal')) {

    // Fade in on load
    modalContainer.classList.remove('hide');
    setTimeout(()=>{
        modalContainer.classList.add('load');
    }, 150);

    // On modal submission code
    modalSubmitBtn.addEventListener('click', ()=> {

        if (checkInput()) {

            // If today is user's b-day and if they are of age
            if (checkBirthday() && calculateAge() >= 21) {
                birthdayEvent();
                enterSite();

            // If today is user's b-day and if they are under age
            } else if (checkBirthday() && calculateAge() < 21) {
                birthdayRedirectEvent()
                redirect();

            // If user is of age
            } else if (calculateAge() >= 21) {
                ofAgeEvent();
                enterSite();

            // If user is under age
            } else {
                underAgeEvent();
                redirect();
            }

        }
    });
}