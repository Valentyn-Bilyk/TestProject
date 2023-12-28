import { HouseTrigger, ShopTrigger, WallsTrigger } from "./GameTriggers";
import { HouseC } from "./HouseC";
import { boughtItemsCounter } from "./ShopC";
import { handleOpenShopAnimation } from "./HandleC";
import { Joy } from "./JoystickC";

export function handleCollision(event) {
  const collidedBody = event.body;
  const triggerShop = ShopTrigger.triggerBody;
  const houseWalls = WallsTrigger.triggerBody;
  const houseTrigger = HouseTrigger.triggerBody;

  if (collidedBody === houseWalls) HouseC.hideWalls();
  if (collidedBody === houseTrigger && boughtItemsCounter) {
    handleOpenShopAnimation(".boughtItemsContainer", "flex")
    Joy.nippleLock()
  }
  if (collidedBody === triggerShop) {
    handleOpenShopAnimation(".isHideShop", "block")
    Joy.nippleLock()
  }
}