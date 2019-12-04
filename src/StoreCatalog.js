export var storeCatalog = {
  'Vehicles':
    [
      {
          name: 'Dirt Bike',
          cost: 10,
          minSpeed: 10,
          maxSpeed: 35,
          func: () => { console.log('This is a bicycle.') },
      },
      {
          name: 'Race Bike',
          cost: 20,
          minSpeed: 25,
          maxSpeed: 50,
          func: () => { console.log('This is a motorcycle.') },
      },
      {
          name: 'Vehicle 3',
          cost: 40,
          minSpeed: 50,
          maxSpeed: 100,
      },
      {
          name: 'Vehicle 4',
          cost: 80,
          minSpeed: 100,
          maxSpeed: 250,
      },
    ],
  'Upgrades':
    [
      {
          name: 'Upgrade 1',
      }
    ],
  'Achievements':
    [
      {
          name: 'Achievement 1',
      }
    ],
};
