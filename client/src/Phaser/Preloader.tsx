import Phaser from 'phaser';
export default class Preloader extends Phaser.Scene {
  constructor() {
    super('preloader');
  }
  preload() {
    // this.load.image('furnitures', 'tiles/Furnitures.png');
    // this.load.image('floor', 'tiles/Floor.png');

    this.load.image(
      'Terrains_and_Fences',
      'tiles/Exterior/Terrains_and_Fences.png'
    );
    this.load.image('Room_Builder', 'tiles/Room_Builder.png');
    this.load.image(
      'Classroom',
      'tiles/Interiors/Classroom_and_library_Black_Shadow.png'
    );
    this.load.image('SchoolExterior', 'tiles/Exterior/School.png');
    // this.load.tilemapTiledJSON('classroom', 'tiles/classroomwithchairs.tmj');
    this.load.tilemapTiledJSON('classroom', 'tiles/Udaan.tmj');
    const player = 'Dona';
    this.load.atlas(
      `${player}`,
      `assets/${player}.png`,
      `assets/${player}.json`
    );
  }
  create() {
    this.scene.start('game');
  }
}
