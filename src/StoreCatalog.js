import Modifier from './Modifier';

export var storeCatalog = [
  {
    vehicle: 'Folding Bike',
    upgrades:
    [
      {
        name: 'Sample Upgrade',
        cost: 10,
        description: 'This is a basic reusable upgrade.',
        available: true,
        cooldown: 6000, // ms before next purchase 
        modifier: '+10 max speed',
        modify() {
          console.log('+10 max speed...');
          this.currentVehicle.maxSpeed.b+=10;
          let upgradeTimeout = setTimeout(() => {
            console.log('Sample upgrade effects have worn off...');
            if (this.currentVehicle.maxSpeed.b > 0) {
              // subtract if upgrade active (prevents subtracting for new vehicle)
              // TODO: clear timeout? add timeout to array?
              this.currentVehicle.maxSpeed.b-=10;
            }
          }, 5000); // ms upgrade active for
          console.log(this.activeUpgrades.indexOf(upgradeTimeout))
          this.activeUpgrades.push(upgradeTimeout);
          console.log(this.activeUpgrades)
        },
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
      maxSpeed: new Modifier(15, 1, 1, 0),
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
      maxSpeed: new Modifier(25, 1, 1, 0),
      available: true,
      unique: true,
    }
  },
  {
    vehicle: 'Road Bike',
    upgrades: [],
  }
];
