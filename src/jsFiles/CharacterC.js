import * as THREE from "three";
import * as CANNON from "cannon-es";
import { HouseTrigger, TestCollider, Trig } from "./MapC";
import { world } from "./base";
import { HouseC, isVisibleWalls } from "./HouseC";

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
    this.position.set(-2.473, 0, -3.693);

    this.rotation = gltf_obj.scene.rotation;

    this.animationMixer = new THREE.AnimationMixer(this.threeObj);
    this.actionIdle = this.animationMixer.clipAction(this.animations[2]);
    this.actionWalk = this.animationMixer.clipAction(this.animations[4]);

    window.addEventListener("keydown", (event) => {
      // if (event.code === 'Space') {
      //   boughtItemsContainer.style.display = 'flex'
      // }

      if (event.code === "Space") {
        console.log(this.position);
      }
    });

    CharacterC.initPhysics(world);
  },

  // setVelocity(x, z) {
  //   this.velocity.x = x;
  //   this.velocity.z = z;
  // },
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
    this.updatePhysics();
  },
  updatePosition() {
    this.position.x = this.physicsBody.position.x;
    this.position.z = this.physicsBody.position.z;

    this.rotation.y;
  },
  initPhysics(world) {
    const shape = new CANNON.Sphere(0.3);
    this.physicsBody = new CANNON.Body({
      mass: 0.1,
      position: new CANNON.Vec3(this.position.x, 0.5, this.position.z),
      shape: shape,
      velocity: null,
      material: new CANNON.Material({
        restitution: 0,
        friction: 0,
      }),
      linearDamping: 0,
      angularDamping: 0,
    });
    world.addBody(this.physicsBody);

    this.physicsBody.addEventListener("collide", (event) => {
      const collidedBody = event.body;
      const triggerShop = Trig.triggerBody;
      const houseWalls = isVisibleWalls.triggerBody;
      const houseTrigger = HouseTrigger.triggerBody;

      if (collidedBody === houseTrigger)
        document.querySelector(".boughtItemsContainer").style.display = "flex";
      if (collidedBody === houseWalls) HouseC.hideWalls();
      if (collidedBody === triggerShop)
        document.querySelector(".isHideShop").style.display = "block";
    });
  },
  updatePhysics() {
    // if (this.physicsBody) {
    //   this.physicsBody.position.x += this.physicsBody.velocity.x
    //   this.physicsBody.position.z += this.physicsBody.velocity.z
    // }
    this.physicsBody.velocity;
  },
  setPhysicsBodyVelocity(x, z) {
    this.physicsBody.velocity = new CANNON.Vec3(x, 0, z);
    // this.physicsBody.velocity.x = x;
    // this.physicsBody.velocity.z = z;
  },
};
