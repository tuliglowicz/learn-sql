const getPoint = (R) => {
  var theta = Math.random() * 2.0*Math.PI;
  var phi = Math.random() * Math.PI;
  var r = Math.random() * R;
  var sinTheta = Math.sin(theta); var cosTheta = Math.cos(theta);
  var sinPhi = Math.sin(phi); var cosPhi = Math.cos(phi);
  var x = r * sinPhi * cosTheta;
  var y = r * sinPhi * sinTheta;
  var z = r * cosPhi;
  return [x, y, z];
}

// function getPoint2(N) {
//   var u = Math.random();
//   var x1 = Math.random() * N;
//   var x2 = Math.random() * N;
//   var x3 = Math.random() * N;

//   var mag = Math.sqrt(x1*x1 + x2*x2 + x3*x3);
//   x1 /= mag; x2 /= mag; x3 /= mag;

//   // Math.cbrt is cube root
//   var c = Math.cbrt(N);

//   return [x1*c, x2*c, x3*c];
// }

var vertices = [];

const restoreVertices = () => {
  vertices = [];
  for(let i = 0; i < 5e5; i++){
    vertices.push(...getPoint(100));
  }
}