import * as THREE from "three";
import CANNON from "cannon";
import {HouseTrigger, TestCollider, Trig} from './MapC'
import { world } from "./physicsC";
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
    this.position.set(-2.473, 0, -3.693)

    this.rotation = gltf_obj.scene.rotation;

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
        console.log('ASDC ')
      }

      if (collidedBody === triggerShop) {
        document.querySelector(".isHideShop").style.display = "block";
      }
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
//_Vector3 {x: 32.850785824070734, y: 0, z: -21.537729829287578}