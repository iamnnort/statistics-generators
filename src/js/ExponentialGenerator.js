import Generator from './Generator';

export default class ExponentialGenerator extends Generator {
  constructor({lambda, a, r0, m}, size, numOfIntervals) {
    super({a, r0, m}, size, numOfIntervals);

    this.lambda = parseFloat(lambda); 
  }

  calculate() {
    this.generateR0();

    return -Math.log(this.r0 / this.m) / this.lambda;
  }
}
