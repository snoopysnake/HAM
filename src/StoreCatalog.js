import React from 'react';
import Modifier from './Modifier';
import { bikeHelmet, } from './GearUpgrades';
import { ReactComponent as LightweightPedals } from './svg/folding_bike_lightweight_pedals.svg';
import { ReactComponent as RiserHandlebars } from './svg/folding_bike_riser_handlebars.svg';

export var storeCatalog = [
  {
    vehicle: 'Folding Bike',
    upgrades:
    [
      bikeHelmet,
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
        isMod: true,
        SVG: <RiserHandlebars />
      },
      {
        name: 'Lightweight Pedals',
        cost: 5,
        description: 'Flat pedals made with lighter material.',
        available: true,
        modifier: '+2 min speed',
        modify() {
          console.log('+1 max speed...');
          this.currentVehicle.maxSpeed.b+=1;
        },
        isMod: true,
        SVG: <LightweightPedals />
      },
      {
        name: 'Sample Upgrade',
        cost: 10,
        description: 'This is a basic reusable upgrade.',
        available: true,
        active: 4000, // ms upgrade active for
        cooldown: 4000, // ms before next purchase
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
      SVG: <div>This is a Fixie</div>
    }
  },
  {
    vehicle: 'Fixie',
    upgrades: [
      bikeHelmet,
      {
        name: 'Comfy Seat',
        cost: 25,
        description: 'A plush seat.',
        available: true,
        isMod: true,
        modifier: '+5 min speed',
        modify() {
          console.log('+1 max speed...');
          this.currentVehicle.maxSpeed.b+=1;
        },
      },
    ],
    nextVehicle: {
      name: 'Road Bike',
      cost: 200,
      minSpeed: 5,
      maxSpeed: new Modifier(25, 1, 1, 0),
      available: true,
      unique: true,
      SVG: <div>This is a Road Bike</div>
    }
  },
  {
    vehicle: 'Road Bike',
    upgrades: [],
  }
];
