import * as THREE from 'three';
import { Bike } from './bike.js';
import { Road } from './road.js';
import { Input } from './utils.js';
import { Traffic } from './traffic.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x111111);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.y = 5;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(10, 20, 10);
scene.add(light);

const input = new Input();
const bike = new Bike(scene, camera);
const road = new Road(scene);
const traffic = new Traffic(scene);

const clock = new THREE.Clock();
let gameOver = false;

function animate() {
  if (gameOver) return;

  const delta = clock.getDelta();
  requestAnimationFrame(animate);

  bike.update(delta, input);
  road.update(bike.model.position.z);
  traffic.update(delta, bike.model.position.z);

  if (traffic.checkCollision(bike.model)) {
    gameOver = true;
    alert("💥 Game Over: You crashed!");
  }

  renderer.render(scene, camera);
}

animate();