const bikeHelmet = {
  name: 'Bike Helmet',
  cost: 5,
  description: 'A basic brain bucket.',
  available: true,
  isGear: true,
  modifier: '+1 max speed, +1 min speed',
  modify() {
    console.log('+1 max speed...');
    this.currentVehicle.maxSpeed.b+=1;
  },
};

export { bikeHelmet, };