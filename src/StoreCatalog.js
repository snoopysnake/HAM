import Modifier from './Modifier';
import { helmet1} from './GearUpgrades';

export var storeCatalog = [
  {
    vehicle: 'Folding Bike',
    upgrades:
    [
      helmet1,
      {
        name: 'Riser Handlebars',
        cost: 5,
        description: 'Provides better grip and handling.',
        available: true,
        modifier: '+2 max speed',
        modify() {
          console.log('+1 max speed...');
          this.currentVehicle.maxSpeed.b+=1;
        },
      },
      {
        name: 'Comfy Seat',
        cost: 5,
        description: 'A plush seat.',
        available: true,
        modifier: '+2 min speed',
        modify() {
          console.log('+1 max speed...');
          this.currentVehicle.maxSpeed.b+=1;
        },
      },
      {
        name: 'Sample Upgrade',
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
    ],
    nextVehicle: {
      name: 'Fixie',
      cost: 20,
      minSpeed: 5,
      maxSpeed: new Modifier(15, 1, 1, 0),
      available: true,
      unique: true,
    }
  },
  {
    vehicle: 'Fixie',
    upgrades: [
      helmet1,
    ],
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
