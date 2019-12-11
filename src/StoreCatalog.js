export var storeCatalog = [
  {
    vehicle: 'Folding Bike',
    upgrades:
    [
      {
        name: 'Upgrade 1',
        cost: 10,
        description: 'This is a description of upgrade 1.',
        available: true,
        unique: false,
      },
      {
        name: 'Upgrade 2',
        cost: 20,
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
    ],
    nextVehicle:
    {
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
    nextVehicle:
    {
      name: 'Road Bike',
      cost: 200,
      minSpeed: 5,
      maxSpeed: 25,
    }
  },
  {
    vehicle: 'Road Bike',
    upgrades: [],
  }
];
