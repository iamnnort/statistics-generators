import _ from 'lodash';

export default class Generator {
  constructor({a, r0, m}, size = 1000000, numOfIntervals = 20) {
    this.size = +size;
    this.numOfIntervals = +numOfIntervals;
    this.a = +a;
    const maxR0 = Math.pow(2, this.size) - 1;
    this.r0 = +r0 > maxR0 ? maxR0 : +r0;
    this.m = +m;

    this.list = [];
    this.entries = [];
    this.labels = [];
  }

  calculate() {
    throw new Error('You have to implement the method calculate!');
  }

  generateR0() {
    return this.r0 = (this.a * this.r0) % this.m;
  }

  generateList() {
    for (let i = 0; i < this.size; i++) {
      this.list.push(this.calculate());
    }
  }

  spliceList() {
    const min = _.min(this.list);
    const max = _.max(this.list);
    const delta = (max - min) / this.numOfIntervals;
    let leftBorder = min;
    let rightBorder = min + delta;

    for (let i = 0; i <
    this.numOfIntervals; i++, leftBorder += delta, rightBorder += delta) {
      this.labels.push(leftBorder.toFixed(2) + ' - ' + rightBorder.toFixed(2));
      this.entries.push(this.list.filter(
          item => item >= leftBorder && item < rightBorder).length);
    }

    this.entries[this.numOfIntervals - 1] += this.list.reduce(
        item => item === max ? 1 : 0, 0);
  }

  getExpectation(precision = 9) {
    return (_.sum(this.list) / this.size).toFixed(precision);
  }

  getDispersion(precision = 9) {
    const expectation = this.getExpectation();

    return (this.list.reduce(
        (sum, item) => sum + Math.pow(item, 2) - Math.pow(expectation, 2), 0) /
        (this.size - 1)).toFixed(precision);
  }

  getSKO(precision = 9) {
    const expectation = this.getExpectation();

    return (this.list.reduce(
        (sum, item) => sum + Math.pow(item - expectation, 2), 0) /
        (this.size - 1)).toFixed(precision);
  }
}
