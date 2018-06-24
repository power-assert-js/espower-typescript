'use strict';

const assert = require('assert');

describe('test for allowJs option', () => {
  beforeEach(function() {
    // don't use `assert` not to instrument
    const ass = assert;
    this.expectPowerAssertMessage = (body, expectedLines) => {
      try {
        body();
        ass.fail('AssertionError should be thrown');
      } catch (e) {
        ass.equal(
          e.message
            .split('\n')
            .slice(2, -1)
            .join('\n'),
          expectedLines
        );
      }
    };
  });

  it('equal with Literal and Identifier: assert.equal(1, minusOne)', function() {
    const minusOne = -1;
    const expected = `  assert.equal(1, minusOne)
                  |        
                  -1       `;
    this.expectPowerAssertMessage(() => {
      assert.equal(1, minusOne);
    }, expected);
  });
});
