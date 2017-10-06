import Generator from './Generator';

export default class GammaGenerator extends Generator {
  constructor({lambda, n, a, r0, m}, size, numOfIntervals) {
    super({a, r0, m}, size, numOfIntervals);

    this.lambda = parseFloat(lambda);
    this.n = +n;
  }

  calculate() {
    let composition = 1;
    for(let i = 0; i < this.n; i++) {
      composition *= this.generateR0() / this.m;
    }
    
    return -1 / this.lambda * Math.log(composition);
  }
}
