import _ from 'lodash';

import Generator from './Generator';

export default class EvenGenerator extends Generator {
  constructor({min, max, a, r0, m}, size, numOfIntervals) {
    super({a, r0, m}, size, numOfIntervals);

    this.min = +min < +max ? +min : +max;
    this.max = +min < +max ? +max : +min;
  }
  
  calculate() {
    const firstR0 = this.generateR0() / this.m;
    const secondR0 = this.generateR0() / this.m;
    
    
    return this.min + (this.max - this.min) * _.max([firstR0, secondR0]);
  }
}
