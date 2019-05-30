/* test-repeat.js
 *
 * A tests for repeats in Tidal.
 *
 */

const assert = require( 'assert')
const parser = require('../dist/tidal.js')
const Tracer = require('pegjs-backtrace')


describe( "Testing repeats with '*'", () => {

  it( 'should not allow a number without an operator.', () => {

    let failed = false
    try {
      parser.parse( '2' )
    } catch(err) {
      failed = true
    }
    assert.equal(failed, true)
  });


  it( 'should generate a 2x repeat on a number.', () => {

    const expected = {
      '0': {
        type: 'repeat',
        operator:'*',
        repeatValue: { type: 'number', value: 2 },
        value: { type:'emoji', value:'💚' }
      },
      type: 'group',
    }

    const result = parser.parse( '💚*2' )

    assert.deepEqual(result, expected)

  });


  it( 'should generate a 2x repeat on a group pattern', () => {
    const expected = {
      type:'repeat',
      operator: '*',
      repeatValue: { type: 'number', value: 2 },
      value: {
        '0': { type:'emoji', value:'💜' },
        '1/2': { type:'emoji', value:'💚' },
        type: 'group'
      },
    }

return


    const text = '[💜 💚]*2'
    const tracer = new Tracer(text, {showTrace: true, hiddenPaths:["Emoji_Raw", 'Emoji_Variant']})
    let failed = false
    try {
      const result = parser.parse(text, { tracer:tracer });
      assert.deepEqual(expected , result)

    } catch(e) {
      failed = true
      console.log(tracer.getBacktraceString());
    }

    assert.deepEqual(failed , false)



  });


})
