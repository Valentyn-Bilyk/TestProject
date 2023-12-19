import CANNON from "cannon";
import {CharacterC} from './CharacterC'
import {Trig} from './MapC'

export const world = new CANNON.World()

CharacterC.initPhysics(world)
Trig.initPhysics(world)

const contactMaterial = new CANNON.ContactMaterial(CharacterC.physicsBody, Trig.triggerBody)
world.addContactMaterial(contactMaterial)
world.addEventListener('beginContact', (event) => {
  const { bodyA, bodyB } = event;

  if ((bodyA === CharacterC.physicsBody && bodyB === Trig.triggerBody) || (bodyA === Trig.triggerBody && bodyB === CharacterC.physicsBody)) {


    console.log('Персонаж на платформі');

  }
});