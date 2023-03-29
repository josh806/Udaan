import Phaser from 'phaser';
import { Client, Room } from 'colyseus.js';
import { Player } from '../../../../server/colyseus/MySchoolSchema';
import { store } from '../../redux/store';
import { enterVideoCall, openLibrary, closeLibrary } from '../../redux/user';
import { createAnimation } from '../helperfunctions/CreateAnimation';
import { createMap } from '../helperfunctions/CreateMap';
import { loadingComplete } from '../../redux/loading';

import {
  showInstruction,
  hideInstruction,
} from '../helperfunctions/InstructionController';
import {
  movePlayerRight,
  movePlayerDown,
  movePlayerLeft,
  movePlayerUp,
  stopMoving,
  setPlayerPosition,
  makePlayerSit,
} from '../helperfunctions/PlayerActionController';

export default class Game extends Phaser.Scene {
  private currentPlayer!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  private playerName!: Phaser.GameObjects.Text;
  private text!: Phaser.GameObjects.Text;
  private textBox!: Phaser.GameObjects.Rectangle;
  private collisionCounter = 0;
  private checkCollisions = false;
  private userName!: string;
  private spacebar!: Phaser.Input.Keyboard.Key;
  private O!: Phaser.Input.Keyboard.Key;
  private S!: Phaser.Input.Keyboard.Key;
  private sitting = false;
  private inCall = false;
  private isReading = false;
  private chairPosition = [0, 0];
  private chairDirection!: string;
  private avatar!: string;
  private role = 'Student';

  // private client = new Client(import.meta.env.VITE_PHASER);
  private client = new Client('ws://192.168.0.100:4001');
  private room!: Room;

  private playerEntities: {
    [sessionId: string]: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  } = {};
  private cursorKeys!: Phaser.Types.Input.Keyboard.CursorKeys;

  public inputPayload = {
    avatar: this.avatar,
    left: [false, 'moveleft'],
    right: [false, 'moveright'],
    up: [false, 'moveup'],
    down: [false, 'movedown'],
    idle: [false, 'idle'],
    sit: [false, 'sit-right'],
    reading: [false, 'reading'],
    inCall: this.inCall,
    collider: false,
    chairPosition: this.chairPosition,
  };

  constructor() {
    super('game');
  }

  preload() {
    this.cursorKeys = this.input.keyboard.createCursorKeys();
    this.cameras.main.setZoom(0.75);
    this.cameras.main.centerOn(3500, 3500);
    const user = store.getState();
    this.avatar = user.users.avatar;
    this.inputPayload.avatar = this.avatar;
    const allStudents = [
      'Claire',
      'Damien',
      'Daniel',
      'Dona',
      'Jake',
      'Janet',
      'Joaquin',
      'Josh',
      'Kate',
      'Keiko',
      'Kyle',
      'Mathew',
      'Mike',
      'Stacy',
      'Valentin',
      'Victor',
      'Yacine',
    ];
    const allTeachers = ['Jordan', 'Karen', 'Marie', 'Mark', 'Nancy'];
    for (let i = 0; i < allStudents.length; i++) {
      this.load.atlas(
        `${allStudents[i]}`,
        `assets/Student/${allStudents[i]}/${allStudents[i]}.png`,
        `assets/Student/${allStudents[i]}/${allStudents[i]}.json`
      );
    }
    for (let i = 0; i < allTeachers.length; i++) {
      this.load.atlas(
        `${allTeachers[i]}`,
        `assets/Teacher/${allTeachers[i]}/${allTeachers[i]}.png`,
        `assets/Teacher/${allTeachers[i]}/${allTeachers[i]}.json`
      );
    }
  }

  async create() {
    const user = store.getState();
    if (user) {
      this.userName = user.users.username;
    }

    //create map
    const map = this.make.tilemap({ key: 'classroom' });
    const {
      libraryLayer,
      genericLayer,
      libraryPropsLayer,
      genericOverlayLayer,
      genericPropLayer,
      playgroundLayer,
      gameFieldLayer,
      gameFieldPropLayer,
      TreeLayer1,
      TreeLayer2,
      vehiclesLayer,
      swingsLayer,
      musicLayer,
      officeChairLayer,
      interiorSportsLayer,
      bathroomLayer,
      wallsLayer,
      furnitureLayer,
      chairLayer,
      playgroundPropsLayer,
    } = createMap(map);

    //colyseus
    try {
      this.room = await this.client.joinOrCreate('my_school');
      console.log('Joined successfully!');

      this.room.state.players.onAdd((player: Player, sessionId: string) => {
        const entity = this.physics.add.sprite(player.x, player.y, this.avatar);
        this.playerEntities[sessionId] = entity;
        console.log('sesion id', sessionId);
        if (sessionId === this.room.sessionId) {
          this.currentPlayer = entity;
          this.cameras.main.setBounds(0, 0, 7200, 6200, true);
          this.physics.world.setBounds(
            0,
            0,
            7200,
            6200,
            true,
            true,
            true,
            true
          );
          this.currentPlayer.body.collideWorldBounds = true;
          this.cameras.main.setZoom(0.75);
          this.cameras.main.startFollow(this.currentPlayer, true);
          this.playerName = this.add
            .text(
              this.currentPlayer.x + 12,
              this.currentPlayer.y + 64,
              this.userName,
              {
                fontFamily: 'Arial',
                color: '#fff',
              }
            )
            .setVisible(true)
            .setOrigin(0.5)
            .setFontSize(16);

          // add collision between layers
          this.physics.add.collider(this.currentPlayer, genericLayer);
          this.physics.add.collider(this.currentPlayer, libraryPropsLayer);
          this.physics.add.collider(this.currentPlayer, genericOverlayLayer);
          this.physics.add.collider(this.currentPlayer, genericPropLayer);
          this.physics.add.collider(this.currentPlayer, playgroundLayer);
          this.physics.add.collider(this.currentPlayer, gameFieldPropLayer);
          this.physics.add.collider(this.currentPlayer, gameFieldLayer);
          this.physics.add.collider(this.currentPlayer, TreeLayer1);
          this.physics.add.collider(this.currentPlayer, TreeLayer2);
          this.physics.add.collider(this.currentPlayer, vehiclesLayer);
          this.physics.add.collider(this.currentPlayer, swingsLayer);
          this.physics.add.collider(this.currentPlayer, musicLayer);
          this.physics.add.collider(this.currentPlayer, officeChairLayer);
          this.physics.add.collider(this.currentPlayer, interiorSportsLayer);
          this.physics.add.collider(this.currentPlayer, bathroomLayer);
          this.physics.add.collider(this.currentPlayer, playgroundPropsLayer);

          this.physics.add.collider(
            this.currentPlayer,
            wallsLayer,
            this.checkCollision,
            undefined,
            this
          );
          this.physics.add.collider(
            this.currentPlayer,
            furnitureLayer,
            this.checkCollision,
            undefined,
            this
          );
          this.physics.add.collider(
            this.currentPlayer,
            chairLayer,
            this.enterVideoClass,
            undefined,
            this
          );
          this.physics.add.collider(
            this.currentPlayer,
            libraryLayer,
            this.openLibrary,
            undefined,
            this
          );
        } else {
          player.onChange(() => {
            entity.setData('serverX', player.x);
            entity.setData('serverY', player.y);
            entity.setData('animation', player.animation);
            entity.setData('avatar', player.avatar);
          });
        }

        //animations
        createAnimation(entity, this.avatar);
      });

      this.room.state.players.onRemove((player: Player, sessionId: string) => {
        const entity = this.playerEntities[sessionId];
        if (entity) {
          // destroy entity
          entity.destroy();

          // clear local reference
          delete this.playerEntities[sessionId];
        }
      });
    } catch (error) {
      console.log(error);
    }
    // mapping keys from keyboard
    this.spacebar = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );
    this.O = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.O);
    this.S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

    store.dispatch(loadingComplete());
  }

  public checkCollision() {
    this.checkCollisions = true;
  }

  private enterVideoClass(
    p: Phaser.GameObjects.GameObject,
    c: Phaser.GameObjects.GameObject
  ) {
    const player = p as Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    const chair = c as unknown as Phaser.Tilemaps.Tile;
    this.chairDirection = chair.properties.direction;
    this.chairPosition[0] = chair.pixelX + chair.width / 2;
    this.chairPosition[1] = chair.pixelY + chair.height / 2;
    this.checkCollisions = true;
    if (this.collisionCounter === 0) {
      showInstruction(this, 'Press space to join the class');
      this.collisionCounter++;
    }
  }
  private openLibrary(
    p: Phaser.GameObjects.GameObject,
    c: Phaser.GameObjects.GameObject
  ) {
    const player = p as Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    const chair = c as unknown as Phaser.Tilemaps.Tile;
    this.chairDirection = chair.properties.direction;
    this.chairPosition[0] = chair.pixelX + chair.width / 2;
    this.chairPosition[1] = chair.pixelY + chair.height / 2;
    this.checkCollisions = true;
    if (this.collisionCounter === 0) {
      showInstruction(this, 'Press' + ' O ' + 'to view your lessons');
      this.collisionCounter++;
    }
  }
  update() {
    if (!this.room) {
      return;
    }
    if (!this.currentPlayer) {
      return;
    }

    const user = store.getState();
    if (user.users.inCall) {
      this.inCall = user.users.inCall;
    } else {
      this.inCall = false;
    }
    if (user.users.isReading) {
      this.isReading = user.users.isReading;
      this.input.keyboard.manager.enabled = false;
    } else {
      this.input.keyboard.manager.enabled = true;
      this.isReading = false;
    }
    this.inputPayload.left[0] = this.cursorKeys.left.isDown;
    this.inputPayload.right[0] = this.cursorKeys.right.isDown;
    this.inputPayload.up[0] = this.cursorKeys.up.isDown;
    this.inputPayload.down[0] = this.cursorKeys.down.isDown;
    if (!this.checkCollisions) {
      this.room.send('move', this.inputPayload);
    } else {
      this.room.send('stop', this.inputPayload);
    }

    const velocity = 6;
    if (this.inputPayload.left[0]) {
      movePlayerLeft(this.currentPlayer, velocity);
    } else if (this.inputPayload.right[0]) {
      movePlayerRight(this.currentPlayer, velocity);
    } else if (this.inputPayload.up[0]) {
      movePlayerUp(this.currentPlayer, velocity);
    } else if (this.inputPayload.down[0]) {
      movePlayerDown(this.currentPlayer, velocity);
    } else if (
      Phaser.Input.Keyboard.JustDown(this.spacebar) &&
      this.collisionCounter > 0
    ) {
      this.sitting = true;
      this.collisionCounter++;
      if (this.collisionCounter === 2) {
        hideInstruction(this);
        store.dispatch(enterVideoCall());
        setPlayerPosition(
          this.currentPlayer,
          this.chairPosition[0],
          this.chairPosition[1]
        );
        makePlayerSit(
          this.currentPlayer,
          this.inputPayload,
          this.chairDirection
        );
        this.room.send('move', this.inputPayload);
        this.collisionCounter = 0;
      }
    } else if (
      Phaser.Input.Keyboard.JustDown(this.O) &&
      this.collisionCounter > 0
    ) {
      this.collisionCounter++;
      if (this.collisionCounter === 2) {
        hideInstruction(this);
        // dispatch to display the lessons
        store.dispatch(openLibrary());
        setPlayerPosition(
          this.currentPlayer,
          this.chairPosition[0],
          this.chairPosition[1]
        );
        this.currentPlayer.anims.play('reading', true);
        this.inputPayload.reading[0] = true;
        this.room.send('move', this.inputPayload);
        this.collisionCounter = 0;
      }
    } else {
      stopMoving(this.currentPlayer);

      if ((!this.sitting || !this.inCall) && !this.isReading) {
        this.currentPlayer.anims.play('idle', true);
        this.inputPayload.sit[0] = false;
        this.room.send('move', this.inputPayload);
      }
    }

    for (const sessionId in this.playerEntities) {
      // interpolate all player entities

      if (sessionId === this.room.sessionId) {
        continue;
      }
      const entity = this.playerEntities[sessionId];
      const { serverX, serverY, animation, avatar } = entity.data.values;

      entity.x = Phaser.Math.Linear(entity.x, serverX, 0.2);
      entity.y = Phaser.Math.Linear(entity.y, serverY, 0.2);
      entity.anims.play(`${animation}`, true);
      entity.texture.manager.setTexture(entity, avatar);
    }

    this.checkCollisions = false;
    // player name follows the character
    this.playerName.x = this.currentPlayer.body.position.x + 12;
    this.playerName.y = this.currentPlayer.body.position.y + 64;
  }
}
