// Run with Node.js v5+

'use strict';

let assert = require('assert');

class Person {
  constructor(public name: string, public age: number) {
  }
  getAge(): string {
    return this.age;
  }
}

describe('Person', () => {
  let alice = new Person('alice', 3);
  let bob = new Person('bob', 5);
  it('#getAge', () => {
    assert(alice.getAge() === 3);
  });
  it('#name', () => {
    assert(alice.name === 'alice');
  });
  // failed
  it('#mistake', () => {
    assert(alice.name === bob.name);
  });
  // failed
  it('arrow function', () => {
    assert(alice.name === (() => 1));
  });
  // failed
  it('TypeScript 2.0', () => {
    function upperCase(this:string): string {
      return this.toUpperCase();
    }
    assert(alice.name === upperCase.call('test'));
  });
});
