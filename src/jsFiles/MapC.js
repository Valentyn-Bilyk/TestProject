
import CANNON from "cannon";
import { world } from "./physicsC";

import { Furniture } from "./furniture";
import { HouseC } from "./HouseC";


export let MapC = {
  threeObj: null,
  cooArr: [],
  init: function(gltf_obj) {
    this.threeObj = gltf_obj.scene;

    // this.threeObj.position.set(2.5, 0, 3.5);

    this.threeObj.getObjectByName('QuestArrow').visible = false
    this.threeObj.getObjectByName('Trigger_house_1').visible = false
    Trig.init(this.threeObj.getObjectByName('Trigger_shop'))
    Furniture.init(this.threeObj.getObjectByName('Furniture'))
    HouseC.init(this.threeObj.getObjectByName('PlayerHouse'))
    HouseTrigger.init(this.threeObj.getObjectByName('Trigger_house_2'))
    TestCollider.init(this.threeObj.getObjectByName('BoxCollider091'))
  },
}

export let Trig = {
  shopTrigger: null,
  triggerBody: null,
  position:{x:40.3, y:0, z: -5.1},
  init: function(gltf_ob) {
    this.shopTrigger = gltf_ob
    Trig.initPhysics(world)
  },
  initPhysics(world) {
    const shape = new CANNON.Sphere(0.5);
    this.triggerBody = new CANNON.Body({
      mass: 0, 
      position: new CANNON.Vec3(this.position.x,this.position.y,this.position.z),
      shape: shape,
      
    });
    world.addBody(this.triggerBody);
  }
}

export let HouseTrigger = {
  houseTrigger: null,
  triggerBody: null,
  position:{x:33.15, y:0, z: -26.65},
  init: function(gltf_ob) {
    this.houseTrigger = gltf_ob
    HouseTrigger.initPhysics(world)
  },
  initPhysics(world) {
    const shape = new CANNON.Sphere(0.5);
    this.triggerBody = new CANNON.Body({
      mass: 0, 
      position: new CANNON.Vec3(this.position.x,this.position.y,this.position.z),
      shape: shape,
    });
    world.addBody(this.triggerBody);
  }
}

export let TestCollider = {
  testCollider: null,
  triggerBody: null,
  position: null,
  geometry: null,
  rotation: null,
  init: function(gltf_ob) {
    this.testCollider = gltf_ob
    this.position = this.testCollider.position
    this.geometry = this.testCollider.geometry.boundingBox.max
    this.rotation = this.testCollider.rotation
    console.log(this.geometry)
    console.log(this.position)
    console.log(this.rotation)
    TestCollider.initPhysics(world)
  },
  initPhysics(world) {
    const shape = new CANNON.Box(new CANNON.Vec3(this.geometry.x, this.geometry.y, this.geometry.z));
    this.triggerBody = new CANNON.Body({
      mass: 0, 
      position: new CANNON.Vec3(this.position.x,this.position.y,this.position.z),
      shape: shape,
      quaternion: new CANNON.Quaternion(this.rotation.x, this.rotation.y, this.rotation.z)
    });
    world.addBody(this.triggerBody);
    console.log(this.triggerBody)
  }
}

