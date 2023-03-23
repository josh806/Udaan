import Phaser from 'phaser';

import HelloWorldScene from './HelloWorldScene';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: 'app',
  width: window.innerWidth,
  height: window.innerHeight,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug :false
    },
  },
  scene: [HelloWorldScene],
};

export default new Phaser.Game(config);
