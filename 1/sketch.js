let song;
let samples;
let red = 0, green = 0, blue = 0;
let glassBuffer = 15;
let bubble_x, bubble_y;
let offSet = 100;

function preload() {
  song = loadSound("./va11halla.mp3");
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  samples = song.getPeaks();
  print(samples.length);

  // Set up the DOM button for background change
  button = createButton('change background');
  button.position(width/4 - 50, 50);
  button.mousePressed(changeBG);

  // Set up the DOM button for random bubbles generation
  button = createButton('generate bubbles');
  button.position(width/4*3 - 100, 50);
  button.mousePressed(generateBubbles);
}



function draw() {
  background(red, green, blue, 20);
  if (song.isPlaying()) {
    noStroke();
    let tPos = song.currentTime() / song.duration(); // Current time position of the playing song
    let currentSampleIndex = floor(tPos*samples.length);
    let val = samples[currentSampleIndex];
    if (val > 0.2) {
      let lineStart_x = random(0, width);
      let lineStart_y = random(0, height/3*2);
      push();
      translate(lineStart_x, lineStart_y);      
      rotate(random(2*PI));
      stroke(random(255),random(255),random(255));
      strokeWeight(5);
      line(0, 0, val*400, 0);
      pop();

    } else if (val < 0) {
      let rectStart_x = random(0, width);
      let rectStart_y = random(0, height/3*2);
      push();
      translate(rectStart_x, rectStart_y);
      rectMode(CENTER);      
      rotate(random(2*PI));
      stroke(random(255),random(255),random(255),255);
      strokeWeight(5);
      fill(random(255),random(255),random(255),100);
      rect(0, 0, val*300, val*300);
      pop();
    } else {
      let circle_d = val*200;
      let circle_x = random(0, width);
      let circle_y = random(height/3*2, height);
      fill(random(255),random(255),random(255));
      ellipse(circle_x, circle_y, circle_d, circle_d);
    }
  }
  drawGlass();
}

function drawGlass() {
  push();
  translate(width/2, height/2);
  translate(0, offSet);

  // Draw the fruit
  strokeWeight(5);
  stroke(255, 255, 0, 200);
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
  fill(255 - red, 255 - green, 255 - blue,50);
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
  translate(0, offSet);
  for (i=0; i<10; i++) {
    bubble();
  }
  pop();
}

function bubble() {
  bubble_x = random(-200, 200);
  if (bubble_x < 0) {
    bubble_y = random(-200, (bubble_x - glassBuffer));
  } else if (bubble_x > 0) {
    bubble_y = random(-200, (-bubble_x - glassBuffer));
  } else {
    bubble_y = random(-200, -glassBuffer);
  }
  
  stroke(255);
  fill(255);
  ellipse(bubble_x, bubble_y, 10, 10);
}

function keyReleased() {
  if (key == "s") {
    song.stop();
  } else if (key == "p") {
    if (song.isPlaying()) {
      song.pause();
    } else {
      song.play();
    }
  }
}