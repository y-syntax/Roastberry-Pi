// Load models from a local folder or a URL
async function loadModels() {
  const MODEL_URL = '/models'; // update if needed

  await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
  await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);

  console.log("Models loaded ✅");
}

loadModels();
