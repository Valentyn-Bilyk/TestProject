import nipplejs from "nipplejs";
import { CharacterC } from "./CharacterC";

export const Joy = {
  manager: nipplejs.create({
    zone: document.querySelector(".moveController"),
    lockX: false,
    lockY: false,

  }),
  nippleLock() {
    this.manager.options.lockY = true
    this.manager.options.lockX = true
    CharacterC.setPhysicsBodyVelocity(0, 0)
  },
  nippleUnlock() {
    this.manager.options.lockY = false
    this.manager.options.lockX = false
  }
};
Joy.manager.on("move", function (evt, nipple) {
  let k = 0;

  if (nipple.force > 0 && nipple.force <= 0.2) k = 1;
  if (nipple.force > 0.2 && nipple.force <= 0.5) k = 2;
  if (nipple.force > 0.5) k = 5;

  let x = Math.cos(nipple.angle.radian) * k;
  let z = -Math.sin(nipple.angle.radian) * k;

  if (nipple.force > 0) {
    CharacterC.rotation.y = nipple.angle.radian + 1.5;
    CharacterC.startWalk();
  }
  CharacterC.setActionWalkSpeed(k)
  CharacterC.setPhysicsBodyVelocity(x, z);
});

Joy.manager.on("end", function (evt, nipple) {
  let x = 0;
  let z = 0;
  CharacterC.setPhysicsBodyVelocity(x, z);
  CharacterC.startIdle();
});
