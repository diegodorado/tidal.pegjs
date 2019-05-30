/* test-onestep.js
 *
 * A test for one-step per cycle.
 */

const assert = require( 'assert')
const parser = require('../dist/tidal.js')

 describe('Testing one-step per cycle', () => {

   it('<> should return a group marked as onestep', () => {
     const expected = {
       '0': {type: 'emoji', value: '🐷'},
       '1/3': {type: 'emoji', value: '🍉'},
       '2/3': {type: 'emoji', value: '🍆'},
       type: 'onestep'
     }

      const result = parser.parse('<🐷 🍉 🍆>')[0]

      assert.deepEqual( result , expected)

   });


 })
