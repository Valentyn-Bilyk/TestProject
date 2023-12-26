import * as THREE from "three";
import { CharacterC } from "./CharacterC";

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

export const ThreeC = {
  canvas: null,
  scene: null,
  renderer: null,
  ambientLight: null,
  directionalLight: null,
  camera: null,
  init: function () {
    this.canvas = document.querySelector(".canvas");

    this.scene = new THREE.Scene();

    this.ambientLight = new THREE.AmbientLight(0xffffff, 2);
    this.scene.add(this.ambientLight);

    this.directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    this.directionalLight.position.set(1, 0.25, 0);
    this.scene.add(this.directionalLight);

    this.camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);

    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas });
    this.renderer.setSize(sizes.width, sizes.height);
  },
  update() {
    this.cameraUpdate();
    this.renderer.render(this.scene, this.camera);
  },
  cameraUpdate() {
    const isLandscape = window.matchMedia("(orientation: landscape)").matches;
    const offsetLandscape = new THREE.Vector3(-3, 8, 7);
    const offsetPortrait = new THREE.Vector3(-3, 7.5, 6);
    const fovLandscape = 45;
    const fovPortrait = 75;

    const offset = isLandscape ? offsetLandscape : offsetPortrait;
    const fov = isLandscape ? fovLandscape : fovPortrait;
    if (CharacterC.physicsBody && this.camera.position) {
      const characterPosition = CharacterC.position;
      this.camera.position.copy(characterPosition).add(offset)
      this.camera.lookAt(
        new THREE.Vector3(
          CharacterC.physicsBody.position.x,
          CharacterC.position.y,
          CharacterC.physicsBody.position.z
        )
      );
      this.camera.fov = fov;
      this.camera.updateProjectionMatrix();
    }
  },
};
