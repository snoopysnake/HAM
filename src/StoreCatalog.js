import Modifier from './Modifier';

export var storeCatalog = [
  {
    vehicle: 'Folding Bike',
    upgrades:
    [
      {
        name: 'Sport Handlebars',
        cost: 20,
        description: 'Provides better grip and handling.',
        available: true,
        modifier: '+1 max speed',
        modify() {
          console.log('+1 max speed...');
          this.currentVehicle.maxSpeed.b+=1;
        },
      },
      {
        name: 'Comfy Seat',
        cost: 20,
        description: 'A plush seat.',
        available: true,
        modifier: '+1 max speed',
        modify() {
          console.log('+1 max speed...');
          this.currentVehicle.maxSpeed.b+=1;
        },
      },
      {
        name: 'Upgrade 4',
        cost: 80,
        available: true,
      },
      {
        name: 'Sample Upgrade 1',
        cost: 10,
        description: 'This is a basic reusable upgrade.',
        available: true,
        active: 5000, // ms upgrade active for
        cooldown: 6000, // ms before next purchase
        modifier: '+10 max speed',
        modify(item) {
          console.log(`${item.modifier}...`);
          this.currentVehicle.maxSpeed.b+=10;
        },
        remove(item) {
          console.log(`${item.name} effects have worn off...`);
          this.currentVehicle.maxSpeed.b-=10;
        },
      },
      {
        name: 'Sample Upgrade 2',
        cost: 10,
        description: 'This is a basic reusable upgrade.',
        available: true,
        active: 3000,
        cooldown: 10000,
        modifier: 'x2 total max speed',
        modify(item) {
          console.log(`${item.modifier}...`);
          this.currentVehicle.maxSpeed.m*=2;
        },
        remove(item) {
          console.log(`${item.name} effects have worn off...`);
          this.currentVehicle.maxSpeed.m/=2;
        },
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
