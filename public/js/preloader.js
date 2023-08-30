document.addEventListener("DOMContentLoaded", function () {
  // Show the overlay when the page starts loading
  const overlay = document.getElementById("overlay");
  overlay.style.display = "flex";

  // Hide the overlay when the page is fully loaded
  window.addEventListener("load", function () {
    overlay.style.display = "none";
  });
});
