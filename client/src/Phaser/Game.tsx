import Phaser from 'phaser';
import { Client, Room } from 'colyseus.js';
import { Player } from '../../../server/colyseus/MySchoolSchema';
import { store } from '../redux/store';
import { enterVideoCall } from '../redux/user';
import { MapsHomeWork } from '@mui/icons-material';

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
  private avatar = 'Dona';

  private localRef!: Phaser.GameObjects.Rectangle;
  private remoteRef!: Phaser.GameObjects.Rectangle;

  // private client = new Client(import.meta.env.VITE_PHASER);
  private client = new Client('https://colyseus-classzoom.cyclic.app');
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
    sit: [false, 'sit'],
    inCall: this.inCall,
    collider: false,
    chairPosition: this.chairPosition,
  };

  constructor() {
    super('game');
  }

  preload() {
    const user = store.getState();
    this.userName = user.users.firstName;
    this.cursorKeys = this.input.keyboard.createCursorKeys();
  }

  async create() {
    const map = this.make.tilemap({ key: 'classroom' });

    // map all the tilesets
    const exterior_groundLayout = map.addTilesetImage('swings', 'swings');
    const schoolExteriorLayout = map.addTilesetImage(
      'school_exterior',
      'school_exterior'
    );
    const schoolInteriorLayout = map.addTilesetImage(
      'interior_floor',
      'Room_Builder'
    );
    const classRoomLayout = map.addTilesetImage(
      'classroom_furnitures',
      'classroom_furnitures'
    );
    const bathRoomLayout = map.addTilesetImage('bathroom', 'bathroom');
    const genericLayout = map.addTilesetImage('generic', 'generic');
    const interiorSportsLayout = map.addTilesetImage(
      'interior_sports',
      'basement'
    );
    const musicLayout = map.addTilesetImage('music', 'music');
    const parkingLayout = map.addTilesetImage('parking', 'parking');
    const playgroundLayout = map.addTilesetImage('playground', 'playground');
    const swimmingPoolLayout = map.addTilesetImage(
      'swimming_pool',
      'swimming_pool'
    );
    const swingsLayout = map.addTilesetImage('swings', 'swings');
    const treesLayout = map.addTilesetImage('trees', 'trees');
    const vehicleLayout = map.addTilesetImage('vehicles', 'vehicles');

    // map all the layers from the tilesets
    map.createLayer('Exterior_ground', exterior_groundLayout);
    map.createLayer('Interior_floor', schoolInteriorLayout);
    const wallsLayer = map.createLayer('interior_walls', schoolInteriorLayout);
    map.createLayer('Library', classRoomLayout);
    const furnitureLayer = map.createLayer(
      'classroom_furnitures',
      classRoomLayout
    );
    const genericLayer = map.createLayer('generic', genericLayout);
    const libraryPropsLayer = map.createLayer('Library_props', classRoomLayout);
    const genericOverlayLayer = map.createLayer(
      'generic_overlay',
      genericLayout
    );
    const genericPropLayer = map.createLayer('generic_prop', genericLayout);
    const gameFieldLayer = map.createLayer('Game_field', schoolExteriorLayout);
    map.createLayer('Swimming_pool', swimmingPoolLayout);
    map.createLayer('Swimming_pool_prop', swimmingPoolLayout);
    const playgroundLayer = map.createLayer('playground', playgroundLayout);
    const playgroundPropsLayer = map.createLayer(
      'playground_props',
      playgroundLayout
    );
    map.createLayer('parking', parkingLayout);
    const gameFieldPropLayer = map.createLayer(
      'game_field_props',
      schoolExteriorLayout
    );
    const TreeLayer1 = map.createLayer('Tree_layer_1', treesLayout);
    const vehiclesLayer = map.createLayer('Vehicles', vehicleLayout);
    const TreeLayer2 = map.createLayer('Tree_layer_2', treesLayout);
    const swingsLayer = map.createLayer('swings', swingsLayout);
    const musicLayer = map.createLayer('Music', musicLayout);
    const officeChairLayer = map.createLayer(
      'office_chairs',
      interiorSportsLayout
    );
    const interiorSportsLayer = map.createLayer(
      'Interior_sports',
      interiorSportsLayout
    );
    const chairLayer = map.createLayer('chairs', classRoomLayout);
    map.createLayer('classroom_props', classRoomLayout);
    map.createLayer('interior_sports_prop', interiorSportsLayout);
    const bathroomLayer = map.createLayer('bathroom', bathRoomLayout);

    genericLayer.setCollisionByProperty({ collides: true });
    libraryPropsLayer.setCollisionByProperty({ collides: true });
    genericOverlayLayer.setCollisionByProperty({ collides: true });
    genericPropLayer.setCollisionByProperty({ collides: true });
    playgroundLayer.setCollisionByProperty({ collides: true });
    gameFieldPropLayer.setCollisionByProperty({ collides: true });
    gameFieldLayer.setCollisionByProperty({ collides: true });
    TreeLayer1.setCollisionByProperty({ collides: true });
    TreeLayer2.setCollisionByProperty({ collides: true });
    vehiclesLayer.setCollisionByProperty({ collides: true });
    swingsLayer.setCollisionByProperty({ collides: true });
    musicLayer.setCollisionByProperty({ collides: true });
    officeChairLayer.setCollisionByProperty({ collides: true });
    interiorSportsLayer.setCollisionByProperty({ collides: true });
    bathroomLayer.setCollisionByProperty({ collides: true });
    wallsLayer.setCollisionByProperty({ collides: true });
    furnitureLayer.setCollisionByProperty({ collides: true });
    chairLayer.setCollisionByProperty({ collides: true });
    playgroundPropsLayer.setCollisionByProperty({ collides: true });

    // to be removed: to see the collidable surface
    // const debugGraphics = this.add.graphics().setAlpha(0.7);
    // wallsLayer.renderDebug(debugGraphics, {
    //   tileColor: null,
    //   collidingTileColor: new Phaser.Display.Color(243, 243, 48, 255),
    //   faceColor: new Phaser.Display.Color(40, 39, 37, 255),
    // });

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
              this.currentPlayer.x + 8,
              this.currentPlayer.y + 48,
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
          frames: entity.anims.generateFrameNames(this.avatar, {
            prefix: 'right_walk-',
            end: 5,
            zeroPad: 1,
          }),
          repeat: -1,
        });
        entity.anims.create({
          key: 'moveup',
          frames: entity.anims.generateFrameNames(this.avatar, {
            prefix: 'up_walk-',
            end: 5,
            zeroPad: 1,
          }),
          repeat: -1,
        });
        entity.anims.create({
          key: 'moveleft',
          frames: entity.anims.generateFrameNames(this.avatar, {
            prefix: 'left_walk-',
            end: 5,
            zeroPad: 1,
          }),
          repeat: -1,
        });
        entity.anims.create({
          key: 'movedown',
          frames: entity.anims.generateFrameNames(this.avatar, {
            prefix: 'down_walk-',
            end: 5,
            zeroPad: 1,
          }),
          repeat: -1,
        });
        entity.anims.create({
          key: 'idle',
          frames: entity.anims.generateFrameNames(this.avatar, {
            prefix: 'down_idle-',
            end: 5,
            zeroPad: 1,
          }),
          frameRate: 8,
          repeat: -1,
        });
        entity.anims.create({
          key: 'sit',
          frames: entity.anims.generateFrameNames(this.avatar, {
            prefix: 'right_sitting-',
            end: 5,
            zeroPad: 1,
          }),
          frameRate: 8,
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
    this.chairPosition[0] = chair.pixelX + chair.width / 2;
    this.chairPosition[1] = chair.pixelY - chair.height / 2;
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
    const user = store.getState();
    if (user.users.inCall) {
      this.inCall = user.users.inCall;
    }

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
        this.currentPlayer.anims.play('sit', true);
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
        this.currentPlayer.anims.play('idle');
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
      console.log(entity.x);
    }

    this.checkCollisions = false;
    // player name follows the character
    this.playerName.x = this.currentPlayer.body.position.x + 8;
    this.playerName.y = this.currentPlayer.body.position.y + 48;
  }
}
