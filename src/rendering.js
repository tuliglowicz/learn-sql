const renderer = new THREE.WebGLRenderer();
renderer.setSize( WIDTH, HEIGHT );
renderer.setPixelRatio( window.devicePixelRatio );
document.body.appendChild( renderer.domElement );

const camera = new THREE.PerspectiveCamera( 45, WIDTH / HEIGHT, 1, 500 );
camera.position.set( 0,  0, 100 );
camera.lookAt( 0, 0, 0 );

const scene = new THREE.Scene();

var axesHelper = new THREE.AxesHelper( 50 );
scene.add( axesHelper );

const geometry = new THREE.BufferGeometry();

const material = new THREE.PointsMaterial({
  size: 0.5,
  color: 0xFFFFFF,
  vertexColors: THREE.VertexColors,
});

const points = new THREE.Points( geometry, material );

var controls = new THREE.OrbitControls(camera, renderer.domElement);

scene.add( points );

const animate = function () {
  requestAnimationFrame( animate );

  // points.rotation.x += 0.0005;
  // points.rotation.y += 0.0001;
  // points.rotation.z += 0.0002;

  renderer.render( scene, camera );
};

// renderer.render( scene, camera );

animate();