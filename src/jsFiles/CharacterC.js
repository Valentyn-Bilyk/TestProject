import * as THREE from "three";
import * as CANNON from "cannon-es";
import { world } from "./Core";
import { handleCollision } from "./UIC";

export let CharacterC = {
  animations: [],
  animationMixer: null,
  threeObj: null,
  actionIdle: null,
  actionWalk: null,
  physicsBody: null,
  position: { x: 0, y: 0, z: 0 },
  rotation: { x: 0, y: 0, z: 0 },
  init: function (gltf_obj) {
    this.threeObj = gltf_obj.scene;
    this.animations = gltf_obj.animations;

    this.position = this.threeObj.position;
    this.position.set(-2.473, 0, -3.693);

    this.rotation = gltf_obj.scene.rotation;

    this.animationMixer = new THREE.AnimationMixer(this.threeObj);
    this.actionIdle = this.animationMixer.clipAction(this.animations[2]);
    this.actionWalk = this.animationMixer.clipAction(this.animations[4]);
    CharacterC.initPhysics(world);
  },
  startWalk() {
    this.actionIdle.stop();
    this.actionWalk.play();
  },
  startIdle() {
    this.actionWalk.stop();
    this.actionIdle.play();
  },
  setActionWalkSpeed(k) {
    this.actionWalk.timeScale = k
  },
  update: function (deltaTime) {
    if (!this.threeObj) return;
    this.animationMixer.update(deltaTime);
    this.updatePosition();
  },
  updatePosition() {
    this.position.x = this.physicsBody.position.x;
    this.position.z = this.physicsBody.position.z;
  },
  initPhysics(world) {
    const shape = new CANNON.Sphere(0.3);
    this.physicsBody = new CANNON.Body({
      mass: 0.1,
      position: new CANNON.Vec3(this.position.x, 0.5, this.position.z),
      shape: shape,
      velocity: null,
    });
    world.addBody(this.physicsBody);

    this.physicsBody.addEventListener('collide', handleCollision)
  },
  setPhysicsBodyVelocity(x, z) {
    this.physicsBody.velocity = new CANNON.Vec3(x, 0, z);
  },
};
