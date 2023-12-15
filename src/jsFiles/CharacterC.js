import * as THREE from "three";

export let CharacterC = {
    animations: [],
    animationNumber: 2,
    animationMixer: null,
    threeObj: null,
    actionIdle: null,
    actionWalk: null,
    position: {x: 0, y: 0, z: 0},
    rotation: {x: 0, y: 0, z: 0},
    velocity: {x: 0, y: 0, z: 0},
    init: function(gltf_obj) {
        this.threeObj = gltf_obj.scene;
        this.animations = gltf_obj.animations;

        this.position = this.threeObj.position
        this.position.y = 0.15;
    
        this.rotation = gltf_obj.scene.rotation

        this.animationMixer = new THREE.AnimationMixer(this.threeObj);
        this.actionIdle = this.animationMixer.clipAction(this.animations[2]);
        this.actionWalk = this.animationMixer.clipAction(this.animations[4]);

        this.changeAnimation(this.actionIdle, this.actionWalk)

    },
    // refactor: add method
    setVelocity() {

    },
    // refactor: add methods startRunning, startIdle
    changeAnimation(actionIdle, actionWalk) {
        if (this.animationNumber === 2) {
            actionWalk.stop()
            actionIdle.play()
        } else {
            actionIdle.stop()
            actionWalk.play()
        }
    },
    update: function(deltaTime) {
        if(!this.threeObj) return;
        
        this.animationMixer.update(deltaTime);
        this.animationNumber;
        
        this.updatePosition()
        this.changeAnimation(this.actionIdle, this.actionWalk)
    },
    updatePosition() {
        this.position.x += this.velocity.x;
        this.position.z += this.velocity.z;

        this.rotation.y;
    },
};
