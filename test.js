/*global it, describe */

const
  RMR = require('./index'),
  chai = require('chai'),
//  assert = chai.assert,
  expect = chai.expect;

describe('rmr-util', function() {

  it('RMR.XHR', function xhr() {
    expect(RMR.XHR.request({})).to.equal(null);
  });

  it('RMR.Object', function object() {
    expect(RMR.Object.queryString({})).to.equal('');

    const obj = {
      a: 1,
      b: 2,
      c: {
        d: 3
      }
    };

    expect(RMR.Object.value(obj, 'a')).to.equal(1);
    expect(RMR.Object.value(obj, 'b')).to.equal(2);
    expect(RMR.Object.value(obj, 'c.d')).to.equal(3);
  });

// https://maps.apple.com/?t=m&ll=33.677729,-116.302573&q=Palm%20Desert



// -19 m,16ºC,33º40’39.8”N 116º18’9.3”W,15 m,0:04,66 bpm,7.2 km/h,19 W,18 rpm


  it('RMR.Map', function map() {
    expect(RMR.Map.formatLatitude(33.677729)).to.equal('33º40’39.82”N');
    expect(RMR.Map.formatLongitude(-116.302573)).to.equal('116º18’9.26”W');
  });

  it('RMR.Date', function date() {
    expect(RMR.Date.fromRFC3339('')).to.equal(null);

    const d = RMR.Date.fromRFC3339('2015-01-25T00:00:00-0700');
    expect(d).to.not.equal(null);
    expect(d.getDate()).to.not.equal(25);
    expect(d.getMonth()).to.not.equal(1);
    expect(d.getYear()).to.not.equal(2015);

    expect(RMR.Date.toRFC3339(d)).to.equal('2015-01-25T07:00:00Z');
  });


  it('RMR.Array', function() {

    const arr = [
      { id: 'a' },
      { id: 'b' },
      { id: 'c' },
      5
    ];

    expect(RMR.Array.find(arr, 5)).to.equal(3);
    expect(RMR.Array.find(arr, 'b')).to.equal(1);
    expect(RMR.Array.find(arr, { id: 'c' })).to.equal(2);

    expect(RMR.Array.find(arr, function(obj) {
      return obj.id === 'b';
    })).to.equal(1);

    expect(RMR.Array.find(arr, function(obj) {
      return obj.id === 'b';
    })).to.equal(1);

    expect(RMR.Array.find(arr, function(obj) {
      return obj.id === 'd';
    })).to.equal(-1);
  });

  it('RMR.String', function fromPath() {

    expect(RMR.String.isURL('http://readmeansrun.com')).to.equal(true);
    expect(RMR.String.isURL('https://readmeansrun.com')).to.equal(true);
    expect(RMR.String.isURL('www.readmeansrun.com')).to.equal(false);

    expect(RMR.String.isURL('https://www.google.com')).to.equal(true);
    expect(RMR.String.isURL('www.google.com')).to.equal(false);

  });


});
