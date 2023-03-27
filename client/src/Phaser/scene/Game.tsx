import Phaser from 'phaser';
import { Client, Room } from 'colyseus.js';
import { Player } from '../../../../server/colyseus/MySchoolSchema';
import { store } from '../../redux/store';
import { enterVideoCall } from '../../redux/user';
import { CreateAnimation } from '../helperfunctions/CreateAnimation';
import { CreateMap } from '../helperfunctions/CreateMap';
import { ShowInstruction } from '../helperfunctions/ShowInstruction';

export default class Game extends Phaser.Scene {
  private currentPlayer!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  private playerName!: Phaser.GameObjects.Text;
  private text!: Phaser.GameObjects.Text;
  private textBox!: Phaser.GameObjects.Rectangle;
  private collisionCounter = 0;
  private checkCollisions = false;
  private userName!: string;
  private spacebar!: Phaser.Input.Keyboard.Key;
  private sitting = false;
  private inCall = false;
  private chairPosition = [0, 0];
  private chairDirection!: string;
  private avatar = 'Jake';
  private localRef!: Phaser.GameObjects.Rectangle;
  private remoteRef!: Phaser.GameObjects.Rectangle;

  // private client = new Client(import.meta.env.VITE_PHASER);
  private client = new Client('ws://192.168.0.241:4001');
  private room!: Room;

  private playerEntities: {
    [sessionId: string]: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  } = {};
  private cursorKeys!: Phaser.Types.Input.Keyboard.CursorKeys;

  public inputPayload = {
    left: [false, 'moveleft'],
    right: [false, 'moveright'],
    up: [false, 'moveup'],
    down: [false, 'movedown'],
    idle: [false, 'idle'],
    sit: [false, 'sit-right'],
    inCall: this.inCall,
    collider: false,
    chairPosition: this.chairPosition,
  };

  constructor() {
    super('game');
  }

  preload() {
    this.cursorKeys = this.input.keyboard.createCursorKeys();
  }

  async create() {
    const user = store.getState();
    if (user) {
      this.userName = user.users.firstName;
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
    } = CreateMap(map);

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
          // this.localRef = this.add.rectangle(0, 0, entity.width, entity.height);
          // this.localRef.setStrokeStyle(1, 0x00ff00);

          // to be removed: remoteRef is being used for debug only
          // this.remoteRef = this.add.rectangle(
          //   0,
          //   0,
          //   entity.width,
          //   entity.height
          // );
          // this.remoteRef.setStrokeStyle(1, 0xff0000);
          // // listening for server updates
          // player.onChange(() => {
          //   this.remoteRef.x = player.x;
          //   this.remoteRef.y = player.y;
          // });
          this.cameras.main.setZoom(0.75);

          this.cameras.main.startFollow(this.currentPlayer);
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
          this.physics.add.collider(this.currentPlayer, libraryLayer);
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
            undefined
          );
        } else {
          player.onChange(() => {
            entity.setData('serverX', player.x);
            entity.setData('serverY', player.y);
            entity.setData('animation', player.animation);
          });
        }

        //animations
        CreateAnimation(entity, this.avatar);
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
    this.spacebar = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );
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
      ShowInstruction(this, 'Press space to join the class');
      this.collisionCounter++;
    }
  }
  private openLibrary(
    p: Phaser.GameObjects.GameObject,
    c: Phaser.GameObjects.GameObject
  ) {
    const player = p as Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    const chair = c as unknown as Phaser.Tilemaps.Tile;
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
      console.log(this.inCall);
    } else {
      this.inCall = false;
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
      this.currentPlayer.x -= velocity;
      this.currentPlayer.setVelocityX(-velocity);
      this.currentPlayer.anims.play('moveleft', true);
    } else if (this.inputPayload.right[0]) {
      this.currentPlayer.x += velocity;
      this.currentPlayer.setVelocityX(velocity);
      this.currentPlayer.anims.play('moveright', true);
    } else if (this.inputPayload.up[0]) {
      this.currentPlayer.y -= velocity;
      this.currentPlayer.setVelocityY(-velocity);
      this.currentPlayer.anims.play('moveup', true);
    } else if (this.inputPayload.down[0]) {
      this.currentPlayer.y += velocity;
      this.currentPlayer.setVelocityY(velocity);
      this.currentPlayer.anims.play('movedown', true);
    } else if (
      Phaser.Input.Keyboard.JustDown(this.spacebar) &&
      this.collisionCounter > 0
    ) {
      this.sitting = true;
      this.collisionCounter++;
      console.log(this.collisionCounter);
      if (this.collisionCounter === 2) {
        this.textBox.setVisible(false);
        this.text.setVisible(false);
        store.dispatch(enterVideoCall());
        this.currentPlayer.x = this.chairPosition[0];
        this.currentPlayer.y = this.chairPosition[1];
        this.currentPlayer.setPosition(
          this.chairPosition[0],
          this.chairPosition[1]
        );
        if (this.chairDirection === 'right') {
          this.currentPlayer.anims.play('sit-right', true);
          this.inputPayload.sit[1] = 'sit-right';
        } else {
          this.currentPlayer.anims.play('sit-left', true);
          this.inputPayload.sit[1] = 'sit-left';
        }
        this.inputPayload.sit[0] = true;
        this.room.send('move', this.inputPayload);
        this.collisionCounter = 0;
      }
    } else {
      this.currentPlayer.x += 0;
      this.currentPlayer.setVelocityX(0);
      this.currentPlayer.y += 0;
      this.currentPlayer.setVelocityY(0);

      if (!this.sitting || !this.inCall) {
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
      const { serverX, serverY, animation } = entity.data.values;

      entity.x = Phaser.Math.Linear(entity.x, serverX, 0.2);
      entity.y = Phaser.Math.Linear(entity.y, serverY, 0.2);
      entity.anims.play(`${animation}`, true);
    }

    this.checkCollisions = false;
    // player name follows the character
    this.playerName.x = this.currentPlayer.body.position.x + 12;
    this.playerName.y = this.currentPlayer.body.position.y + 64;
  }
}
