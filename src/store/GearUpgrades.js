import Modifier, { modifierTimer, multipleModifierTimer } from './Modifier';

// Available upgrades for more than one type of bike.
const bikeHelmet =
  {
    name: 'Bike Helmet',
    cost: 5,
    description: 'A basic brain bucket.',
    available: true,
    isGear: true,
    modifier: '+1 max speed, +1 min speed',
    modify(item) {
      console.log(item.modifier);
      item.timer = multipleModifierTimer(item, this.currentVehicle, 
        [
          {statOne: 'maxSpeed', statTwo: 'b'},
          {statOne: 'minSpeed', statTwo: 'b'},
        ],
      1);
    },
  }

export { bikeHelmet, };