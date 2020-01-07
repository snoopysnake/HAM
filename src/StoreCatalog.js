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
        cooldown: 5000, // ms before next purchase 
        modifier: '+10 max speed',
        modify() {
          this.currentVehicle.maxSpeed+=10;
        }
      },
      {
        name: 'Upgrade 2',
        cost: 20,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        available: true,
      },
      {
        name: 'Upgrade 3',
        cost: 40,
        available: true,
      },
      {
        name: 'Upgrade 4',
        cost: 80,
        available: true,
      },
      {
        name: 'Upgrade 5',
        cost: 99999999,
        available: false,
      },
      {
        name: 'Upgrade 6',
        cost: 99999999,
        available: false,
      },
      {
        name: 'Upgrade 7',
        cost: 99999999,
        available: false,
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
