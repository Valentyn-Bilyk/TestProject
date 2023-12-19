import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { CharacterC } from "./CharacterC";
import { MapC } from "./MapC";
import {ThreeC} from './ThreeC'
import { world } from "./physicsC";

ThreeC.init()

const gltfLoader = new GLTFLoader();

gltfLoader.load("/GLB/Map.glb", (map) => {
  ThreeC.scene.add(map.scene);
  MapC.init(map)
});

gltfLoader.load("/GLB/Character.glb", (character) => {
  ThreeC.scene.add(character.scene);
  CharacterC.init(character);
});

const clock = new THREE.Clock()
let previousTime = 0
function animate() {
  const elapsedTime = clock.getElapsedTime()
  const deltaTime = elapsedTime - previousTime
  previousTime = elapsedTime
  
  world.step(1/60, deltaTime, 3)
  CharacterC.update(deltaTime);
  
  ThreeC.update()
  requestAnimationFrame(animate);
}

animate();
