import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { CharacterC } from "./CharacterC";
import { MapC } from "./MapC";
import { ThreeC } from "./ThreeC";
import * as CANNON from 'cannon-es'
import CannonDebugger from 'cannon-es-debugger'
import TWEEN from '@tweenjs/tween.js'

ThreeC.init();

export const world = new CANNON.World()
export const cannonDebugger = new CannonDebugger(ThreeC.scene, world, {
    // options...
  })

const gltfLoader = new GLTFLoader();

gltfLoader.load("/GLB/Map.glb", (map) => {
  ThreeC.scene.add(map.scene);
  MapC.init(map);
});

gltfLoader.load("/GLB/Character.glb", (character) => {
  ThreeC.scene.add(character.scene);
  CharacterC.init(character);
});

const progressBar = document.querySelector(".progressUpdate");
function updateProgress(percent) {
  progressBar.style.width = percent + "vw";
}

let count = 0;
const clock = new THREE.Clock();
let previousTime = 0;
let wsef = 0;
function animate() {
  const elapsedTime = clock.getElapsedTime();
  const deltaTime = elapsedTime - previousTime;
  previousTime = elapsedTime;

  world.fixedStep();
  cannonDebugger.update();

  if(CharacterC)
    CharacterC.update(deltaTime);

  if (wsef < 41) {
    updateProgress(wsef);
    wsef++;
  } 

  TWEEN.update(deltaTime)
  ThreeC.update();
  count++;
  requestAnimationFrame(animate);
}

animate();
