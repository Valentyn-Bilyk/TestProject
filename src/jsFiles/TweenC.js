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

function playHouseTriggerYoYoAnimation(obj, start, end, duration, easing) {
  const forwardAnimation = new TWEEN.Tween({ scale: start })
    .to({ scale: end }, duration)
    .onUpdate((el) => {
      obj.scale.set(el.scale, el.scale, el.scale);
    })
    .easing(easing)

  const backAnimation = new TWEEN.Tween({ scale: end })
    .to({ scale: start }, duration)
    .onUpdate((el) => {
      obj.scale.set(el.scale, el.scale, el.scale);
    })
    .easing(easing)
  
  forwardAnimation.chain(backAnimation)
  backAnimation.chain(forwardAnimation)

  forwardAnimation.start()
}

function playAppearShopItemsAnimation(obj, end, duration, easing, startValue) {
  new TWEEN.Tween(startValue)
    .to({ opacity: end }, duration)
    .onUpdate(() => {
      obj.style.opacity = startValue.opacity;
    })
    .easing(easing)
    .start();
}

function playDisappearAnimation(
  obj,
  end,
  duration,
  easing,
  startValue,
  elementStyle
) {
  new TWEEN.Tween(startValue)
    .to({ opacity: end }, duration)
    .onUpdate(() => {
      obj.style.opacity = startValue.opacity;
    })
    .easing(easing)
    .onComplete(() => {
      obj.style.display = elementStyle;
    })
    .start();
}

export {
  playAppearFurnitureAnimation,
  playHouseTriggerYoYoAnimation,
  playAppearShopItemsAnimation,
  playDisappearAnimation
};
