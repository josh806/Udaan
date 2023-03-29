import Phaser from 'phaser';
import React, { useEffect, useState } from 'react';
import Game from './scene/Game';
import Preloader from './scene/Preloader';
import Loading from '../features/Loading';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const PhaserRoot = () => {
  const { isLoading, isRegistered } = useSelector(
    (state: RootState) => state.loading
  );
  const [phaser, setPhaser] = useState<Phaser.Game>();

  useEffect(() => {
    if (isRegistered) {
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
    }
  }, [isRegistered]);

  return (
    <>
      {isLoading && <Loading />}
      <div id='phaser-parent'></div>
    </>
  );
};

export default PhaserRoot;
