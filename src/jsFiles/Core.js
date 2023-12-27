import * as THREE from "three";
import * as CANNON from 'cannon-es'
import TWEEN from '@tweenjs/tween.js'
import CannonDebugger from 'cannon-es-debugger'

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { CharacterC } from "./CharacterC";
import { MapC } from "./MapC";
import { ThreeC } from "./ThreeC";
import { HouseTrigger, ShopTrigger, WallsTrigger } from "./GameTriggers";

ThreeC.init();

export const world = new CANNON.World()
export const cannonDebugger = new CannonDebugger(ThreeC.scene, world, {})

const gltfLoader = new GLTFLoader();

ShopTrigger.initWorld(world)
HouseTrigger.initWorld(world)
WallsTrigger.initWorld(world)

gltfLoader.load("/GLB/Map.glb", (map) => {
  ThreeC.scene.add(map.scene);
  MapC.init(map);
});

gltfLoader.load("/GLB/Character.glb", (character) => {
  ThreeC.scene.add(character.scene);
  CharacterC.init(character);
});

const clock = new THREE.Clock();
let previousTime = 0;

function animate() {
  const elapsedTime = clock.getElapsedTime();
  const deltaTime = elapsedTime - previousTime;
  previousTime = elapsedTime;

  world.fixedStep();
  cannonDebugger.update();
  if(CharacterC) CharacterC.update(deltaTime);

  TWEEN.update()
  ThreeC.update();

  requestAnimationFrame(animate);
}

animate();
