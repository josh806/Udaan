import Phaser from "phaser";

export default class Game extends Phaser.Scene {
  private player!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
  private playerName!: Phaser.GameObjects.Text;
  private text!: Phaser.GameObjects.Text;
  private textBox!: Phaser.GameObjects.Rectangle;
  private collisionCounter: number = 0;
  constructor() {
    super("game");
  }

  preload() {}

  create() {
    const map = this.make.tilemap({ key: "classroom" });
    const floorlayout = map.addTilesetImage("floor", "floor");
    const furniturelayout = map.addTilesetImage("furnitures", "furnitures");
    map.createLayer("Ground", floorlayout);
    const wallsLayer = map.createLayer("Wall", floorlayout);
    const furnitureLayer = map.createLayer("Furnitures", furniturelayout);
    const chairLayer = map.createLayer("Chairs", furniturelayout);

    wallsLayer.setCollisionByProperty({ collides: true });
    furnitureLayer.setCollisionByProperty({ collides: true });
    chairLayer.setCollisionByProperty({ collides: true });

    this.player = this.physics.add.sprite(300, 500, "bob");
    this.cameras.main.startFollow(this.player);
    this.playerName = this.add
      .text(this.player.x + 8, this.player.y + 32, "josh", {
        fontFamily: "Arial",
        color: "#fff",
      })
      .setVisible(true)
      .setOrigin(0.5)
      .setFontSize(16);

    //animations
    this.player.anims.create({
      key: "moveright",
      frames: this.player.anims.generateFrameNames("bob", {
        prefix: "right",
        end: 5,
        zeroPad: 2,
      }),
      repeat: -1,
    });
    this.player.anims.create({
      key: "moveup",
      frames: this.player.anims.generateFrameNames("bob", {
        prefix: "up",
        end: 5,
        zeroPad: 2,
      }),
      repeat: -1,
    });
    this.player.anims.create({
      key: "moveleft",
      frames: this.player.anims.generateFrameNames("bob", {
        prefix: "left",
        end: 5,
        zeroPad: 2,
      }),
      repeat: -1,
    });
    this.player.anims.create({
      key: "movedown",
      frames: this.player.anims.generateFrameNames("bob", {
        prefix: "down",
        end: 4,
        zeroPad: 2,
      }),
      repeat: -1,
    });
    this.player.anims.create({
      key: "turn",
      frames: this.player.anims.generateFrameNames("bob", {
        prefix: "down",
        end: 0,
        zeroPad: 2,
      }),
      repeat: -1,
    });

    this.physics.add.collider(this.player, wallsLayer);
    this.physics.add.collider(this.player, furnitureLayer);
    this.physics.add.collider(
      this.player,
      chairLayer,
      this.enterVideoClass,
      undefined,
      this
    );
  }
  private enterVideoClass() {
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
          "Press space to join the class",
          { fontFamily: "Arial", color: "#000" }
        )
        .setVisible(true)
        .setOrigin(0.5)
        .setFontSize(24);
      this.text.setDepth(1);
      this.collisionCounter++;
    }
  }

  update() {
    this.cursors = this.input.keyboard.createCursorKeys();
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-100);
      this.player.anims.play("moveleft", true);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(100);
      this.player.anims.play("moveright", true);
    } else if (this.cursors.up.isDown) {
      this.player.setVelocityY(-100);
      this.player.anims.play("moveup", true);
    } else if (this.cursors.down.isDown) {
      this.player.setVelocityY(+100);
      this.player.anims.play("movedown", true);
    } else if (this.cursors.space.isDown) {
      this.collisionCounter = 0;
      this.textBox.setVisible(false);
      this.text.setVisible(false);
    } else {
      this.player.setVelocityX(0);
      this.player.setVelocityY(0);
      this.player.anims.play("turn");
    }
    // player name follows the character
    this.playerName.x = this.player.body.position.x + 8;
    this.playerName.y = this.player.body.position.y + 32;
  }
}
