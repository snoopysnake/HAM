export var storeCatalog = [
  {
    vehicle: 'Folding Bike',
    upgrades:
    [
      {
        name: 'Upgrade 1',
        cost: 10,
        description: 'This is a loooooooooooooooooooong description of upgrade 1.',
        available: true,
        unique: false,
        modify(stat) {
          return stat + 1; // for modifying vars in app.js
        }
      },
      {
        name: 'Upgrade 2',
        cost: 20,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        available: true,
        unique: true,
      },
      {
        name: 'Upgrade 3',
        cost: 40,
        available: true,
        unique: true,
      },
      {
        name: 'Upgrade 4',
        cost: 80,
        available: true,
        unique: true,
      },
      {
        name: 'Upgrade 5',
        cost: 99999999,
        available: false,
        unique: true,
      },
      {
        name: 'Upgrade 6',
        cost: 99999999,
        available: false,
        unique: true,
      },
      {
        name: 'Upgrade 7',
        cost: 99999999,
        available: false,
        unique: true,
      },
    ],
    nextVehicle: {
      name: 'Fixie',
      cost: 100,
      minSpeed: 5,
      maxSpeed: 15,
      available: true,
      unique: true,
    }
  },
  {
    vehicle: 'Fixie',
    upgrades: [],
    nextVehicle: {
      name: 'Road Bike',
      cost: 200,
      minSpeed: 5,
      maxSpeed: 25,
      available: true,
      unique: true,
    }
  },
  {
    vehicle: 'Road Bike',
    upgrades: [],
  }
];
