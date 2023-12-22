import * as CANNON from 'cannon-es'
import { world } from "./base";

export let HouseC = {
  threeObj: null,
  house: [],
  walls: [],
  init: function(gltf_obj) {
    this.threeObj = gltf_obj
    this.house = this.threeObj.children
    this.walls = this.house.slice(0, 2)

    isVisibleWalls.init(this.walls[0])
  },
  hideWalls() {
    this.walls.forEach(el => el.visible = false)
  }
}

export let isVisibleWalls = {
  houseEnters: null,
  triggerBody: null,
  position:{x:30.3, y:0, z: -24.6},
  init: function(gltf_ob) {
    this.houseEnters = gltf_ob
    isVisibleWalls.initPhysics(world)
  },
  initPhysics(world) {
    const shape = new CANNON.Box(new CANNON.Vec3(1, 1, 1));
    this.triggerBody = new CANNON.Body({
      mass: 0, 
      position: new CANNON.Vec3(this.position.x,this.position.y,this.position.z),
      shape: shape,
      isTrigger: true
    });
    world.addBody(this.triggerBody);
  }
}