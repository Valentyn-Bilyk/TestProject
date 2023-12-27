import TWEEN from "@tweenjs/tween.js";
import { boughtItemsCounter } from "./ShopC";
import { playAppearFurnitureAnimation } from "./TweenC";

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
      document.querySelector(".boughtItemsContainer").style.display = "none";
      document.querySelector(".moveController").style.display = "block";
    }
    const currentItem = this.furnitureArr[itemId];
    currentItem.visible = true;

    const startScale = 0;
    const targetScale = 1;
    const duration = 2000;
    const easing = TWEEN.Easing.Bounce.Out;
    
    currentItem.scale.set(startScale, startScale, startScale);

    playAppearFurnitureAnimation(
      currentItem,
      startScale,
      targetScale,
      duration,
      easing
    );
  },
};
