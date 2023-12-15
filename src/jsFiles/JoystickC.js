import nipplejs from 'nipplejs'
import { CharacterC } from './CharacterC'

export const Joy = {
  manager: nipplejs.create({
    zone: document.querySelector('.moveController')
  })
}

Joy.manager.on('move', function(evt, nipple) {

  // remove ifs

  if (nipple.force > 0 && nipple.force <= 0.2) {
    CharacterC.velocity.x = Math.cos(nipple.angle.radian) * 0.02
    CharacterC.velocity.z = -Math.sin(nipple.angle.radian) * 0.02
  }
  if (nipple.force > 0.2 && nipple.force <= 0.5) {
    CharacterC.velocity.x = Math.cos(nipple.angle.radian) * 0.05
    CharacterC.velocity.z = -Math.sin(nipple.angle.radian) * 0.05
  }
  if (nipple.force > 0.5) {
    CharacterC.velocity.x = Math.cos(nipple.angle.radian) * 0.1
    CharacterC.velocity.z = -Math.sin(nipple.angle.radian) * 0.1
  }
  if (nipple.force > 0) {
    CharacterC.rotation.y = nipple.angle.radian + 1
    CharacterC.startWalk()
  }
  //CharacterC.setVelocity();
})

Joy.manager.on('end', function(evt, nipple) {
  CharacterC.velocity.x = 0
  CharacterC.velocity.z = 0
  CharacterC.startIdle()
})
