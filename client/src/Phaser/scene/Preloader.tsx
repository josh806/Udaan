import Phaser from 'phaser';
import { store } from '../../redux/store';
export default class Preloader extends Phaser.Scene {
  avatar!: string;
  role = 'Student';
  constructor() {
    super('preloader');
  }
  preload() {
    // load all images
    this.load.image('bathroom', '/tiles/Interiors/Bathroom_Black_Shadow.png');
    this.load.image(
      'classroom_furnitures',
      'tiles/Interiors/Classroom_and_library_Black_Shadow.png'
    );
    this.load.image('generic', '/tiles/Interiors/Generic_Black_Shadow.png');
    this.load.image('Room_Builder', 'tiles/Room_Builder.png');
    this.load.image('basement', '/tiles/Interiors/Basement_Black_Shadow.png');
    this.load.image(
      'music',
      '/tiles/Interiors/Music_and_sport_Black_Shadow.png'
    );
    this.load.image('parking', '/tiles/Exterior/parking.png');
    this.load.image('playground', '/tiles/Exterior/Villas.png');
    this.load.image('school_exterior', 'tiles/Exterior/School.png');
    this.load.image('swimming_pool', '/tiles/Exterior/Swimming_Pool.png');
    this.load.image('swings', '/tiles/Exterior/swings.png');
    this.load.image('trees', '/tiles/Exterior/Camping.png');
    this.load.image('vehicles', '/tiles/Exterior/Vehicles.png');

    this.load.tilemapTiledJSON('classroom', 'tiles/Udaan.tmj');

    const user = store.getState();
    this.avatar = user.users.avatar;
    const isStudent = user.users.student;
    if (!isStudent) {
      this.role = 'Teacher';
    }
    this.load.atlas(
      `${this.avatar}`,
      `assets/${this.role}/${this.avatar}.png`,
      `assets/${this.role}/${this.avatar}.json`
    );
  }
  create() {
    this.scene.start('game');
  }
}
