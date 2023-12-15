import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { CharacterC } from "./CharacterC";
import { MapC } from "./MapC";

const canvas = document.querySelector(".canvas");

const scene = new THREE.Scene();

const gltfLoader = new GLTFLoader();

gltfLoader.load("/GLB/Map.glb", (map) => {
  scene.add(map.scene);
  MapC.init(map)
});

gltfLoader.load("/GLB/Character.glb", (character) => {
  scene.add(character.scene);
  CharacterC.init(character);
});

const sizes = {
  with: window.innerWidth,
  height: window.innerHeight,
};

// refactor - move to ThreeC.js

const ambientLIght = new THREE.AmbientLight(0xffffff, 2);
scene.add(ambientLIght);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(1, 0.25, 0);
scene.add(directionalLight);

const camera = new THREE.PerspectiveCamera(75, sizes.with / sizes.height);
camera.position.z = 6;
camera.position.y = 6;
camera.position.x = -3;

const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.with, sizes.height);

const clock = new THREE.Clock()
let previousTime = 0
function animate() {
  const elapsedTime = clock.getElapsedTime()
  const deltaTime = elapsedTime - previousTime
  previousTime = elapsedTime
  
  CharacterC.update(deltaTime);
  
  camera.position.x += CharacterC.velocity.x
  camera.position.z += CharacterC.velocity.z

  camera.lookAt(new THREE.Vector3(CharacterC.position.x, CharacterC.position.y, CharacterC.position.z))
  
  renderer.render(scene, camera);

  requestAnimationFrame(animate);
}

animate();
