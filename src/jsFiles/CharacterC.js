import * as THREE from "three";
import * as CANNON from 'cannon-es'
import {HouseTrigger, TestCollider, Trig} from './MapC'
import { world } from "./base";
import { HouseC, isVisibleWalls } from "./HouseC";

export let CharacterC = {
  animations: [],
  animationMixer: null,
  threeObj: null,
  actionIdle: null,
  actionWalk: null,
  physicsBody: null,
  quaternion: null,
  position: { x: 0, y: 0, z: 0 },
  rotation: { x: 0, y: 0, z: 0 },
  velocity: { x: 0, y: 0, z: 0 },
  init: function (gltf_obj) {
    this.threeObj = gltf_obj.scene;
    this.animations = gltf_obj.animations;

    this.position = this.threeObj.position;
    this.position.set(-2.473, 0, -3.693)

    this.rotation = gltf_obj.scene.rotation;

    this.quaternion = new CANNON.Quaternion();
    

    this.animationMixer = new THREE.AnimationMixer(this.threeObj);
    this.actionIdle = this.animationMixer.clipAction(this.animations[2]);
    this.actionWalk = this.animationMixer.clipAction(this.animations[4]);

    window.addEventListener('keydown', (event) => {
      // if (event.code === 'Space') {
      //   boughtItemsContainer.style.display = 'flex'
      // }
    
      if (event.code === 'Space') {
        console.log(this.position)
      }
    })
    
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
    this.quaternion.setFromEuler(this.rotation.x, this.rotation.y, this.rotation.z);

  },
  initPhysics(world) {
    const shape = new CANNON.Box(new CANNON.Vec3(0.3, 1.75, 0.3));
    this.physicsBody = new CANNON.Body({
      mass: 1, 
      position: new CANNON.Vec3(this.position.x, this.position.y, this.position.z),
      shape: shape
    });

    this.physicsBody.quaternion.copy(this.quaternion);
    world.addBody(this.physicsBody);

    this.physicsBody.addEventListener('collide', (event) => {
      
      const collidedBody = event.body;
      const triggerShop = Trig.triggerBody
      const houseWalls = isVisibleWalls.triggerBody
      const houseTrigger = HouseTrigger.triggerBody
      const collide = TestCollider.triggerBody

      if (collidedBody === houseTrigger) {
        document.querySelector(".boughtItemsContainer").style.display = "flex"
      }

      if(collidedBody === houseWalls) {
        HouseC.hideWalls()
      }

      if (collidedBody === collide) {
        CharacterC.setVelocity(0, 0)
        console.log('ASDC ')
      }

      if (collidedBody === triggerShop) {
        document.querySelector(".isHideShop").style.display = "block";
      }

    });

  },
  updatePhysics() {
    if (this.physicsBody) {
      this.physicsBody.position.copy(this.position); 
      this.physicsBody.quaternion.copy(this.quaternion);
    }
  },  
};