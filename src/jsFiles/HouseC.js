import { WallsTrigger } from "./GameTriggers";

export let HouseC = {
  threeObj: null,
  house: [],
  walls: [],
  wallsTrigger: null,
  init: function (gltf_obj) {
    this.threeObj = gltf_obj;
    this.house = this.threeObj.children;
    this.walls = this.house.slice(0, 2);
    this.wallsTrigger = this.walls[0];
  },
  hideWalls() {
    this.walls.forEach((el) => (el.visible = false));
  },
};

WallsTrigger.initObj(HouseC.wallsTrigger)