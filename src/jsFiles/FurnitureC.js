import { MapC } from "./MapC";
import { boughtItemsCounter } from "./ShopC";
import { handleCloseShopAnimation, handleShowFurnitureItem } from "./HandleC";
import { Joy } from "./JoystickC";

export const FurnitureC = {
  threeObj: null,
  furnitureArr: [],
  init: function (gltf_obj) {
    this.threeObj = gltf_obj;
    this.furnitureArr = this.threeObj.children;
    this.furnitureArr.forEach((el) => (el.visible = false));
  },
  showBoughtFurniture(itemId) {
    if (boughtItemsCounter < 1) {
      MapC.hideHouseTrigger()
      Joy.nippleUnlock()
      handleCloseShopAnimation(".boughtItemsContainer", "none");
    }
    const currentItem = this.furnitureArr[itemId];
    currentItem.visible = true;

    handleShowFurnitureItem(currentItem);
  },
};
