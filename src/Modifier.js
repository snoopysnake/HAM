export default class Modifier {
  constructor(x, m, a, b) {
    // follows total = m*(a*x + b)
    this.x = x; // value
    this.m = m;
    this.a = a;
    this.b = b;
  }
  total() {
    return this.m * (this.a * this.x + this.b);
  }
}
