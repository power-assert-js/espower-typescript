'use strict';

import assert = require('assert')
import expect = require('expect.js')
import React = require('react');

describe('espower-typescript: tsx', function() {

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

  it('jsx:react', function() {
    let Foo = (): any => {
        return (<input />);
    };

    let expected =
`  assert.equal(1, Foo())
                  |     
                  Object{"$$typeof":Symbol(react.element),type:"input",key:null,ref:null,props:#Object#,_owner:null,_store:#Object#}`;
    this.expectPowerAssertMessage(() => {
      assert.equal(1, Foo());
    }, expected);
  });
});
