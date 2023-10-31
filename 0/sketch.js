let mImage;
let xOff, yOff;
// let lastClickX = 0;

// Use DOM elements to help determine the tolerance range of each color
// let picker;
let SIMILARITY_VALUE = 28;

// let slider_similarity;
// Define Modriaan Color objects
let Mondriaan_Red = { r: 218, g: 63, b: 39 };
let Mondriaan_Blue = { r: 0, g: 65, b: 120 };
let Mondriaan_Yellow = { r: 236, g: 189, b: 72 };
let Mondriaan_Black = { r: 22, g: 27, b: 2 };


function preload() {
  mImage = loadImage("./imgs/Piet_Mondriaan.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1); 
  mImage.resize(0, height); 
  noLoop();
  xOff = (width - mImage.width) / 2;
  yOff = (height - mImage.height) / 2;

  // Place color picker on canvas
  // picker = createColorPicker(color(0));
  // picker.position(500, 500);
  // picker.style("width", width/5 + "px");
  // frameRate(4);

  // Place slider to change the similarity_value
  // slider_similarity = createSlider(0, 100, 30, 1);
  // slider_similarity.position(10, 10);
  // slider_similarity.style("width", width - 20 + "px");
}

function draw() {
  background(0);
  // SIMILARITY_VALUE = slider_similarity.value();

  mImage.loadPixels();

  for (let y = 0; y < mImage.height; y+=1) {
    for (let x = 0; x < mImage.width; x+=1) {
      let pixelIndex = 4* (y * mImage.width + x); // Keep track of where each pixel is

      // Check if close to Mondriaan_Red
      if (isSimilar(pixelIndex, Mondriaan_Red)) {
        changeRed(pixelIndex);
      }
      
      // Check if close to Mondriaan_Blue
      if (isSimilar(pixelIndex, Mondriaan_Blue)) {
        changeBlue(pixelIndex);
      }

      // Check if close to Mondriaan_Yellow
      if (isSimilar(pixelIndex, Mondriaan_Yellow)) {
        changeYellow(pixelIndex);
      }

      // Check if close to Mondriaan_Black
      if (isSimilar(pixelIndex, Mondriaan_Black)) {
        changeBlack(pixelIndex);
      }
    }
  }

  mImage.updatePixels(); // Update all the pixels

  push();
  translate(xOff, yOff);
  image(mImage, 0, 0);
  pop();
}

function isSimilar(pixelIndex, presetColor) {
  // Get the RGBA value of the current pixel
  let redVal = mImage.pixels[pixelIndex + 0];
  let greenVal = mImage.pixels[pixelIndex + 1];
  let blueVal = mImage.pixels[pixelIndex + 2];
  // let alphaVal = mImage.pixels[pixelIndex + 3];

  // if ((abs(redVal - presetColor.r) < similarity_value) && (abs(greenVal - presetColor.g) < similarity_value) && (abs(blueVal - presetColor.b) < similarity_value)) {
  //   return true;
  // } else {
  //   return false;
  // }

  let d = distance(redVal, greenVal, blueVal, presetColor.r, presetColor.g, presetColor.b);

  if (d <= SIMILARITY_VALUE) {
    return true;
  } else {
    return false;
  }

}

function distance(r1, g1, b1, r2, g2, b2) {
  return sqrt(0.3*pow((r1 - r2), 2) + 0.59*pow((g1 - g2), 2) + 0.11*pow((b1 - b2), 2));
}

function changeRed(pixelIndex) { // If the pixel is Modriaan red, change its color
  mImage.pixels[pixelIndex + 0] = 128; // new R value
  mImage.pixels[pixelIndex + 1] = 211; // new G value
  mImage.pixels[pixelIndex + 2] = 155; // new B value

}

function changeBlue(pixelIndex) { // If the pixel is Modriaan red, change its color
  mImage.pixels[pixelIndex + 0] = 248; // new R value
  mImage.pixels[pixelIndex + 1] = 112; // new G value
  mImage.pixels[pixelIndex + 2] = 96; // new B value
}

function changeYellow(pixelIndex) { // If the pixel is Modriaan red, change its color
  mImage.pixels[pixelIndex + 0] = 184; // new R value
  mImage.pixels[pixelIndex + 1] = 184; // new G value
  mImage.pixels[pixelIndex + 2] = 243; // new B value
}

function changeBlack(pixelIndex) { // If the pixel is Modriaan red, change its color
  // Change color upon click
  // let val = map(lastClickX, 0, width, 0, 255);
  // mImage.pixels[pixelIndex + 0] = val; // new R value
  // mImage.pixels[pixelIndex + 1] = val; // new G value
  // mImage.pixels[pixelIndex + 2] = val; // new B value

  // Simple color change
  mImage.pixels[pixelIndex + 0] = 16; // new R value
  mImage.pixels[pixelIndex + 1] = 37; // new G value
  mImage.pixels[pixelIndex + 2] = 66; // new B value
}

// function mouseClicked() {
//   lastClickX = mouseX;
// }