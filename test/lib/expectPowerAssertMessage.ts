import expect = require('expect.js');

export default function expectPowerAssertMessage(body: () => void, expectedLines: string) {
  try {
    body();
    expect().fail('AssertionError should be thrown');
  } catch(e) {
    expect(e.message.split('\n').slice(2, -1).join('\n')).to.eql(expectedLines);
  }
};
