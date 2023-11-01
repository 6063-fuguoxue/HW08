let mImage, mImage_copy, ghost;
let xOff, yOff;
let ghost_offx = 591, ghost_offy = 132, ghost_w, ghost_h;

// Use DOM elements to help determine the tolerance range of each color
let SIMILARITY_VALUE = 28; // This is a good similarity value that I tested out
// let slider_ghost_offx, slider_ghost_offy, slider_ghost_w;
let slider_similarity, slider_change_black;

// Define Mondriaan Color objects
let Mondriaan_Red = { r: 218, g: 63, b: 39 };
let Mondriaan_Blue = { r: 0, g: 65, b: 120 };
let Mondriaan_Yellow = { r: 236, g: 189, b: 72 };
let Mondriaan_Black = { r: 22, g: 27, b: 2 };


function preload() {
  mImage = loadImage("./imgs/Piet_Mondriaan.jpg");
  mImage_copy = loadImage("./imgs/Piet_Mondriaan.jpg"); // load a copy of the image to modify and display
  ghost = loadImage("./imgs/ghost-lamp.gif");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1); 
  mImage.resize(0, height); 
  mImage_copy.resize(0, height); 
  ghost_w = ghost.width*width/1920;
  ghost_h = ghost.height*height/937;
  if (ghost_h < ghost_w) {
    ghost.resize(ghost_w, 0);
  } else {
    ghost.resize(0, ghost_h);
  }
  

  // Offset of Mondriaan
  xOff = (width - mImage_copy.width) / 2;
  yOff = (height - mImage_copy.height) / 2;

  // Slider for different similarity_value
  slider_similarity = createSlider(0, 100, 28, 1);
  slider_similarity.position(10, 10);
  slider_similarity.style("width", 400 + "px");

  // // Slider for image x-position
  // slider_ghost_offx = createSlider(0, width - ghost.width, 591, 1);
  // slider_ghost_offx.position(10, 110);
  // slider_ghost_offx.style("width", 400 + "px");
  // // Slider for image y-position
  // slider_ghost_offy = createSlider(0, height - ghost.height, 132, 1);
  // slider_ghost_offy.position(10, 210);
  // slider_ghost_offy.style("width", 400 + "px");
  // // Slider for image width
  // slider_ghost_w = createSlider(0, 1000, ghost.width, 1);
  // slider_ghost_w.position(10, 310);
  // slider_ghost_w.style("width", 400 + "px");

  // Slider for a new color to replace the black color
  slider_change_black = createSlider(0, 255, 127, 1);
  slider_change_black.position(10, 110);
  slider_change_black.style("width", 400 + "px");
}

function draw() {
  background(0);
  SIMILARITY_VALUE = slider_similarity.value();
  // ghost_offx = slider_ghost_offx.value();
  // ghost_offy = slider_ghost_offy.value();
  // ghost_w = slider_ghost_w.value();  

  mImage.loadPixels();
  mImage_copy.loadPixels();

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

  mImage_copy.updatePixels(); // Update all the pixels

  // Put ghost behind the biggest red square
  push();
  translate(ghost_offx, ghost_offy);
  image(ghost, 0, 0);
  pop();
  // Put the modified mImage_copy on canvas
  push();
  translate(xOff, yOff);
  image(mImage_copy, 0, 0);
  pop();
}

function isSimilar(pixelIndex, presetColor) {
  // Get the RGBA value of the current pixel
  let redVal = mImage.pixels[pixelIndex + 0];
  let greenVal = mImage.pixels[pixelIndex + 1];
  let blueVal = mImage.pixels[pixelIndex + 2];

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

function changeRed(pixelIndex) { // If the pixel is Mondriaan red, change it to transparent
  mImage_copy.pixels[pixelIndex + 3] = 0;

}

function changeBlue(pixelIndex) { // If the pixel is Mondriaan red, change its color
  mImage_copy.pixels[pixelIndex + 0] = 248; // new R value
  mImage_copy.pixels[pixelIndex + 1] = 112; // new G value
  mImage_copy.pixels[pixelIndex + 2] = 96; // new B value
}

function changeYellow(pixelIndex) { // If the pixel is Mondriaan red, change its color
  mImage_copy.pixels[pixelIndex + 0] = 184; // new R value
  mImage_copy.pixels[pixelIndex + 1] = 184; // new G value
  mImage_copy.pixels[pixelIndex + 2] = 243; // new B value
}

function changeBlack(pixelIndex) { // If the pixel is Mondriaan red, change its color
  // Change color by using the second slider
  let val = slider_change_black.value();
  mImage_copy.pixels[pixelIndex + 0] = val; // new R value
  mImage_copy.pixels[pixelIndex + 1] = val; // new G value
  mImage_copy.pixels[pixelIndex + 2] = val; // new B value
}