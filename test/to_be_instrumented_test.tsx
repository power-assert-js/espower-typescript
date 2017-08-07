'use strict';

import assert = require('assert');
import React = require('react');
import expectPowerAssertMessage from './lib/expectPowerAssertMessage';

describe('espower-typescript: tsx', function() {
  it('jsx:react', function() {
    let Foo = (): any => {
        return (<input />);
    };

    let expected =
`  assert.equal(1, Foo())
                  |     
                  Object{"$$typeof":Symbol(react.element),type:"input",key:null,ref:null,props:#Object#,_owner:null,_store:#Object#}`;
    expectPowerAssertMessage(() => {
      assert.equal(1, Foo());
    }, expected);
  });
});
