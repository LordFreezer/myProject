import './style.css' assert { type: 'css' };
//import * as THREE from 'https://cdn.skypack.dev/three';
//import { OrbitControls } from 'https://rawgit.com/mrdoob/three.js/dev/examples/jsm/controls/OrbitControls.js';
import * as THREE from '../myProject/build/three.module.js';
import { OrbitControls } from '../myProject/examples/jsm/controls/OrbitControls.js';
var objects = [];

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerHeight / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0x3C3837 });
const torus = new THREE.Mesh(geometry, material);
scene.add(torus);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

const ambientLight = new THREE.AmbientLight(0xffffff);
pointLight.position.set(5, 5, 5);
scene.add(ambientLight);

const lightHelper = new THREE.PointLightHelper(pointLight);
scene.add(lightHelper);

const gridHelper = new THREE.GridHelper(200, 5);
scene.add(gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);


function addStar() {
  const geometry = new THREE.TorusKnotGeometry(0.25, 0.1);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
  star.position.set(x, y, z);
  scene.add(star);


}
Array(200).fill().forEach(addStar);

const splatTexture = new THREE.TextureLoader().load('splat.jpg');
scene.background = splatTexture;

const fanTexture = new THREE.TextureLoader().load('fan.jpg');
const fan = new THREE.Mesh(
  new THREE.SphereGeometry(5, 32, 32),
  new THREE.MeshBasicMaterial({ map: fanTexture })
);

scene.add(fan);



function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;
  controls.update();

  renderer.render(scene, camera);
}
animate();
