import { Room, Client } from 'colyseus';
import { MySchoolSchema, Player } from './MySchoolSchema';

export class MySchool extends Room<MySchoolSchema> {
  onCreate () {
    this.setState(new MySchoolSchema());

    this.onMessage('move', (client, input) => {
      const player = this.state.players.get(client.sessionId);
      const velocity = 2;
      if (!input.collider) {
        if (input.left[0]) {
          player.x -= velocity;
          player.animation = input.left[1];
        } else if (input.right[0]) {
          player.x += velocity;
          player.animation = input.right[1];
        } else if (input.up[0]) {
          player.y -= velocity;
          player.animation = input.up[1];
        } else if (input.down[0]) {
          player.y += velocity;
          player.animation = input.down[1];
        } else if (input.sit[0]) {
          player.x = input.chairPosition[0];
          player.y = input.chairPosition[1];
          player.animation = input.sit[1];
        } else {
          player.x += 0;
          player.y += 0;
          player.animation = input.idle[1];
        }
      }
    });
    this.onMessage('stop', (client, input) => {
      const player = this.state.players.get(client.sessionId);
      if (input.left[0]) {
        player.x -= 0;
        player.animation = input.left[1];
      } else if (input.right[0]) {
        player.x += 0;
        player.animation = input.right[1];
      } else if (input.up[0]) {
        player.y -= 0;
        player.animation = input.up[1];
      } else if (input.down[0]) {
        player.y += 0;
        player.animation = input.down[1];
      } else {
        player.x += 0;
        player.y += 0;
        player.animation = 'idle';
      }
    });
  }

  onJoin (client: Client) {
    console.log(client.sessionId, 'joined!');

    // create Player instance
    const player = new Player();
    player.x = 325;
    player.y = 600;

    // place player in the map of players by its sessionId
    this.state.players.set(client.sessionId, player);
  }

  onLeave (client: Client) {
    console.log(client.sessionId, 'left!');

    this.state.players.delete(client.sessionId);
  }

  onDispose () {
    console.log('room', this.roomId, 'disposing...');
  }
}
