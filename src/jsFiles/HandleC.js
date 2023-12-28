import TWEEN from "@tweenjs/tween.js";

import {
  playAppearFurnitureAnimation,
  playDisappearAnimation,
  playAppearShopItemsAnimation,
  playHouseTriggerYoYoAnimation,
} from "./TweenC";

function handleOpenShopAnimation(className, elementStyle) {
  const targetElement = document.querySelector(className);
  targetElement.style.opacity = 0;
  const startElementOpacity = { opacity: 0 };
  const targetOpacity = 1;
  const duration = 300;
  const easing = TWEEN.Easing.Quadratic.Out;

  playAppearShopItemsAnimation(
    targetElement,
    targetOpacity,
    duration,
    easing,
    startElementOpacity
  );
  targetElement.style.display = elementStyle;
}

function handleCloseShopAnimation(className, elementStyle) {
  const targetElement = document.querySelector(className);
  const startElementOpacity = { opacity: 1 };
  const targetOpacity = 0;
  const duration = 300;
  const easing = TWEEN.Easing.Quadratic.Out;

  playDisappearAnimation(
    targetElement,
    targetOpacity,
    duration,
    easing,
    startElementOpacity,
    elementStyle
  );
}

function handleShowFurnitureItem(item) {
  const startScale = 0;
  const targetScale = 1;
  const duration = 1200;
  const easing = TWEEN.Easing.Bounce.Out;

  item.scale.set(startScale, startScale, startScale);

  playAppearFurnitureAnimation(item, startScale, targetScale, duration, easing);
}

function handlePlayHouseTriggerAnimation(item) {
  const startScale = 1;
  const targetScale = 1.2;
  const duration = 1000;
  const easing = TWEEN.Easing.Quadratic.InOut;

  item.scale.set(startScale, startScale, startScale);

  playHouseTriggerYoYoAnimation(
    item,
    startScale,
    targetScale,
    duration,
    easing
  );
}

export {
  handleShowFurnitureItem,
  handleOpenShopAnimation,
  handleCloseShopAnimation,
  handlePlayHouseTriggerAnimation,
};
