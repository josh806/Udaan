export const CreateAnimation = (
  entity: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody,
  avatar: string
) => {
  entity.anims.create({
    key: 'moveright',
    frames: entity.anims.generateFrameNames(avatar, {
      prefix: 'right_walk-',
      end: 5,
      zeroPad: 1,
    }),
    repeat: -1,
  });
  entity.anims.create({
    key: 'moveup',
    frames: entity.anims.generateFrameNames(avatar, {
      prefix: 'up_walk-',
      end: 5,
      zeroPad: 1,
    }),
    repeat: -1,
  });
  entity.anims.create({
    key: 'moveleft',
    frames: entity.anims.generateFrameNames(avatar, {
      prefix: 'left_walk-',
      end: 5,
      zeroPad: 1,
    }),
    repeat: -1,
  });
  entity.anims.create({
    key: 'movedown',
    frames: entity.anims.generateFrameNames(avatar, {
      prefix: 'down_walk-',
      end: 5,
      zeroPad: 1,
    }),
    repeat: -1,
  });
  entity.anims.create({
    key: 'idle',
    frames: entity.anims.generateFrameNames(avatar, {
      prefix: 'down_idle-',
      end: 5,
      zeroPad: 1,
    }),
    frameRate: 8,
    repeat: -1,
  });
  entity.anims.create({
    key: 'sit-right',
    frames: entity.anims.generateFrameNames(avatar, {
      prefix: 'right_sitting-',
      end: 5,
      zeroPad: 1,
    }),
    frameRate: 8,
    repeat: -1,
  });
  entity.anims.create({
    key: 'sit-left',
    frames: entity.anims.generateFrameNames(avatar, {
      prefix: 'left_sitting-',
      end: 5,
      zeroPad: 1,
    }),
    frameRate: 8,
    repeat: -1,
  });
};
