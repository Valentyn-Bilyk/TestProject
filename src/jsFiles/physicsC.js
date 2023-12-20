import CANNON from "cannon";
import {CharacterC} from './CharacterC'
import {Trig} from './MapC'

export const world = new CANNON.World()

// const contactMaterial = new CANNON.ContactMaterial(CharacterC.physicsBody, Trig.triggerBody)
// world.addContactMaterial(contactMaterial)
