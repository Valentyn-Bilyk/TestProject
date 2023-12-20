import CANNON from "cannon";
import {CharacterC} from './CharacterC'
import {Trig} from './MapC'

export const world = new CANNON.World()

// Trig.triggerBody
// world.addEventListener('triggerenter', function (evt) {
//   var trigger = evt.target; // Объект триггера
//   var otherBody = evt.body; // Объект, входящий в триггер

//   // Выполнение действий при входе объекта в триггер
//   console.log('Объект вошел в триггер');
// });

// world.addEventListener('triggerleave', function (evt) {
//   var trigger = evt.target; // Объект триггера
//   var otherBody = evt.body; // Объект, выходящий из триггера

//   // Выполнение действий при выходе объекта из триггера
//   console.log('Объект покинул триггер');
// });

// const contactMaterial = new CANNON.ContactMaterial(CharacterC.physicsBody, Trig.triggerBody)
// world.addContactMaterial(contactMaterial)
