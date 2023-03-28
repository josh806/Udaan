import { inputPayload } from '../../types/types';
export const movePlayerLeft = (
  player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody,
  velocity: number
) => {
  player.x -= velocity;
  player.setVelocityX(-velocity);
  player.anims.play('moveleft', true);
};
export const movePlayerRight = (
  player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody,
  velocity: number
) => {
  player.x += velocity;
  player.setVelocityX(+velocity);
  player.anims.play('moveright', true);
};
export const movePlayerDown = (
  player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody,
  velocity: number
) => {
  player.y += velocity;
  player.setVelocityY(velocity);
  player.anims.play('movedown', true);
};
export const movePlayerUp = (
  player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody,
  velocity: number
) => {
  player.y -= velocity;
  player.setVelocityY(-velocity);
  player.anims.play('moveup', true);
};
export const stopMoving = (
  player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody
) => {
  player.x += 0;
  player.setVelocityX(0);
  player.y += 0;
  player.setVelocityY(0);
};
export const setPlayerPosition = (
  player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody,
  positionX: number,
  positionY: number
) => {
  player.x = positionX;
  player.y = positionY;
  player.setPosition(positionX, positionY);
};
export const makePlayerSit = (
  player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody,
  inputPayload: inputPayload,
  chairDirection: string
) => {
  if (chairDirection === 'right') {
    player.anims.play('sit-right', true);
    inputPayload.sit[1] = 'sit-right';
  } else {
    player.anims.play('sit-left', true);
    inputPayload.sit[1] = 'sit-left';
  }
  inputPayload.sit[0] = true;
};
