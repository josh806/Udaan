"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MySchool = void 0;
const colyseus_1 = require("colyseus");
const MySchoolSchema_1 = require("./MySchoolSchema");
class MySchool extends colyseus_1.Room {
    onCreate() {
        this.setState(new MySchoolSchema_1.MySchoolSchema());
        this.onMessage('move', (client, input) => {
            const player = this.state.players.get(client.sessionId);
            const velocity = 6;
            if (!input.collider) {
                if (input.left[0]) {
                    player.x -= velocity;
                    player.animation = input.left[1];
                }
                else if (input.right[0]) {
                    player.x += velocity;
                    player.animation = input.right[1];
                }
                else if (input.up[0]) {
                    player.y -= velocity;
                    player.animation = input.up[1];
                }
                else if (input.down[0]) {
                    player.y += velocity;
                    player.animation = input.down[1];
                }
                else if (input.sit[0]) {
                    player.x = input.chairPosition[0];
                    player.y = input.chairPosition[1];
                    player.animation = input.sit[1];
                }
                else {
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
            }
            else if (input.right[0]) {
                player.x += 0;
                player.animation = input.right[1];
            }
            else if (input.up[0]) {
                player.y -= 0;
                player.animation = input.up[1];
            }
            else if (input.down[0]) {
                player.y += 0;
                player.animation = input.down[1];
            }
            else {
                player.x += 0;
                player.y += 0;
                player.animation = 'idle';
            }
        });
    }
    onJoin(client) {
        console.log(client.sessionId, 'joined!');
        // create Player instance
        const player = new MySchoolSchema_1.Player();
        player.x = 3900;
        player.y = 4000;
        // place player in the map of players by its sessionId
        this.state.players.set(client.sessionId, player);
    }
    onLeave(client) {
        console.log(client.sessionId, 'left!');
        this.state.players.delete(client.sessionId);
    }
    onDispose() {
        console.log('room', this.roomId, 'disposing...');
    }
}
exports.MySchool = MySchool;
