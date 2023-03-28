import Phaser from 'phaser';
import React, { useEffect, useState } from 'react';
import Game from './scene/Game';
import Preloader from './scene/Preloader';

const PhaserRoot = () => {
  const [phaser, setPhaser] = useState<Phaser.Game>();

  useEffect(() => {
    const config = new Phaser.Game({
      type: Phaser.AUTO,
      parent: 'app',
      width: window.innerWidth,
      height: window.innerHeight,
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 0 },
          debug: false,
        },
      },
      scene: [Preloader, Game],
    });
    setPhaser(config);
  }, []);

  return <div id='phaser-parent'></div>;
};

export default PhaserRoot;
