// require https://cdn.jsdelivr.net/npm/p5@latest/lib/p5.min.js

va
var amplitude = 2;
var w = 40;

function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  noiseDetail(1);
  // start position
  pos1 = createVector(w * floor(random(0, 6)), w * floor(random(0, 6)));
  // enc position
  pos2 = createVector(-w * floor(random(0, 6)), -w * floor(random(0, 6)));
}

function draw() {
  background(0);

  translate(0, 0, -600);
  rotateX(40);
  rotateZ(frameCount / 2);

  var start = frameCount / 100;
  var xoff = 0;
  for (var x = -width / 2; x < width / 2; x += w) {
    var yoff = 0;
    for (var y = -height / 2; y < height / 2; y += w) {
      // box height
      var h = map(noise(xoff + start, yoff + start), 0, 1, -100, 100) * amplitude;
      // box color
      var r = map(x, -width / 2, width / 2, 10, 255);
      var g = map(y, -height / 2, height / 2, 25, 100);
      var b = map(h, -100, 100, 100, 25);
      // display box
      push();
      stroke(255, 60);
      fill(r, g, b, 40);
      translate(x, y, -h / 2);
      box(w, w, h);
      pop();
      yoff += inc;
    }
    xoff += inc;
  }

  // start & end & route
  push();
  // start position
  push();
  noStroke();
  fill(255, 80);
  translate(pos1.x, pos1.y, 100);
  box(w, w, 120);
  fill(255);
  translate(0, 0, 90);
  sphere(w / 16);
  pop();
  // end position
  push();
  noStroke();
  fill(255, 80);
  translate(pos2.x, pos2.y, 100);
  box(w, w, 100);
  fill(255);
  translate(0, 0, 90);
  sphere(w / 16);
  pop();
  // route
  push();
  stroke(255);
  noFill();
  beginShape();
  curveVertex(pos2.x, pos2.y, 200);
  curveVertex(pos2.x, pos2.y, 200);
  curveVertex(pos2.x + noise(pos2.x, frameCount) * w * 2, pos2.y + noise(pos2.y, frameCount) * w * 2, 240);
  curveVertex(pos2.x + noise(pos2.x, frameCount) * w * 4, pos2.y + noise(pos2.y, frameCount) * w * 4, 280);
  curveVertex(pos2.x + noise(pos2.x, frameCount) * w * 6, pos2.y + noise(pos2.y, frameCount) * w * 6, 320);
  curveVertex(pos2.x + noise(pos1.x, frameCount) * w * 6, pos2.y + noise(pos1.y, frameCount) * w * 6, 320);
  curveVertex(pos1.x - noise(pos1.x, frameCount) * w * 4, pos1.y - noise(pos1.y, frameCount) * w * 4, 280);
  curveVertex(pos1.x - noise(pos1.x, frameCount) * w * 2, pos1.y - noise(pos1.y, frameCount) * w * 2, 240);
  curveVertex(pos1.x, pos1.y, 200);
  curveVertex(pos1.x, pos1.y, 200);
  endShape();
  pop();
  pop();

  // save image
  let lapse = 0;    // mouse timer
  function mousePressed() {
    // prevents mouse press from registering twice
    if (millis() - lapse > 400) {
      save("img_" + month() + '-' + day() + '_' + hour() + '-' + minute() + '-' + second() + ".jpg");
      lapse = millis();
    }
  }
}




