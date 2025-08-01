// 1️⃣ Load face-api models
async function loadModels() {
  const MODEL_URL = '/models';
  await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
  await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
  console.log("✅ Models loaded");
}
loadModels(); // call it right away

// 2️⃣ Image upload + preview
const imageUpload = document.getElementById('imageUpload');
const previewImg = document.getElementById('preview');

imageUpload.addEventListener('change', async () => {
  const file = imageUpload.files[0];
  const image = await faceapi.bufferToImage(file);
  previewImg.src = image.src;
  detectFace(previewImg);
});

// 3️⃣ Detect face and get landmarks
async function detectFace(image) {
  const detection = await faceapi
    .detectSingleFace(image, new faceapi.TinyFaceDetectorOptions())
    .withFaceLandmarks();

  if (!detection) {
    alert("No face found 😢");
    return;
  }

  const landmarks = detection.landmarks;
  const matchedVeggie = getMatchingVeggie(landmarks);
  showResult(matchedVeggie);
}

// 4️⃣ Match veggie based on face shape (dummy logic)
function getMatchingVeggie(landmarks) {
  const jaw = landmarks.getJawOutline();
  const width = jaw[jaw.length - 1].x - jaw[0].x;

  if (width < 100) return "🥕 Carrot";
  if (width < 150) return "🍅 Tomato";
  return "🥔 Potato";
}

// 5️⃣ Show result
function showResult(veggie) {
  document.getElementById('result').innerText = `You're a ${veggie}!`;
}
