import Phaser from 'phaser';
export default class Preloader extends Phaser.Scene {
  constructor() {
    super('preloader');
  }
  preload() {
    this.load.image('furnitures', 'tiles/Furnitures.png');
    this.load.image('floor', 'tiles/Floor.png');
    this.load.tilemapTiledJSON('classroom', 'tiles/classroomwithchairs.tmj');
    this.load.atlas('bob', 'assets/Bob_16x16.png', 'assets/Bob_test.json');
  }
  create() {
    this.scene.start('game');
  }
}
