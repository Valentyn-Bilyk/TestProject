import * as THREE from "three";
import CANNON from "cannon";
import { world } from "./physicsC";
import { CharacterC } from "./CharacterC";
import { Furniture } from "./furniture";


export let MapC = {
  threeObj: null,
  cooArr: [],
  init: function(gltf_obj) {
    this.threeObj = gltf_obj.scene;

    this.threeObj.position.set(2.5, 0, 3.5);

    this.threeObj.getObjectByName('QuestArrow').visible = false

    Trig.init(this.threeObj.getObjectByName('Trigger_shop'))
    Furniture.init(this.threeObj.getObjectByName('Furniture'))
  },
}

export let Trig = {
  shopTrigger: null,
  triggerBody: null,
  position:{x:40.3, y:0, z: -5.1},
  init: function(gltf_ob) {
    this.shopTrigger = gltf_ob
    // this.position.set(37.06438446044922, 0, -5.483375549316406) 
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
