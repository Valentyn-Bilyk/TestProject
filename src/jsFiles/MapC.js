import * as CANNON from "cannon-es";
import { world } from "./Core";
import { FurnitureC } from "./FurnitureC";
import { HouseC } from "./HouseC";
import { HouseTrigger, ShopTrigger } from "./GameTriggers";
import { handlePlayHouseTriggerAnimation } from "./HandleC";

export let MapC = {
  threeObj: null,
  shopTrigger: null,
  houseTrigger: null,
  init: function (gltf_obj) {
    this.threeObj = gltf_obj.scene;
    this.threeObj.getObjectByName("QuestArrow").visible = false;
    this.threeObj.getObjectByName("Trigger_house_1").visible = false;
    this.threeObj.getObjectByName("BoxColliders").visible = false

    this.shopTrigger = this.threeObj.getObjectByName("Trigger_shop");
    this.houseTrigger = this.threeObj.getObjectByName("Trigger_house_2");
    FurnitureC.init(this.threeObj.getObjectByName("Furniture"));
    HouseC.init(this.threeObj.getObjectByName("PlayerHouse"));
    const map = this.threeObj.getObjectByName("Ground_Plane").children
    map.forEach((el) => {
      el.receiveShadow = true
    })
    const boxColliders = this.threeObj.getObjectByName("BoxColliders").children;
    boxColliders.forEach(({ name }) =>
      MapColliders.init(this.threeObj.getObjectByName(name))
    );
    this.hideHouseTrigger()
    handlePlayHouseTriggerAnimation(this.houseTrigger)
  },
  hideHouseTrigger() {
    this.houseTrigger.visible = false;
  },
  showHouseTrigger() {
    this.houseTrigger.visible =  true;
  }
};

ShopTrigger.initObj(MapC.shopTrigger)
HouseTrigger.initObj(MapC.houseTrigger)

export let MapColliders = {
  testCollider: null,
  triggerBody: null,
  position: null,
  geometry: null,
  rotation: null,
  scale: null,
  init: function (gltf_ob) {
    this.testCollider = gltf_ob;
    this.position = this.testCollider.position;
    this.geometry = this.testCollider.geometry.boundingBox.max;
    this.rotation = this.testCollider.rotation;
    this.scale = this.testCollider.scale;

    MapColliders.initPhysics(world);
  },
  initPhysics(world) {
    const scaleX = this.geometry.x * this.scale.x;
    const scaleY = this.geometry.y * this.scale.y;
    const scaleZ = this.geometry.z * this.scale.z;

    const shape = new CANNON.Box(
      new CANNON.Vec3(this.geometry.x, this.geometry.y, this.geometry.z)
    );

    const quaternion = new CANNON.Quaternion();
    quaternion.setFromEuler(this.rotation.x, this.rotation.y, this.rotation.z);

    this.triggerBody = new CANNON.Body({
      mass: 0,
      position: new CANNON.Vec3(
        this.position.x,
        this.position.y,
        this.position.z
      ),
      shape: shape,
    });

    this.triggerBody.quaternion.copy(quaternion);

    shape.halfExtents.set(scaleX, scaleY, scaleZ);

    this.triggerBody.shapes.forEach((s) =>
      s.updateConvexPolyhedronRepresentation()
    );

    this.triggerBody.updateBoundingRadius();

    world.addBody(this.triggerBody);
  },
};
