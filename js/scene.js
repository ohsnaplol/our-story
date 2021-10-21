// tutorial: https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene

const scene = new THREE.Scene();
// first arg is fov, second is aspect ratio, third is near clipping plane, fourth is far clipping plane
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
/**
 * width and height of the canvas
 * if we want to lower render resolution, divide both args by two and set false as third arg
 */
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("container").appendChild(renderer.domElement);

/** 
 * BoxGeometry creates a cube by default.
 * the object contains all the points and fill/faces of the cube
 */
const geometry = new THREE.BoxGeometry();
const mateiral = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
/**
 * A mesh is an object that takes a geomatery, and applies a meterial to it
 * which we then can insert to our scene and move freely around
 */
const cube = new THREE.Mesh( geometry, mateiral );
/**
 * By default, scene.add() adds to coordinates (0,0,0).
 * This would cause both the camera and the cube to be inside each other.
 * To avoid this, we simply move the camera out a bit.
 */
scene.add(cube);

camera.position.z = 5;

// render loop 
function animate() {
  requestAnimationFrame( animate );
  renderer.render( scene, camera );
  // transform the cube
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
}
animate();

/** 
 * This will create a loop that causes the renderer to draw the scene every time the screen is refreshed 
 * (on a typical screen this means 60 times per second). If you're new to writing games in the browser, 
 * you might say "why don't we just create a setInterval ?" The thing is - we could, but 
 * requestAnimationFrame has a number of advantages. Perhaps the most important one is that it pauses 
 * when the user navigates to another browser tab, hence not wasting their precious processing power and 
 * battery life.
 */