export const createMap = (map: Phaser.Tilemaps.Tilemap) => {
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
  const libraryLayer = map.createLayer('Library', classRoomLayout);
  const genericLayer = map.createLayer('generic', genericLayout);
  const furnitureLayer = map.createLayer(
    'classroom_furnitures',
    classRoomLayout
  );

  const libraryPropsLayer = map.createLayer('Library_props', classRoomLayout);
  const genericOverlayLayer = map.createLayer('generic_overlay', genericLayout);
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

  libraryLayer.setCollisionByProperty({ collides: true });
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
  const layer = {
    libraryLayer: libraryLayer,
    genericLayer: genericLayer,
    libraryPropsLayer: libraryPropsLayer,
    genericOverlayLayer: genericOverlayLayer,
    genericPropLayer: genericPropLayer,
    playgroundLayer: playgroundLayer,
    gameFieldPropLayer: gameFieldPropLayer,
    gameFieldLayer: gameFieldLayer,
    TreeLayer1: TreeLayer1,
    TreeLayer2: TreeLayer2,
    vehiclesLayer: vehiclesLayer,
    swingsLayer: swingsLayer,
    musicLayer: musicLayer,
    officeChairLayer: officeChairLayer,
    interiorSportsLayer: interiorSportsLayer,
    bathroomLayer: bathroomLayer,
    wallsLayer: wallsLayer,
    furnitureLayer: furnitureLayer,
    chairLayer: chairLayer,
    playgroundPropsLayer: playgroundPropsLayer,
  };
  return layer;
};
