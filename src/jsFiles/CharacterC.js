import * as THREE from "three";
import CANNON from "cannon";
import {Trig} from './MapC'
import { world } from "./physicsC";

export let CharacterC = {
  animations: [],
  animationMixer: null,
  threeObj: null,
  actionIdle: null,
  actionWalk: null,
  physicsBody: null,
  position: { x: 0, y: 0, z: 0 },
  rotation: { x: 0, y: 0, z: 0 },
  velocity: { x: 0, y: 0, z: 0 },
  init: function (gltf_obj) {
    this.threeObj = gltf_obj.scene;
    this.animations = gltf_obj.animations;

    this.position = this.threeObj.position;
    // this.position.y = 0.15;

    this.rotation = gltf_obj.scene.rotation;

    this.animationMixer = new THREE.AnimationMixer(this.threeObj);
    this.actionIdle = this.animationMixer.clipAction(this.animations[2]);
    this.actionWalk = this.animationMixer.clipAction(this.animations[4]);

    CharacterC.initPhysics(world)
  },
  
  setVelocity(x, z) {
    this.velocity.x = x;
    this.velocity.z = z;
  },
  startWalk() {
    this.actionIdle.stop();
    this.actionWalk.play();
  },
  startIdle() {
    this.actionWalk.stop();
    this.actionIdle.play();
  },
  update: function (deltaTime) {
    if (!this.threeObj) return;

    this.animationMixer.update(deltaTime);
    this.animationNumber;

    this.updatePosition();
    this.updatePhysics()
  },
  updatePosition() {
    this.position.x += this.velocity.x;
    this.position.z += this.velocity.z;

    this.rotation.y;
  },
  initPhysics(world) {
    const shape = new CANNON.Box(new CANNON.Vec3(0.3, 1, 0.3));
    this.physicsBody = new CANNON.Body({
      mass: 1, 
      position: new CANNON.Vec3(this.position.x, this.position.y, this.position.z),
      shape: shape,
    });
    world.addBody(this.physicsBody);
    this.physicsBody.addEventListener('collide', function(event){
  
      const collidedBody = event.body;
      const srgv = Trig.triggerBody
      document.querySelector(".isHideShop").style.display = "block";
      console.log('detected')
    });
  },
  updatePhysics() {
    if (this.physicsBody) {
      this.physicsBody.position.copy(this.position); 
      // console.log(this.physicsBody.position)
    }
  },  
};


                    
// function collisionDetected(bodyA, bodyB) {
  

// }
