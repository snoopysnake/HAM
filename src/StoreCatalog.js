export var storeCatalog = [
  {
    vehicle: 'Folding Bike',
    upgrades:
    [
      {
        name: 'Upgrade 1',
        cost: 10,
      },
      {
        name: 'Upgrade 2',
        cost: 20,
      },
    ],
    nextVehicle:
    {
      name: 'Fixie',
      cost: 100,
      minSpeed: 5,
      maxSpeed: 15,
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
