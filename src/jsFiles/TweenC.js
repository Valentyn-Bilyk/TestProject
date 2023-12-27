import TWEEN from "@tweenjs/tween.js";

function playAppearFurnitureAnimation(obj, start, end, duration, easing) {
  new TWEEN.Tween({ scale: start })
    .to({ scale: end }, duration)
    .onUpdate((el) => {
      obj.scale.set(el.scale, el.scale, el.scale);
    })
    .easing(easing)
    .start();
}

function playAppearShopItemsAnimation(obj, end, duration, easing, progress) {
  new TWEEN.Tween(progress)
    .to({ opacity: end }, duration)
    .onUpdate(() => {
      obj.style.opacity = progress.opacity;
    })
    .easing(easing)
    .start();
}

function handleTriggersAnimation(className, elementStyle) {
  const targetElement = document.querySelector(className);
    targetElement.style.opacity = 0;
    const targetElementOpacity = { opacity: 0 };
    const targetOpacity = 1;
    const duration = 300;
    const easing = TWEEN.Easing.Quadratic.Out;

    playAppearShopItemsAnimation(
      targetElement,
      targetOpacity,
      duration,
      easing,
      targetElementOpacity
    );
    targetElement.style.display = elementStyle;
}

export { playAppearFurnitureAnimation, handleTriggersAnimation};
