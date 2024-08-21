window.onload = function () {
  const inputDay = document.getElementById("day");
  const inputMonth = document.getElementById("month");
  const inputYear = document.getElementById("year");
  const button = document.querySelector("#submit");
  const yearsSpan = document.getElementById("years");
  const monthsSpan = document.getElementById("months");
  const daysSpan = document.getElementById("days");

  const inputs = [inputDay, inputMonth, inputYear];

  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      clearErrors(input);
    });
  });

  button.addEventListener("click", () => {
    if (validateInputs()) {
      calculateAge(inputDay, inputMonth, inputYear);
    }
  });

  function validateInputs() {
    let isValid = true;

    inputs.forEach((input) => {
      if (input.value.trim() === "") {
        setError(input, "This field is required");
        isValid = false;
      } else {
        clearErrors(input);
      }
    });

    if (isValid) {
      const day = parseInt(inputDay.value);
      const month = parseInt(inputMonth.value);
      const year = parseInt(inputYear.value);
      const birthDate = new Date(`${year}-${month}-${day}`);
      const now = new Date();

      if (
        month < 1 ||
        month > 12 ||
        day < 1 ||
        day > 31 ||
        year > now.getFullYear() ||
        birthDate > now
      ) {
        setError(inputDay, "Must be a valid date");
        setError(inputMonth, "Must be a valid date");
        setError(inputYear, "Must be a valid date");
        isValid = false;
      } else {
        clearErrors(inputDay);
        clearErrors(inputMonth);
        clearErrors(inputYear);
      }
    }

    return isValid;
  }

  function setError(input, message) {
    const parent = input.parentElement;
    const error = parent.querySelector("p");
    input.classList.add("error");
    error.innerText = message;
  }

  function clearErrors(input) {
    const parent = input.parentElement;
    const error = parent.querySelector("p");
    input.classList.remove("error");
    error.innerText = "";
    resetOutputs();
  }

  function resetOutputs() {
    yearsSpan.innerText = "--";
    monthsSpan.innerText = "--";
    daysSpan.innerText = "--";
  }

  function animateValue(spanElement, start, end, duration) {
    spanElement.classList.add("animate");
    const range = end - start;
    const startTime = performance.now();

    function animate(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const value = Math.floor(start + range * progress);
      spanElement.innerText = value;
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        spanElement.classList.remove("animate");
      }
    }

    requestAnimationFrame(animate);
  }

  function calculateAge(day, month, year) {
    const birthDate = new Date(`${year.value}-${month.value}-${day.value}`);
    const now = new Date();

    let years = now.getFullYear() - birthDate.getFullYear();
    let months = now.getMonth() - birthDate.getMonth();
    let days = now.getDate() - birthDate.getDate();

    if (days < 0) {
      months--;
      days += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    animateValue(yearsSpan, 0, years, 2000);
    animateValue(monthsSpan, 0, months, 2000);
    animateValue(daysSpan, 0, days, 2000);

    if (
      birthDate.getDate() === now.getDate() &&
      birthDate.getMonth() === now.getMonth()
    ) {
      launchConfetti();
      animateBirthdayText();
    }
  }

  function launchConfetti() {
    const duration = 5000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 30,
        startVelocity: 30,
        spread: 360,
        ticks: 60,
        origin: {
          x: Math.random(),
          y: Math.random() - 0.2,
        },
      });
      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }

  function animateBirthdayText() {
    const birthdayMessage = document.createElement("div");
    birthdayMessage.innerText = "🎉 Happy Birthday! 🎉";
    birthdayMessage.style.position = "fixed";
    birthdayMessage.style.top = "50%";
    birthdayMessage.style.left = "50%";
    birthdayMessage.style.transform = "translate(-50%, -50%)";
    birthdayMessage.style.fontSize = "3rem";
    birthdayMessage.style.color = "#ff69b4";
    birthdayMessage.style.background = "rgba(0, 0, 0, 0.8)";
    birthdayMessage.style.padding = "20px 40px";
    birthdayMessage.style.borderRadius = "10px";
    birthdayMessage.style.zIndex = "1000";
    birthdayMessage.style.opacity = "0";
    birthdayMessage.style.transition = "opacity 1s ease-in-out";

    document.body.appendChild(birthdayMessage);

    setTimeout(() => {
      birthdayMessage.style.opacity = "1";
    }, 100);

    setTimeout(() => {
      birthdayMessage.style.opacity = "0";
      setTimeout(() => {
        document.body.removeChild(birthdayMessage);
      }, 1000);
    }, 4000);
  }
};
