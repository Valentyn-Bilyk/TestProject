import * as THREE from "three";
import CANNON from "cannon";

export let MapC = {
  threeObj: null,
  cooArr: [],
  init: function(gltf_obj) {
    this.threeObj = gltf_obj.scene;

    this.threeObj.position.set(2.5, 0, 3.5);

    this.threeObj.getObjectByName('QuestArrow').visible = false
    const coll = this.threeObj.getObjectByName('BoxColliders')
    this.cooArr = coll.children
    Trig.init(this.threeObj.getObjectByName('Trigger_shop'))
  },
}

export let Trig = {
  shopTrigger: null,
  triggerBody: null,
  position: { x: 0, y: 0, z: 0 },
  init: function(gltf_ob) {
    this.shopTrigger = gltf_ob
    this.position = this.shopTrigger.position

  },
  initPhysics(world) {
    const shape = new CANNON.Box(new CANNON.Vec3(1, 2, 1));
    this.triggerBody = new CANNON.Body({
      mass: 1, 
      position: new CANNON.Vec3(this.position.x, this.position.y, this.position.z),
      shape: shape,
    });
    world.addBody(this.triggerBody);
  }
}