import * as CANNON from "cannon-es";
import { world } from "./Core";
import { FurnitureC } from "./FurnitureC";
import { HouseC } from "./HouseC";

export let MapC = {
  threeObj: null,
  cooArr: [],
  init: function (gltf_obj) {
    this.threeObj = gltf_obj.scene;

    this.threeObj.getObjectByName("QuestArrow").visible = false;
    this.threeObj.getObjectByName("Trigger_house_1").visible = false;
    this.threeObj.getObjectByName("BoxColliders").visible = false

    ShopTrigger.init(this.threeObj.getObjectByName("Trigger_shop"));
    FurnitureC.init(this.threeObj.getObjectByName("Furniture"));
    HouseC.init(this.threeObj.getObjectByName("PlayerHouse"));
    HouseTrigger.init(this.threeObj.getObjectByName("Trigger_house_2"));

    const boxColliders = this.threeObj.getObjectByName("BoxColliders").children;
    boxColliders.forEach(({ name }) =>
      MapColliders.init(this.threeObj.getObjectByName(name))
    );
    console.log(this.threeObj)
  },
};

export let ShopTrigger = {
  shopTrigger: null,
  triggerBody: null,
  position: { x: 37.8, y: 0, z: -8.6 },
  init: function (gltf_ob) {
    this.shopTrigger = gltf_ob;
    ShopTrigger.initPhysics(world);
  },
  initPhysics(world) {
    const shape = new CANNON.Box(new CANNON.Vec3(0.5, 0.5, 0.5));
    this.triggerBody = new CANNON.Body({
      mass: 0,
      position: new CANNON.Vec3(
        this.position.x,
        this.position.y,
        this.position.z
      ),
      shape: shape,
      isTrigger: true,
    });
    world.addBody(this.triggerBody);
  },
};

export let HouseTrigger = {
  houseTrigger: null,
  triggerBody: null,
  position: { x: 30.7, y: 0, z: -30.1 },
  init: function (gltf_ob) {
    this.houseTrigger = gltf_ob;
    HouseTrigger.initPhysics(world);
  },
  initPhysics(world) {
    const shape = new CANNON.Sphere(0.5);
    this.triggerBody = new CANNON.Body({
      mass: 0,
      position: new CANNON.Vec3(
        this.position.x,
        this.position.y,
        this.position.z
      ),
      shape: shape,
      isTrigger: true,
    });
    world.addBody(this.triggerBody);
  },
};

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
