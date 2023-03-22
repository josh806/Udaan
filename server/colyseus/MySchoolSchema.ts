import { MapSchema, Schema, type } from '@colyseus/schema';

export class Player extends Schema {
  @type('number') x: number;
  @type('number') y: number;
  @type('string') animation: string;
}

export class MySchoolSchema extends Schema {
  @type({ map: Player }) players = new MapSchema<Player>();
}
