// Initialize DOM elements
const modalContainer = document.querySelector('.modal-container');
const modalSubmitBtn = document.querySelector('.submit-button');
const modalRememberBx = document.querySelector('#remember');
const dayInput = document.querySelector('#day');
const monthInput = document.querySelector('#month');
const yearInput = document.querySelector('#year');

// Array of all date inputs
const dateInputs = [monthInput, dayInput, yearInput, modalSubmitBtn];

// Get current date
const curDate = new Date();
const curMonth = curDate.getMonth()+1;
const curDay = curDate.getDate();
const curYear = curDate.getFullYear();


modalContainer.classList.add('load');

// Formats user input
function formatDate(inputBox) {
    inputBox.addEventListener('focusout', ()=> {
        if (inputBox.value.toString().length === 1) {
            inputBox.value = `0${inputBox.value}`;
        }
    });
}

function checkInput() {
    // Arrays with all months containing 30 and 31 days
    const monthsWith31Days = [1,3,5,7,8,10,12];
    const monthsWith30Days = [4,6,9,11]
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


    if (monthInput.value >= 1 && monthInput.value <= 12) {

        if (monthsWith31Days.includes(Number(monthInput.value))) {
            if (dayInput.value <= 31 && dayInput.value !== '') {
                checkYearInput();
            } else if (dayInput.value === '') {
                alert('Must enter a value in the day input box.');
        
            } else {
                alert('Must enter a valid day.');
            }

        } else if (monthsWith30Days.includes(Number(monthInput.value))) {
            if (dayInput.value <= 30 && dayInput.value !== '') {
                checkYearInput();
            } else if (dayInput.value === '') {
                alert('Must enter a value in the day input box.');
        
            } else {
                alert('Must enter a valid day.');
            }
        } else if (Number(monthInput.value) === 2 && isLeapYear(yearInput.value)) {
            if (dayInput.value <= 29 && dayInput.value !== '') {
                checkYearInput();
            } else if (dayInput.value === '') {
                alert('Must enter a value in the day input box.');
        
            } else {
                alert('Must enter a valid day.');
            }
        } else if (Number(monthInput.value) === 2) {
            if (dayInput.value <= 28 && dayInput.value !== '') {
                checkYearInput();
            } else if (dayInput.value === '') {
                alert('Must enter a value in the day input box.');
        
            } else {
                alert('Must enter a valid day.');
            }
        }

    } else if (monthInput.value === '') {
        alert('Must enter a value in the month input box.');

    } else {
        alert('Must enter a valid month.');
    }

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

// On modal submission code
modalSubmitBtn.addEventListener('click', ()=> {
    
    if (checkInput()) {
        // Check if user is 21 and check for birthday
        if (checkBirthday() && calculateAge() >= 21) {
            console.log(`HAPPY BIRTHDAY!!! ENTER SITE!!!`);
        } else if (checkBirthday() && calculateAge() < 21) {
            console.log(`HAPPY BIRTHDAY!!! REDIRECT USER!!!`);
        } else if (calculateAge() >= 21) {
            console.log(`ENTER SITE!!!`);
        } else {
            console.log(`REDIRECT USER!!!`);
        }


        // Check if user selected remember me option
        console.log(`Remember me is ${modalRememberBx.checked}`)
    }

});