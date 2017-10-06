import Generator from './Generator';

export default class EvenGenerator extends Generator {
  constructor({min, max, a, r0, m}, size, numOfIntervals) {
    super({a, r0, m}, size, numOfIntervals);

    this.min = +min < +max ? +min : +max;
    this.max = +min < +max ? +max : +min;
  }

  calculate() {
    this.generateR0();

    return this.min + (this.max - this.min) * this.r0 / this.m;
  }
}
