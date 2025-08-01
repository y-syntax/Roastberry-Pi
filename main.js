document.addEventListener('DOMContentLoaded', () => {
  // === UPLOAD PAGE LOGIC ===
  const uploadInput = document.getElementById('photoUpload');
  const submitBtn = document.getElementById('submitBtn');
  if (submitBtn && uploadInput) {
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
      const reader = new FileReader();
      reader.onload = function (e) {
        sessionStorage.setItem("uploadedImage", e.target.result);
        sessionStorage.removeItem("matchResult");
        window.location.href = "processing.html";
      };
      reader.readAsDataURL(file);
    });
  }

  // === PROCESSING PAGE LOGIC ===
  if (document.body.classList.contains("processing-page")) {
    setTimeout(() => {
      // List for fallback if AI is unavailable
      const veggies = [
        {
          name: "🥔 You are a Potato",
          roast: "As versatile as you are lumpy. The only glow-up you'll ever get is being turned into fries—and people still prefer ketchup over your company.",
          img: "images/potato.png"
        },
        {
          name: "🍅 You are a Tomato",
          roast: "Technically a fruit, but nobody brags about you. Soft on the outside, crushed in every salad. The BLT is your only shot at relevance.",
          img: "images/tomato.png"
        },
        {
          name: "🥕 You are Carrot",
          roast: "Living proof healthy doesn’t equal fun. Even rabbits fake excitement when they see you.",
          img: "images/carrot.png"
        },
        {
          name: "🍈 You are Jackfruit",
          roast: "Spiky on the outside, confusing on the inside. You're huge, divisive, and make people wonder if you're fruit or pulled pork.",
          img: "images/jackfruit.png"
        },
        {
          name: "🍆 You are Eggplant",
          roast: "Your reputation precedes you, and it's mostly an emoji.",
          img: "images/eggplant.png"
        },
        {
          name: "🍉 You are Watermelon",
          roast: "99% water, 1% personality. Spits out more seeds than jokes.",
          img: "images/watermelon.png"
        },
        {
          name: "🧅 You are Onion",
          roast: "Layers for days, tears for years.",
          img: "images/onion.png"
        },
        {
          name: "🥒 You are Bittergourd",
          roast: "Tough to swallow, leaves a lasting impression (and bitter aftertaste). You're health food's greatest challenge.",
          img: "images/bittergourd.png"
        },
        {
          name: "🥒 You are Cucumber",
          roast: "Cool as a cucumber (and just as bland). No matter where you end up, someone always tries to pickle you.",
          img: "images/cucumber.png"
        },
        {
          name: "🥚 You are Egg",
          roast: "You crack easily under pressure and nobody's sure whether you came first or just showed up to breakfast.",
          img: "images/egg.png"
        },
        {
          name: "🥬 You are Drumstick",
          roast: "Stringy, niche, and only loved by grandmas and sambar fans. Most people see you and say 'What's that?'",
          img: "images/drumstick.png"
        },
        {
          name: "🍍 You are Pineapple",
          roast: "Tough-skinned, spiky, and never invited on pizza without controversy. Sweet on the inside, dangerous on the outside.",
          img: "images/pineapple.png"
        },
        {
          name: "🎃 You are Pumpkin",
          roast: "Seasonal superstar for one month, ignored the rest of the year. When you show up, things get squashy.",
          img: "images/pumpkin.png"
        },
        {
          name: "🌶️ You are Red Chilli",
          roast: "Hot-tempered, quick to flare up. People remember you—but not always for good reasons.",
          img: "images/redchilli.png"
        }
      ];
      const randomMatch = veggies[Math.floor(Math.random() * veggies.length)];
      sessionStorage.setItem("matchResult", JSON.stringify(randomMatch));
      window.location.href = "output.html";
    }, 4000);
  }

  // === OUTPUT PAGE LOGIC with smart face feature matching ===
  if (document.body.classList.contains("output-page")) {
    const imageData = sessionStorage.getItem("uploadedImage");
    const userFace = document.getElementById("userFace");
    const veggiePic = document.getElementById("veggiePic");
    const fruitNameEl = document.querySelector('.fruit-name');
    const roastTextEl = document.querySelector('.roast-text');

    // Same veggie array as processing (must be identical!)
    const veggies = [
      {
        name: "🥔 You are a Potato",
        roast: "As versatile as you are lumpy. The only glow-up you'll ever get is being turned into fries—and people still prefer ketchup over your company.",
        img: "images/potato.png"
      },
      {
        name: "🍅 You are a Tomato",
        roast: "Technically a fruit, but nobody brags about you. Soft on the outside, crushed in every salad. The BLT is your only shot at relevance.",
        img: "images/tomato.png"
      },
      {
        name: "🥕 You are Carrot",
        roast: "Living proof healthy doesn’t equal fun. Even rabbits fake excitement when they see you.",
        img: "images/carrot.png"
      },
      {
        name: "🍈 You are Jackfruit",
        roast: "Spiky on the outside, confusing on the inside. You're huge, divisive, and make people wonder if you're fruit or pulled pork.",
        img: "images/jackfruit.png"
      },
      {
        name: "🍆 You are Eggplant",
        roast: "Your reputation precedes you, and it's mostly an emoji.",
        img: "images/eggplant.png"
      },
      {
        name: "🍉 You are Watermelon",
        roast: "99% water, 1% personality. Spits out more seeds than jokes.",
        img: "images/watermelon.png"
      },
      {
        name: "🧅 You are Onion",
        roast: "Layers for days, tears for years.",
        img: "images/onion.png"
      },
      {
        name: "🥒 You are Bittergourd",
        roast: "Tough to swallow, leaves a lasting impression (and bitter aftertaste). You're health food's greatest challenge.",
        img: "images/bittergourd.png"
      },
      {
        name: "🥒 You are Cucumber",
        roast: "Cool as a cucumber (and just as bland). No matter where you end up, someone always tries to pickle you.",
        img: "images/cucumber.png"
      },
      {
        name: "🥚 You are Egg",
        roast: "You crack easily under pressure and nobody's sure whether you came first or just showed up to breakfast.",
        img: "images/egg.png"
      },
      {
        name: "🥬 You are Drumstick",
        roast: "Stringy, niche, and only loved by grandmas and sambar fans. Most people see you and say 'What's that?'",
        img: "images/drumstick.png"
      },
      {
        name: "🍍 You are Pineapple",
        roast: "Tough-skinned, spiky, and never invited on pizza without controversy. Sweet on the inside, dangerous on the outside.",
        img: "images/pineapple.png"
      },
      {
        name: "🎃 You are Pumpkin",
        roast: "Seasonal superstar for one month, ignored the rest of the year. When you show up, things get squashy.",
        img: "images/pumpkin.png"
      },
      {
        name: "🌶️ You are Red Chilli",
        roast: "Hot-tempered, quick to flare up. People remember you—but not always for good reasons.",
        img: "images/redchilli.png"
      }
    ];

    // Show user photo as soon as possible
    if (userFace && imageData) {
      userFace.src = imageData;
      userFace.style.display = "block";
    }

    // Wait for face photo to load before detection
    userFace.onload = async () => {
      try {
        await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
        await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
        const detection = await faceapi
          .detectSingleFace(userFace, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks();

        let match;
        if (detection) {
          const landmarks = detection.landmarks;
          const jaw = landmarks.getJawOutline();
          const leftBrow = landmarks.getLeftEyeBrow();
          const faceWidth = jaw[16].x - jaw[0].x;
          const faceHeight = jaw[8].y - leftBrow[0].y;
          const aspectRatio = faceWidth / faceHeight;

          // --- Mapping face shape/size to veggies/fruits ---
          if (aspectRatio > 1.15) {
            match =
              veggies.find(v => v.name.includes("Jackfruit")) ||
              veggies.find(v => v.name.includes("Potato"));
          } else if (aspectRatio < 0.85) {
            match =
              veggies.find(v => v.name.includes("Drumstick")) ||
              veggies.find(v => v.name.includes("Cucumber")) ||
              veggies.find(v => v.name.includes("Carrot"));
          } else if (faceHeight > 190) {
            match =
              veggies.find(v => v.name.includes("Eggplant")) ||
              veggies.find(v => v.name.includes("Pumpkin"));
          } else if (faceWidth < 120) {
            match = veggies.find(v => v.name.includes("Red Chilli"));
          } else {
            match = veggies[Math.floor(Math.random() * veggies.length)];
          }
        } else {
          match = veggies[Math.floor(Math.random() * veggies.length)];
        }

        // Display match
        if (veggiePic && match.img) {
          veggiePic.src = match.img;
          veggiePic.style.display = "block";
        } else if (veggiePic) {
          veggiePic.style.display = "none";
        }
        fruitNameEl.textContent = match.name;
        roastTextEl.textContent = match.roast;
        // Speak
        const msg = new SpeechSynthesisUtterance(match.roast);
        msg.pitch = 0.8;
        msg.rate = 1;
        speechSynthesis.speak(msg);

      } catch (err) {
        // Fallback to random match
        const match = veggies[Math.floor(Math.random() * veggies.length)];
        if (veggiePic && match.img) {
          veggiePic.src = match.img;
          veggiePic.style.display = "block";
        } else if (veggiePic) {
          veggiePic.style.display = "none";
        }
        fruitNameEl.textContent = match.name;
        roastTextEl.textContent = match.roast;
        const msg = new SpeechSynthesisUtterance(match.roast);
        msg.pitch = 0.8;
        msg.rate = 1;
        speechSynthesis.speak(msg);
      }
    };

    // If the image is already loaded (from cache), trigger detection
    if (userFace.complete) userFace.onload();
  }
});
