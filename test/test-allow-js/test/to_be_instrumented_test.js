'use strict';

import assert = require('assert')
import expect = require('expect.js')
import MyComponent from '../lib/mycomponent.tsx';

describe('test for allowJs option', function() {
  beforeEach(function() {
    this.expectPowerAssertMessage = (body: () => void, expectedLines: string) => {
      try {
        body();
        expect().fail('AssertionError should be thrown');
      } catch(e) {
        expect(e.message.split('\n').slice(2, -1).join('\n')).to.eql(expectedLines);
      }
    }
  });

  it('equal with Literal and Identifier: assert.equal(1, minusOne)', function() {
    let minusOne: number = -1;
    let expected: string =
`  assert.equal(1, minusOne)
                  |        
                  -1       `;
    this.expectPowerAssertMessage(() => {
      assert.equal(1, minusOne);
    }, expected);
  });
});
