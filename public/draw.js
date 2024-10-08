
let x = [];
let y = [];
let fourierX;
let fourierY;
let time = 0;
let path = [];
let yShift = 0;
let xShift = -400;

function setup() {
  createCanvas(1000, 600);
  const skip = 8;
  for (let i = 0; i < drawing.length; i++) {
    x.push(drawing[i].x + xShift);
    y.push(drawing[i].y + yShift);
  }
  fourierX = dft(x);
  fourierY = dft(y);

  fourierX.sort((a, b) => b.amp - a.amp);
  fourierY.sort((a, b) => b.amp - a.amp); // Sorts the coordinates so the epicycles go in order from big to small.
}
function epiCycles(x, y, rotation, fourier) {
  for (let i = 0; i < fourier.length; i++) {
    let prevx = x;
    let prevy = y;
    let freq = fourier[i].freq;
    let radius = fourier[i].amp;
    let phase = fourier[i].phase;
    x += radius * cos(freq * time + phase + rotation);
    y += radius * sin(freq * time + phase + rotation);

    stroke(255, 100);
    noFill();
    ellipse(prevx, prevy, radius * 2);
    stroke(255);
    line(prevx, prevy, x, y);
  }
  return createVector(x, y);
}

function draw() {
  background(0);

  let vx = epiCycles(width / 2 + 50, 200, 0, fourierX); // X epicycle
  let vy = epiCycles(100, height / 2 + 50, HALF_PI, fourierY); // Y epicycle
  let v = createVector(vx.x, vy.y);
  path.unshift(v);
  line(vx.x, vx.y, v.x, v.y);
  line(vy.x, vy.y, v.x, v.y);

  beginShape();
  noFill();
  for (let i = 0; i < path.length; i++) {
    vertex(path[i].x, path[i].y);
  }
  endShape();

  const dt = TWO_PI / fourierY.length;
  time += dt;

  if (time > TWO_PI) {
    time = 0;
    path = [];
  }

}



