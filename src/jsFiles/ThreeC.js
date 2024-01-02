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

    this.camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);

    this.lightSettings();

    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas });
    if (this.renderer) this.renderer.shadowMap.enabled = true;
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
      this.camera.position.copy(characterPosition).add(offset);
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
  lightSettings() {
    this.ambientLight = new THREE.AmbientLight(0xffffff, 2);
    this.scene.add(this.ambientLight);

    this.directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    this.directionalLight.position.set(47, 70, -20);
    this.directionalLight.castShadow = true;
    this.directionalLight.shadow.camera.top = 20;
    this.directionalLight.shadow.camera.right = 50;
    this.directionalLight.shadow.camera.bottom = -40;
    this.directionalLight.shadow.camera.left = -50;
    this.scene.add(this.directionalLight);
  },
  createSmoke() {
    const smokeTexture = new THREE.TextureLoader().load("FX/Character_trail.webp");
    const smoke = new THREE.Mesh(
      new THREE.BoxGeometry(4, 1, 1),
      new THREE.MeshLambertMaterial({
        map: smokeTexture,
        opacity: 1,
        transparent: true,
      })
    );
    smoke.name = 'smokeElement'
    this.scene.add(smoke);
    this.updateSmokePosition(smoke)
    setTimeout(() => {
      this.removeSmoke()
    },1100)
  },
  removeSmoke() {
    const smokeElement = ThreeC.scene.getObjectByName('smokeElement');
    if (smokeElement) {
      ThreeC.scene.remove(smokeElement);
    }
  },
  updateSmokePosition(smokeElement) {
    if (smokeElement) {
      smokeElement.position.copy(CharacterC.position).add(new THREE.Vector3(-2, 0, 0));
      // smokeElement.rotation.copy(CharacterC.rotation)
    }
  },
};
