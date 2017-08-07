'use strict';

import assert = require('assert');
import expectPowerAssertMessage from '../../lib/expectPowerAssertMessage';

describe('espower-typescript: `outDir` option', function() {
  it('equal with Literal and Identifier: assert.equal(1, minusOne)', function() {
    let minusOne: number = -1;
    let expected: string =
`  assert.equal(1, minusOne)
                  |        
                  -1       `;
    expectPowerAssertMessage(() => {
      assert.equal(1, minusOne);
    }, expected);
  });
});
