import assert = require('assert');

export default function expectPowerAssertMessage(body: () => void, expectedLines: string) {
  try {
    body();
    assert.fail('AssertionError should be thrown');
  } catch(e) {
    assert.equal(e.message.split('\n').slice(2, -1).join('\n'), expectedLines);
  }
};
