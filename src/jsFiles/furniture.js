import TWEEN from '@tweenjs/tween.js'

export let Furniture = {
  threeObj: null,
  furnitureArr: [],
  init: function(gltf_obj) {
    this.threeObj = gltf_obj
    this.furnitureArr = this.threeObj.children
    this.furnitureArr.forEach(el => el.visible = false)
  },
  showBoughtFurniture(itemId) {
    const currentItem = this.furnitureArr[itemId];
    currentItem.visible = true;
  
    const startScale = { x: 0.2, y: 0.2, z: 0.2 };
    const targetScale = { x: 1, y: 1, z: 1 };
    currentItem.scale.set(startScale.x, startScale.y, startScale.z);
  
    const tween = new TWEEN.Tween(startScale)
      .to(targetScale, 2000)
      .easing(TWEEN.Easing.Bounce.Out);
      
    console.log(tween)

    tween.onUpdate((value) => {
      currentItem.scale.set(value.x, value.y, value.z);
      console.log('qregfreqf')
    });
  
    tween.start();
  }
}