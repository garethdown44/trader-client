var React = require('react');
var TestUtils = require('react/lib/ReactTestUtils');
var expect = require('expect');
var OptionTile = require('../OptionTile').default;

describe('option tile', function () {
  it('renders without problems', function () {

    var leg = { strike: 1.234 };

    var tile = TestUtils.renderIntoDocument(<OptionTile legs={[leg]} />);

    expect(tile).toExist();
  });
});