import assert = require('assert');

export default function expectErrorStacksCorrect(line: number, column: number) {
  try {
    assert.fail('AssertionError should be thrown');
  } catch(e) {
    const matches = e.stack.match(/expectErrorStacksCorrect\.ts:(\d+):(\d+)/);
    assert(!!matches);
    assert.equal(matches[1], line);
    assert.equal(matches[2], column);
  }
}