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
    this.camera.position.z = 3;
    this.camera.position.y = 7.5;
    this.camera.position.x = -5;

  
    // const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), new THREE.MeshBasicMaterial({ color: 0x00ff00 }));
    // this.scene.add(sphere);
    // sphere.position.set(40.3, 0, -5.1)
  
    const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), new THREE.MeshBasicMaterial({ color: 0x00ff00 }));
    this.scene.add(sphere);
    sphere.position.set(33.15, 0, -26.65)

    // const houseEnter = new THREE.Mesh(new THREE.BoxGeometry(2, 2, 2), new THREE.MeshBasicMaterial({ color: 0x00ff00 }));
    // this.scene.add(houseEnter);
    // houseEnter.position.set(32.7, 0, -21.3)

    const character = new THREE.Mesh(new THREE.BoxGeometry(0.3, 2, 0.3), new THREE.MeshBasicMaterial({ color: 0x00ff00 }));
    this.scene.add(character);

    const colid = new THREE.Mesh(new THREE.BoxGeometry(2.026, 4.5, 0.281), new THREE.MeshBasicMaterial({ color: 0x00ff00 }));
    this.scene.add(colid);
    colid.position.set(10.77082633972168, 0, 2.043994426727295)
    colid.rotation.set(-3.141592653589793, 0.7919267092235103, -3.141592653589793)
    colid.scale.set(0.9924143552780151, 1, 8.573287010192871)


    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas });
    this.renderer.setSize(sizes.width, sizes.height);
  },
  update() {
    this.cameraUpdate();
    this.renderer.render(this.scene, this.camera);
  },
  cameraUpdate() {
    this.camera.position.x += CharacterC.velocity.x;
    this.camera.position.z += CharacterC.velocity.z;

    this.camera.lookAt(
      new THREE.Vector3(
        CharacterC.position.x,
        CharacterC.position.y,
        CharacterC.position.z
      )
    );
  },
};
