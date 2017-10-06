import Generator from './Generator';

export default class SimpsonGenerator extends Generator {
  constructor({min, max, a, r0, m}, size, numOfIntervals) {
    super({a, r0, m}, size, numOfIntervals);

    this.min = +min < +max ? +min : +max;
    this.max = +min < +max ? +max : +min;
    this.min /= 2;
    this.max /= 2;
  }

  calculate() {
    const firstR0 = this.generateR0() / this.m;
    const secondR0 = this.generateR0() / this.m;

    return this.min + (this.max - this.min) * firstR0
        + this.min + (this.max - this.min) * secondR0;
  }
}
