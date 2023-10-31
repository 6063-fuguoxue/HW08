let song;
let samples;
let red = 0, green = 0, blue = 0;

function preload() {
  song = loadSound("./va11halla.mp3");
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  samples = song.getPeaks();

  // Set up the DOM button for background change
  button = createButton('change background');
  button.position(0, 0);
  button.mousePressed(changeBG);

  // Set up the DOM button for random bubbles generation
  button = createButton('generate bubbles');
  button.position(0, 50);
  button.mousePressed(generateBubbles);
}

function draw() {
  background(red, green, blue, 80);
  drawGlass();
}

function drawGlass() {
  push();
  translate(width/2, height/2);
  translate(0, 50);

  // Draw the fruit
  strokeWeight(5);
  stroke(255, 165, 0, 200);
  fill(255, 165, 0, 200);
  translate(300, -300);
  rotate(PI);
  arc(0, 0, 200, 200, 0, 7/4*PI);
  stroke(255, 255, 0, 200);
  rotate(-PI);
  for (let i=0; i<6; i++) {
    line(0, 0, -67, -67); 
    rotate(PI/4);
  }
  rotate(-PI/4*6);
  translate(-300, 300);
  
  // Draw the glass
  noStroke();
  fill(255 - red, 255 - green, 255 - blue,150);
  triangle(0, 0, 200, -200, -200, -200);
  noFill();
  stroke(255 - red, 255 - green, 255 - blue, 255);
  triangle(0, 0, 300, -300, -300, -300);
  line(0, 0, 0, 300);
  line(-200, 300, 200, 300);

  pop();
}

function changeBG() {
  red = random(255);
  green = random(255);
  blue = random(255);
}

function generateBubbles() {
  push();
  translate(width/2, height/2);
  translate(0, 50);
  for (i=0; i<10; i++) {
    bubble();
  }
  pop();
}
function bubble() {
  let bubble_x = random(-200, 200);
  let bubble_y = random(-200, 0);
  stroke(255);
  fill(255);
  ellipse(bubble_x, bubble_y, 10, 10);
}