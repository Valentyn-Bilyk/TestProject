import nipplejs from "nipplejs";
import { CharacterC } from "./CharacterC";

export const Joy = {
  manager: nipplejs.create({
    zone: document.querySelector(".moveController"),
  }),
};

Joy.manager.on("move", function (evt, nipple) {
  let k = 0;

  if (nipple.force > 0 && nipple.force <= 0.2) k = 0.02;
  if (nipple.force > 0.2 && nipple.force <= 0.5) k = 0.05;
  if (nipple.force > 0.5) k = 0.1;

  let x = Math.cos(nipple.angle.radian) * k;
  let z = -Math.sin(nipple.angle.radian) * k;

  if (nipple.force > 0) {
    CharacterC.rotation.y = nipple.angle.radian + 1;
    CharacterC.startWalk();
  }
  CharacterC.setVelocity(x, z);
});

Joy.manager.on("end", function (evt, nipple) {
  let x = 0;
  let z = 0;
  CharacterC.setVelocity(x, z);
  CharacterC.startIdle();
});
