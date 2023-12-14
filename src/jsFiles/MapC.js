import * as THREE from "three";

export let MapC = {
  threeObj: null,
  init: function(gltf_obj) {
    this.threeObj = gltf_obj.scene;

    this.threeObj.position.set(2.5, 0, 3.5);

    this.threeObj.children[0].children[6].visible = false;
    this.threeObj.children[0].children[0].visible = false;

    Trig.init(this.threeObj.children[0].children[7].children[1])

  }
}

export let Trig = {
  triger: MapC.threeObj,
  ttt: null,
  init: function(gltf_ob) {
    this.ttt = gltf_ob
    console.log(this.ttt)
  },
}