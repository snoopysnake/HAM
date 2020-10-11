export default class Modifier {
  constructor(x, m, a, b) {
    // follows total = m*(a*x + b)
    this.x = x; // value
    this.m = m; // multiplier (of everything)
    this.a = a; // multiplier
    this.b = b; // addend
  }
  total() {
    return this.m * (this.a * this.x + this.b);
  }
}

export function modifierTimer(item, vehicle, statOne, statTwo, statBuff) {
  // Helps with transition when buff applied
  let i = 0;
  return setInterval(
    () => {
      vehicle[statOne][statTwo]+=statBuff/30;
      i++;
      if (i === 30) {
        clearInterval(item.timer);
      }
    },
    500/60 // Adds stat in half second
  );
}

export function multipleModifierTimer(item, vehicle, stats, statBuff) {
  // Helps with transition when buff applied
  let i = 0;
  return setInterval(
    () => {
      stats.forEach(s => {
        vehicle[s.statOne][s.statTwo]+=statBuff/30;
      });
      i++;
      if (i === 30) {
        clearInterval(item.timer);
      }
    },
    500/60 // Adds stat in half second
  );
}
