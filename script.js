const photoInput = document.getElementById("photoInput");
const preview = document.getElementById("preview");
const brightness = document.getElementById("brightness");
const grayscale = document.getElementById("grayscale");
const contrast = document.getElementById("contrast");
const sepia = document.getElementById("sepia");
const blur = document.getElementById("blur");
const resetButton = document.getElementById("resetButton");
const clearButton = document.getElementById("clearButton");
const downloadButton = document.getElementById("downloadButton");

function updatePhoto() {
  preview.style.filter =
    `brightness(${brightness.value}%) ` +
    `grayscale(${grayscale.value}%) ` +
    `contrast(${contrast.value}%) ` +
    `sepia(${sepia.value}%) ` +
    `blur(${blur.value}px)`;
}

photoInput.addEventListener("change", () => {
  const photo = photoInput.files[0];
  if (photo) {
    preview.src = URL.createObjectURL(photo);
  }
});

[brightness, grayscale, contrast, sepia, blur].forEach((slider) => {
  slider.addEventListener("input", updatePhoto);
});

resetButton.addEventListener("click", () => {
  brightness.value = 100;
  grayscale.value = 0;
  contrast.value = 100;
  sepia.value = 0;
  blur.value = 0;
  updatePhoto();
});

clearButton.addEventListener("click", () => {
  preview.removeAttribute("src");
  photoInput.value = "";
  preview.style.filter = "none";
});

downloadButton.addEventListener("click", () => {
  if (!preview.src || !preview.complete || preview.naturalWidth === 0) {
    alert("Choose a photo first!");
    return;
  }

  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  canvas.width = preview.naturalWidth;
  canvas.height = preview.naturalHeight;
  context.filter = preview.style.filter;
  context.drawImage(preview, 0, 0);

  const link = document.createElement("a");
  link.download = "edited-photo.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
});