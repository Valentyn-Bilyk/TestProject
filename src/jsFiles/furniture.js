import { MapC } from "./MapC";

export let Furniture = {
  threeObj: null,
  furnitureArr: [],
  init: function(gltf_obj) {
    this.threeObj = gltf_obj
    this.furnitureArr = this.threeObj.children
    this.furnitureArr.forEach(el => el.visible = false)
    console.log(this.furnitureArr)
  },
}