import * as CANNON from "cannon-es";

export class GameTrigger {
  constructor(position, shapeSize) {
    this.shapeSize = shapeSize;
    this.position = position;
    this.triggerObj = null;
    this.triggerBody = null;
  }

  initWorld(world) {
    this.initPhysics(world);
  }

  initObj(gltf_obj) {
    this.triggerObj = gltf_obj;
  }

  initPhysics(world) {
    const shape = new CANNON.Box(new CANNON.Vec3(...this.shapeSize));
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
  }
}

export const ShopTrigger = new GameTrigger(
  { x: 37.8, y: 0, z: -8.6 },
  [0.5, 0.5, 0.5]
);
export const HouseTrigger = new GameTrigger(
  { x: 30.7, y: 0, z: -30.1 },
  [0.5, 0.5, 0.5]
);

export const WallsTrigger = new GameTrigger(
  { x: 30.3, y: 0, z: -24.6 },
  [1, 1, 1]
)