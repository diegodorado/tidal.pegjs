/* test-degrade.js
 *
 * A test for degrading groups.
 *
 */

const assert = require( 'assert')
const parser = require('../dist/tidal.js')
const Tracer = require('pegjs-backtrace')

describe( 'Testing degradation.', () => {

  it( 'should degrade a number when followed by a question mark.', () => {

    const expected = {
      '0': {
        type: 'degrade',
        value: {type: 'emoji', value: '🤩'}
      },
      type: 'group',
    }

    const result = parser.parse( '🤩?' )

    assert.deepEqual( result , expected)

  });


    it( 'should degrade distinct numbers in pattern when followed by a question mark.', () => {
      const expected = {
        '0': {
          type:'degrade',
          value:{ type:'emoji', value:'🤩' }
        },
        '1/3': {
          type:'degrade',
          value:{ type:'emoji', value:'🤢' }
        },
        '2/3': {
          type:'degrade',
          value:{ type:'emoji', value:'👿' }
        },
        type: 'group'
      }

      const result = parser.parse( '🤩? 🤢? 👿?' )

      assert.deepEqual( result , expected)
    });


    it( 'should degrade a repetition when followed by a question mark.', () => {

      const expected = {
        '0': {
          type: 'degrade',
          value: {
            operator: '*',
            repeatValue: { type: 'number', value: 6 },
            value: { type:'emoji', value:'😿' },
            type: 'repeat',
          },
        },
        type: 'group',
      }

      const result = parser.parse( '😿*6?' )
      assert.deepEqual( result , expected)
    });



})
