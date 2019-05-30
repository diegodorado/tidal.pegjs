/* test-group.js
 *
 * A test of simple number series as groups.
 *
 */

const assert = require( 'assert')
const parser = require('../dist/tidal.js')

describe( 'Testing simple number series groups.', () => {


  it( '"😂 🤣 😃" should parse to an array of three emojis, marked as a group.', () => {
    const expected = {
      '0': {type: 'emoji', value: '😂'},
      '1/3': {type: 'emoji', value: '🤣'},
      '2/3': {type: 'emoji', value: '😃'},
      type: 'group'
    }
    const result = parser.parse( '😂 🤣 😃' )

    assert.deepEqual( expected, result )
  })


  it ('"😂" should parse to an array of 1 emoji, marked as group.', () => {

    const expected = {
      '0': {type: 'emoji', value: '😂'},
      type: 'group'
    }

    const result = parser.parse('😂')

    assert.deepEqual( result , expected)
  })

})
