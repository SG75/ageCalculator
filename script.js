window.onload = function () {
  const inputDay = document.getElementById("day");
  const inputMonth = document.getElementById("month");
  const inputYear = document.getElementById("year");
  const button = document.querySelector(".circle button");
  const currentDate = new Date();
  let currentDay = currentDate.getDate();
  let currentMonth = currentDate.getMonth() + 1;
  let currentYear = currentDate.getFullYear();
  const yearsSpan = document.querySelector(".result div:nth-child(1) span");
  const monthsSpan = document.querySelector(".result div:nth-child(2) span");
  const daysSpan = document.querySelector(".result div:nth-child(3) span");
  const res = document.querySelector(".result");

  function resetOutputs() {
    res.innerHTML = `
    <div><span class="dash">--</span> years</div>
    <div><span class="dash">--</span> months</div>
    <div><span class="dash">--</span> days</div>
  `;
  }

  //clear errors if any in the input fields
  [inputDay, inputMonth, inputYear].forEach((input) => {
    input.addEventListener("input", () => {
      clearErrors(inputDay);
      clearErrors(inputMonth);
      clearErrors(inputYear);
    });
  });

  //function to check if year is an leap year
  //reference: https://shorturl.at/kAM01

  function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  }

  //set error field and make them red

  function setErrors(input) {
    input.previousElementSibling.style.color = "red";
    input.style.border = "1px solid red";
    input.nextElementSibling.style.color = "red";
    input.nextElementSibling.classList.add("inputerror");
  }

  //check the day

  function checkDay(day) {
    if (day.value == "") {
      day.nextElementSibling.innerHTML = "This field is required";
      setErrors(day);
      resetOutputs();
      return false;
    } else if (day.value <= 0 || day.value > 31) {
      day.nextElementSibling.innerHTML = "Must be a valid day";
      setErrors(day);
      setErrors(inputYear);
      setErrors(inputMonth);
      resetOutputs();
      return false;
    } else if (checkDateValidity(day, inputMonth, inputYear) == false) {
      setErrors(day);
      setErrors(inputYear);
      setErrors(inputMonth);
      resetOutputs();
      return false;
    } else {
      clearErrors(day);
      return true;
    }
  }
  // check the year

  function checkYear(year) {
    if (year.value == "") {
      year.nextElementSibling.innerHTML = "This field is required";
      setErrors(year);
      resetOutputs();
      return false;
    } else if (year.value > currentYear) {
      year.nextElementSibling.innerHTML = "Must be in the past";
      setErrors(year);
      setErrors(inputDay);
      setErrors(inputMonth);
      resetOutputs();
      return false;
    } else if (year.value == currentYear && inputMonth.value > currentMonth) {
      inputMonth.nextElementSibling.innerHTML = "Must be a valid month";
      setErrors(year);
      setErrors(inputDay);
      setErrors(inputMonth);
      resetOutputs();
      return false;
    } else if (
      year.value == currentYear &&
      inputMonth.value == currentMonth &&
      inputDay.value > currentDay
    ) {
      inputDay.nextElementSibling.innerHTML = "Must be a in past";
      setErrors(year);
      setErrors(inputDay);
      setErrors(inputMonth);
      resetOutputs();
      return false;
    } else {
      return true;
    }
  }

  // check the month

  function checkMonth(month) {
    if (month.value == "") {
      month.nextElementSibling.innerHTML = "This field is required";
      setErrors(month);
      resetOutputs();
      return false;
    } else if (month.value <= 0 || month.value > 12) {
      month.nextElementSibling.innerHTML = "Must be a valid month";
      setErrors(month);
      setErrors(inputDay);
      setErrors(inputYear);
      resetOutputs();
      return false;
    } else if (checkDateValidity(inputDay, month, inputYear) == false) {
      setErrors(month);
      setErrors(inputYear);
      setErrors(inputMonth);
      resetOutputs();
      return false;
    } else {
      clearErrors(month);
      return true;
    }
  }

  //check month for number of days in the months

  function checkDateValidity(day, month, year) {
    const isLeap = isLeapYear(year.value);
    const daysInMonth = [
      31,
      isLeap ? 29 : 28,
      31,
      30,
      31,
      30,
      31,
      31,
      30,
      31,
      30,
      31,
    ];
    if (day.value > daysInMonth[month.value - 1]) {
      day.nextElementSibling.innerHTML = "Must be a valid date";
      setErrors(day);
      setErrors(month);
      setErrors(year);
      resetOutputs();
      return false;
    } else {
      return true;
    }
  }

  //clear the errors in the input fields

  function clearErrors(input) {
    const res = document.querySelector(".result");

    input.previousElementSibling.style.color = "";
    input.nextElementSibling.innerHTML = "";
    input.nextElementSibling.classList.remove("inputerror");
    input.style.border = "";
    resetOutputs();
  }

  function calculateAge(day, month, year) {
    const birthDay = day.value;
    const birthMonth = month.value;
    const birthYear = year.value;

    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // Months are 0-indexed
    const currentDay = currentDate.getDate();

    let years = currentYear - birthYear;
    let months = currentMonth - birthMonth;
    let days = currentDay - birthDay;

    // Adjust for negative months or days
    if (days < 0) {
      months -= 1;
      days += new Date(birthYear, birthMonth - 1, 0).getDate();
    }
    if (months < 0) {
      years -= 1;
      months += 12;
    }

    res.innerHTML = `
    <div><span class="dash">${years}</span> years</div>
    <div><span class="dash">${months}</span> months</div>
    <div><span class="dash">${days}</span> ${days === 1 ? "day" : "days"}</div>
  `;
  }

  // Attach a click event to the button to log the input values

  button.addEventListener("click", () => {
    checkDay(inputDay);
    checkMonth(inputMonth);
    checkYear(inputYear);
    checkDateValidity(inputDay, inputMonth, inputYear);
    if (
      checkDay(inputDay) &&
      checkMonth(inputMonth) &&
      checkYear(inputYear) &&
      checkDateValidity(inputDay, inputMonth, inputYear)
    ) {
      calculateAge(inputDay, inputMonth, inputYear);
    }
  });
};
