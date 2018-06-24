// don't use `assert` not to instrument
import ass = require('assert');

export default function expectPowerAssertMessage(body: () => void, expectedLines: string) {
  try {
    body();
    ass.fail('AssertionError should be thrown');
  } catch(e) {
    ass.equal(e.message.split('\n').slice(2, -1).join('\n'), expectedLines);
  }
};
