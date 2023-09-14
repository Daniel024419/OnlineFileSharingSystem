window.addEventListener('load', () => {
  const timerElement = document.getElementById('timer');
  let countdown = parseInt(localStorage.getItem('countdown')) || 2000; // Get remaining time from localStorage

  // Function to update the timer and perform actions when it reaches 0
  function updateTimer() {
    timerElement.textContent = countdown;

    if (countdown === 0) {
      // Clear session data
      localStorage.removeItem('count');
      localStorage.removeItem('isLoggedIn');

      // Redirect to the desired page (e.g., '/')
      window.location.href = "/";
    } else {
      countdown--;
      localStorage.setItem('countdown', countdown); // Store the remaining time in localStorage
      setTimeout(updateTimer, 2000); // Update the timer every 1000 milliseconds (1 second)
    }
  }

  // Start the timer
  updateTimer();
});
