'use strict';

import assert = require('assert');
import expectPowerAssertMessage from './lib/expectPowerAssertMessage';
import MyComponent from './lib/mycomponent.tsx';

describe('espower-typescript: ts', function() {
  it('Nested CallExpression with BinaryExpression: assert((three * (seven * ten)) === three)', function() {
    let one: number = 1;
    let two: number = 2;
    let three: number = 3;
    let seven: number = 7;
    let ten: number = 10;
    let expected: string = 
`  assert(three * (seven * ten) === three)
         |     |  |     | |    |   |     
         |     |  |     | |    |   3     
         |     |  |     | 10   false     
         |     |  7     70               
         3     210                       
  
  [number] three
  => 3
  [number] three * (seven * ten)
  => 210`;
    expectPowerAssertMessage(() => {
      assert(three * (seven * ten) === three);
    }, expected);
  });

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

  it('jsx:react', function() {
    let expected =
`  assert.equal(1, mycomponent_tsx_1.default())
                  |                 |         
                  |                 Object{"$$typeof":Symbol(react.element),type:"input",key:null,ref:null,props:#Object#,_owner:null,_store:#Object#}
                  Object{default:#function#}  `;
    expectPowerAssertMessage(() => {
      assert.equal(1, MyComponent());
    }, expected);
  });
});
