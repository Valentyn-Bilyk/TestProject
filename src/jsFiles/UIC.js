import { HouseTrigger, ShopTrigger, WallsTrigger } from "./GameTriggers";
import { HouseC } from "./HouseC";
import { boughtItemsCounter } from "./ShopC";
import { handleTriggersAnimation } from "./TweenC";

export function handleCollision(event) {
  const collidedBody = event.body;
  const triggerShop = ShopTrigger.triggerBody;
  const houseWalls = WallsTrigger.triggerBody;
  const houseTrigger = HouseTrigger.triggerBody;

  if (collidedBody === houseWalls) HouseC.hideWalls();
  if (collidedBody === houseTrigger && boughtItemsCounter) {
    handleTriggersAnimation(".boughtItemsContainer", "flex")

    document.querySelector(".moveController").style.display = "none";
  }
  if (collidedBody === triggerShop) {
    handleTriggersAnimation(".isHideShop", "block")

    document.querySelector(".moveController").style.display = "none";
  }
}