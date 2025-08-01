document.addEventListener('DOMContentLoaded', () => {
  const uploadInput = document.getElementById('photoUpload');
  const submitBtn = document.getElementById('submitBtn');

  if (submitBtn) {
    submitBtn.addEventListener('click', () => {
      const file = uploadInput.files[0];
      if (!file) {
        alert("Upload your face first.");
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        alert("File too big! Must be under 10MB.");
        return;
      }

      // Save image locally in sessionStorage (simulate for now)
      const reader = new FileReader();
      reader.onload = function (e) {
        sessionStorage.setItem("uploadedImage", e.target.result);
        window.location.href = "processing.html";
      };
      reader.readAsDataURL(file);
    });
  }

  // PROCESSING page logic
  if (document.body.classList.contains("processing-page")) {
    setTimeout(() => {
      window.location.href = "output.html";
    }, 4000); // Simulate 4s processing time
  }

  // OUTPUT page logic
  if (document.body.classList.contains("output-page")) {
    const image = sessionStorage.getItem("uploadedImage");
    const lottieContainer = document.getElementById("lottieContainer");
    const roastText = document.querySelector(".roast-text");
    const fruitName = document.querySelector(".fruit-name");

    // Simulate matched fruit for now (e.g., tomato)
    const matchedFruit = "tomato";
    const insult = "Adorably round. Unfortunately, so is a squashed tomato.";

    fruitName.innerText = "🍅 You are a Tomato";
    roastText.innerText = insult;

    // Load Lottie animation
    lottie.loadAnimation({
      container: lottieContainer,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: `lottie/${matchedFruit}.json`
    });

    // Optional: Add Web Speech API insult
    const msg = new SpeechSynthesisUtterance(insult);
    msg.pitch = 0.8;
    msg.rate = 1;
    speechSynthesis.speak(msg);
  }
});
