document.addEventListener('DOMContentLoaded', () => {
  const uploadInput = document.getElementById('photoUpload');
  const submitBtn = document.getElementById('submitBtn');

  // UPLOAD PAGE LOGIC
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
      const reader = new FileReader();
      reader.onload = function (e) {
        sessionStorage.setItem("uploadedImage", e.target.result);
        window.location.href = "processing.html";
      };
      reader.readAsDataURL(file);
    });
  }

  // PROCESSING PAGE LOGIC
  if (document.body.classList.contains("processing-page")) {
    setTimeout(() => {
      // Simulate fruit/veggie matching
      const veggies = [
  {
    name: "🥔 You are a Potato",
    roast: "As versatile as you are lumpy. The only glow-up you'll ever get is being turned into fries—and people still prefer ketchup over your company."
  },
  {
    name: "🍅 You are a Tomato",
    roast: "Technically a fruit, but nobody brags about you. Soft on the outside, crushed in every salad. The BLT is your only shot at relevance."
  },
  {
    name: "🥦 You are Broccoli",
    roast: "Steamed, boiled, or banished to the edge of the plate. You strike fear into the hearts of children everywhere—and honestly, adults too."
  },
  {
    name: "🌽 You are Corn",
    roast: "Sweet? Sure. Memorable? Only when you’re stuck in someone’s teeth. You peaked as movie theater popcorn—now you're just corny."
  },
  {
    name: "🍆 You are Eggplant",
    roast: "The internet thinks you’re spicy, but in reality, most people avoid you unless you’re hidden in a curry. You're an awkward emoji, and an even more awkward vegetable."
  },
  {
    name: "🥕 You are Carrot",
    roast: "Living proof healthy doesn’t equal fun. Even rabbits fake excitement when they see you. Try harder, Bugs isn’t calling."
  },
  {
    name: "🧅 You are Onion",
    roast: "Layers for days, tears for years. People spend more time crying over you than enjoying your company."
  },
  {
    name: "🫑 You are Bell Pepper",
    roast: "All the colors, zero excitement. People keep discovering new ways to ignore you in fajitas."
  },
  {
    name: "🍌 You are Banana",
    roast: "You peak for three days, then it's over—much like your sense of humor. Slippery personality, bruised ego."
  },
  {
    name: "🍉 You are Watermelon",
    roast: "Loved at every picnic—until people realize they have to spit out your seeds. You’re 99% water, 1% personality."
  },
  {
    name: "🍒 You are Cherry",
    roast: "Tiny, tart, and gone before anyone notices. You only show up in fake flavorings and slot machines."
  },
  {
    name: "🫛 You are Peapod",
    roast: "People enjoy opening up to you... then discard you for what's inside. The pod nobody remembers."
  },
  {
    name: "🍍 You are Pineapple",
    roast: "Tough on the outside, awkward on pizza. Most painful when people get too close. You call it character, others call it spikes."
  },
  {
    name: "🍏 You are Green Apple",
    roast: "Trying so hard to be liked, but still losing to red apples. The Granny Smith of awkwardness."
  },
  {
    name: "🍑 You are Peach",
    roast: "People only care about you for a single emoji meaning. Fuzzy around the edges and worst in a fruit salad."
  },
  {
    name: "🍇 You are Grapes",
    roast: "Everyone prefers you as wine. In bunches, but always left at the bottom of the fruit bowl."
  },
  {
    name: "🍐 You are Pear",
    roast: "The knockoff apple of the produce world. Soft where you should be firm, and found in every fruit basket no one asked for."
  },
  {
    name: "🥬 You are Lettuce",
    roast: "You've got more crunch than character. Even your name sounds like a filler. People literally toss you around."
  },
  {
    name: "🥒 You are Cucumber",
    roast: "Cool, but boring to the core. Can’t decide if you're destined for salads, sandwiches, or a lifetime as a pickle."
  },
  {
    name: "🥭 You are Mango",
    roast: "Worldwide superstar, but impossible to eat with dignity. Sticky, sweet, and instantly messy."
  },
  {
    name: "🥥 You are Coconut",
    roast: "Hardest to get to know. High-maintenance on the outside; inside, it’s even weirder."
  },
  {
    name: "🍋 You are Lemon",
    roast: "Sharp, sour, and the prime example of life giving you problems. Great in tea, tough in conversation."
  },
  {
    name: "🫐 You are Blueberry",
    roast: "Tiny, mysterious, and you stain everything you touch. Decent in muffins, invisible everywhere else."
  }
];

      const randomMatch = veggies[Math.floor(Math.random() * veggies.length)];
      sessionStorage.setItem("matchResult", JSON.stringify(randomMatch));
      window.location.href = "output.html";
    }, 4000); // 4-second fake processing
  }

  // OUTPUT PAGE LOGIC
  if (document.body.classList.contains("output-page")) {
    // User's uploaded image
    const image = sessionStorage.getItem("uploadedImage");
    const userFace = document.getElementById("userFace");
    if (userFace && image) {
      userFace.src = image;
    }

    // Matched veggie/fruity + roast
    const lottieContainer = document.getElementById("lottieContainer");
    const roastText = document.querySelector(".roast-text");
    const fruitName = document.querySelector(".fruit-name");
    const match = JSON.parse(sessionStorage.getItem("matchResult")) || {
      name: "🍅 You are a Tomato",
      roast: "Adorably round. Unfortunately, so is a squashed tomato.",
      animation: "lottie/tomato.json"
    };

    fruitName.innerText = match.name;
    roastText.innerText = match.roast;

    // Lottie animation
    lottie.loadAnimation({
      container: lottieContainer,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: match.animation
    });

    // Optional: Speak roast
    const msg = new SpeechSynthesisUtterance(match.roast);
    msg.pitch = 0.8;
    msg.rate = 1;
    speechSynthesis.speak(msg);
  }
});
