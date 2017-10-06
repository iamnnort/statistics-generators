import Generator from './Generator';

export default class GaussianGenerator extends Generator {
  constructor({n, mx, std, a, r0, m}, size, numOfIntervals) {
    super({a, r0, m}, size, numOfIntervals);

    this.n = +n;
    this.mx = parseFloat(mx);
    this.std = parseFloat(std);
  }

  calculate() {
    let sumR0 = 0;
    for (let i = 0; i < this.n; i++) {
      sumR0 += this.generateR0() / this.m;
    }

    return this.mx + this.std * Math.sqrt(12 / this.n) * (sumR0 - this.n / 2);
  }
}
