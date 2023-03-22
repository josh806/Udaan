import Phaser from 'phaser';
import { Client, Room } from 'colyseus.js';
import { Player } from '../../../server/colyseus/MySchoolSchema';
import { store } from '../redux/store';

export default class Game extends Phaser.Scene {
  private currentPlayer!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  private playerName!: Phaser.GameObjects.Text;
  private text!: Phaser.GameObjects.Text;
  private textBox!: Phaser.GameObjects.Rectangle;
  private collisionCounter = 0;
  private checkCollisions = false;
  private userName!: string;

  private localRef!: Phaser.GameObjects.Rectangle;
  private remoteRef!: Phaser.GameObjects.Rectangle;

  // private client = new Client(import.meta.env.VITE_PHASER);
  private client = new Client('ws://192.168.0.180:4001');
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
    collider: false,
  };

  constructor() {
    super('game');
  }

  preload() {
    const user = store.getState();
    this.userName = user.users.name;
    this.cursorKeys = this.input.keyboard.createCursorKeys();
  }

  async create() {
    const map = this.make.tilemap({ key: 'classroom' });
    const floorlayout = map.addTilesetImage('floor', 'floor');
    const furniturelayout = map.addTilesetImage('furnitures', 'furnitures');
    map.createLayer('Ground', floorlayout);
    const wallsLayer = map.createLayer('Wall', floorlayout);
    const furnitureLayer = map.createLayer('Furnitures', furniturelayout);
    const chairLayer = map.createLayer('Chairs', furniturelayout);

    wallsLayer.setCollisionByProperty({ collides: true });
    furnitureLayer.setCollisionByProperty({ collides: true });
    chairLayer.setCollisionByProperty({ collides: true });

    // to be removed: to see the collidable surface
    const debugGraphics = this.add.graphics().setAlpha(0.7);
    wallsLayer.renderDebug(debugGraphics, {
      tileColor: null,
      collidingTileColor: new Phaser.Display.Color(243, 243, 48, 255),
      faceColor: new Phaser.Display.Color(40, 39, 37, 255),
    });

    //colyseus
    try {
      this.room = await this.client.joinOrCreate('my_school');
      console.log('Joined successfully!');

      this.room.state.players.onAdd((player: Player, sessionId: string) => {
        const entity = this.physics.add.sprite(player.x, player.y, 'bob');
        this.playerEntities[sessionId] = entity;

        console.log('sesion id', sessionId);
        if (sessionId === this.room.sessionId) {
          this.currentPlayer = entity;
          this.localRef = this.add.rectangle(0, 0, entity.width, entity.height);
          this.localRef.setStrokeStyle(1, 0x00ff00);

          // to be removed: remoteRef is being used for debug only
          this.remoteRef = this.add.rectangle(
            0,
            0,
            entity.width,
            entity.height
          );
          this.remoteRef.setStrokeStyle(1, 0xff0000);
          // listening for server updates
          player.onChange(() => {
            this.remoteRef.x = player.x;
            this.remoteRef.y = player.y;
          });

          this.cameras.main.startFollow(this.currentPlayer);
          this.playerName = this.add
            .text(
              this.currentPlayer.x + 8,
              this.currentPlayer.y + 32,
              this.userName,
              {
                fontFamily: 'Arial',
                color: '#fff',
              }
            )
            .setVisible(true)
            .setOrigin(0.5)
            .setFontSize(16);

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
        } else {
          player.onChange(() => {
            entity.setData('serverX', player.x);
            entity.setData('serverY', player.y);
            entity.setData('animation', player.animation);
          });
        }

        //animations
        entity.anims.create({
          key: 'moveright',
          frames: entity.anims.generateFrameNames('bob', {
            prefix: 'right',
            end: 5,
            zeroPad: 2,
          }),
          repeat: -1,
        });
        entity.anims.create({
          key: 'moveup',
          frames: entity.anims.generateFrameNames('bob', {
            prefix: 'up',
            end: 5,
            zeroPad: 2,
          }),
          repeat: -1,
        });
        entity.anims.create({
          key: 'moveleft',
          frames: entity.anims.generateFrameNames('bob', {
            prefix: 'left',
            end: 5,
            zeroPad: 2,
          }),
          repeat: -1,
        });
        entity.anims.create({
          key: 'movedown',
          frames: entity.anims.generateFrameNames('bob', {
            prefix: 'down',
            end: 3,
            zeroPad: 2,
          }),
          repeat: -1,
        });
        entity.anims.create({
          key: 'idle',
          frames: entity.anims.generateFrameNames('bob', {
            prefix: 'down',
            end: 0,
            zeroPad: 2,
          }),
          repeat: -1,
        });
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
  }

  public checkCollision() {
    this.checkCollisions = true;
  }

  private enterVideoClass() {
    this.checkCollisions = true;
    if (this.collisionCounter === 0) {
      const screenCenterX = this.cameras.main.worldView.centerX;
      const screenCenterY = this.cameras.main.worldView.centerY;
      this.textBox = this.add
        .rectangle(screenCenterX, screenCenterY - 60, 320, 40, 0xffffff)
        .setVisible(true);
      this.text = this.add
        .text(
          screenCenterX,
          screenCenterY - 60,
          'Press space to join the class',
          { fontFamily: 'Arial', color: '#000' }
        )
        .setVisible(true)
        .setOrigin(0.5)
        .setFontSize(24);
      this.text.setDepth(1);
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

    const velocity = 2;
    if (!this.checkCollisions) {
      this.inputPayload.left[0] = this.cursorKeys.left.isDown;
      this.inputPayload.right[0] = this.cursorKeys.right.isDown;
      this.inputPayload.up[0] = this.cursorKeys.up.isDown;
      this.inputPayload.down[0] = this.cursorKeys.down.isDown;
      this.room.send('move', this.inputPayload);
    } else {
      this.inputPayload.left[0] = this.cursorKeys.left.isDown;
      this.inputPayload.right[0] = this.cursorKeys.right.isDown;
      this.inputPayload.up[0] = this.cursorKeys.up.isDown;
      this.inputPayload.down[0] = this.cursorKeys.down.isDown;
      this.room.send('stop', this.inputPayload);
    }

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
    } else if (this.cursorKeys.space.isDown) {
      this.collisionCounter = 0;
      this.textBox.setVisible(false);
      this.text.setVisible(false);
    } else {
      this.currentPlayer.x += 0;
      this.currentPlayer.setVelocityX(0);
      this.currentPlayer.y += 0;
      this.currentPlayer.setVelocityY(0);
      this.currentPlayer.anims.play('idle');
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
    this.playerName.x = this.currentPlayer.body.position.x + 8;
    this.playerName.y = this.currentPlayer.body.position.y + 32;
  }
}
