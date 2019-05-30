/* test-groupgroup.js
 *
 * A test of group groups.
 *
 */

const assert = require( 'assert')
const parser = require('../dist/tidal.js')

describe( 'Testing group groups and nested group groups.', () => {


  it( 'Array brackets [] should return an array marked as a group.', () => {

    const expected = {
      '0':{
        '0': {type: 'emoji', value: '🐸'},
        '1/3': {type: 'emoji', value: '🦎'},
        '2/3': {type: 'emoji', value: '🦀'},
        type: 'group'
      },
      type: 'group'
    }

    const result = parser.parse( '[🐸 🦎 🦀]' )

    assert.deepEqual( result, expected )
  })


  it( 'Nested brackets should return nested groups.', () => {
    const expected =
    {
      '0': {type: 'emoji', value: '🦏'},
      '1/3': {
        '0': {type: 'emoji', value: '🐸'},
        '1/3': {type: 'emoji', value: '🦎'},
        '2/3': {type: 'emoji', value: '🦀'},
        type: 'group'
      },
      '2/3': {type: 'emoji', value: '🐬'},
      type: 'group'
    }

    const result = parser.parse( '🦏 [🐸 🦎 🦀] 🐬' )
    assert.deepEqual( result, expected )

  })


  it( 'Nested brackets should return nested groups.', () => {
    const expected =
    {
      '0': {type: 'emoji', value: '🦏'},
      '1/3': {
        '0': {
          '0': {type: 'emoji', value: '🦏'},
          '1/3': {type: 'emoji', value: '🐸'},
          '2/3': {type: 'emoji', value: '🦎'},
          type: 'group'
        },
        '1/2': {
          '0': {type: 'emoji', value: '🦀'},
          '1/2': {type: 'emoji', value: '🐬'},
          type: 'group'
        },
        type: 'group'
      },
      '2/3': {type: 'emoji', value: '🐦'},
      type: 'group'
    }

    const result = parser.parse( '🦏[[🦏🐸🦎][🦀🐬]]🐦' )



    assert.deepEqual( result, expected )

  })


})
