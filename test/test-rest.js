/* test-rest.js
 *
 * A test for rests in Tidal
 *
 */

const assert = require( 'assert')
const parser = require('../dist/tidal.js')

describe( 'Testing rests.', () => {


  it( 'should generate a rest object when parsing a ~', () => {
    const expected = {
      '0': { type:'emoji', value:'🤢' },
      '1/4': { type:'rest' },
      '1/2': { type:'emoji', value:'👿' },
      '3/4': { type:'rest' },
    }
    expected.type  = 'group'

    const result = parser.parse( '🤢 ~ 👿 ~' )

    assert.deepEqual( result, expected )
  })

})
