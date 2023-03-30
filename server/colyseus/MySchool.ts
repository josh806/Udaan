
import { Room, Client } from 'colyseus';
import { MySchoolSchema, Player } from './MySchoolSchema';

export class MySchool extends Room<MySchoolSchema> {
  private image = { josh: 'Jake' };
  onCreate () {
    this.setState(new MySchoolSchema());

    this.onMessage('move', (client, input) => {
      const player = this.state.players.get(client.sessionId);
      const velocity = 6;
      // player.avatar = input.avatar;
      if (!input.collider) {
        if (input.left[0]) {
          player.x -= velocity;
          player.animation = input.left[1];
          player.avatar = input.avatar;
        } else if (input.right[0]) {
          player.x += velocity;
          player.animation = input.right[1];
          player.avatar = input.avatar;
        } else if (input.up[0]) {
          player.y -= velocity;
          player.animation = input.up[1];
          player.avatar = input.avatar;
        } else if (input.down[0]) {
          player.y += velocity;
          player.animation = input.down[1];
          player.avatar = input.avatar;
        } else if (input.sit[0]) {
          player.x = input.chairPosition[0];
          player.y = input.chairPosition[1];
          player.animation = input.sit[1];
          player.avatar = input.avatar;
        } else if (input.reading[0]) {
          player.x = input.chairPosition[0];
          player.y = input.chairPosition[1];
          player.animation = input.reading[1];
          player.avatar = input.avatar;
        } else {
          player.x += 0;
          player.y += 0;
          player.animation = input.idle[1];
          player.avatar = input.avatar;
        }
      }
    });
    this.onMessage('stop', (client, input) => {
      const player = this.state.players.get(client.sessionId);
      // player.avatar = input.avatar;
      if (input.left[0]) {
        player.x -= 0;
        player.animation = input.left[1];
        player.avatar = input.avatar;
      } else if (input.right[0]) {
        player.x += 0;
        player.animation = input.right[1];
        player.avatar = input.avatar;
      } else if (input.up[0]) {
        player.y -= 0;
        player.animation = input.up[1];
        player.avatar = input.avatar;
      } else if (input.down[0]) {
        player.y += 0;
        player.animation = input.down[1];
        player.avatar = input.avatar;
      } else {
        player.x += 0;
        player.y += 0;
        player.animation = 'idle';
        player.avatar = input.avatar;
      }
    });
    this.onMessage('avatar', (client, input) => {
      this.image[`${client.sessionId}`] = input.avatar;
    });
  }

  onJoin (client: Client) {
    console.log(client.sessionId, 'joined!');
    // create Player instance
    setTimeout(() => {
      const player = new Player();
      player.x = 3500;
      player.y = 3500;
      player.avatar = this.image[client.sessionId];

      // place player in the map of players by its sessionId
      this.state.players.set(client.sessionId, player);
    }, 1000);
  }

  onLeave (client: Client) {
    console.log(client.sessionId, 'left!');
    delete this.image[client.sessionId];
    this.state.players.delete(client.sessionId);
  }

  onDispose () {
    console.log('room', this.roomId, 'disposing...');
  }
}
