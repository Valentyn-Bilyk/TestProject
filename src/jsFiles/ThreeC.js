// import * as THREE from "three";

// const sizes = {
//   with: window.innerWidth,
//   height: window.innerHeight,
// };

// export const ThreeC = {
//   canvas: null,
//   scene: null,
//   renderer: null,
//   ambientLight: null,
//   directionalLight: null,
//   camera: null,
//   init: function () {
//     this.canvas = document.querySelector(".canvas");
    
//     this.scene = new THREE.Scene();

//     this.ambientLight = new THREE.AmbientLight(0xffffff, 2);
//     this.scene.add(this.ambientLight);
    
//     this.directionalLight = new THREE.DirectionalLight(0xffffff, 1);
//     this.directionalLight.position.set(1, 0.25, 0);
//     this.scene.add(this.directionalLight);
    
//     this.camera = new THREE.PerspectiveCamera(75, sizes.with / sizes.height);
//     this.camera.position.z = 6;
//     this.camera.position.y = 6;
//     this.camera.position.x = -3;
    
//     this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas });
//     this.renderer.setSize(sizes.with, sizes.height);

//    this.renderer.render(this.scene, this.camera);
//   }, 
//   dow(npc) {
//     this.scene.add(npc);
//     console.log(this.scene)
//   }
// }
