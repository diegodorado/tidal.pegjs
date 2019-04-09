top =  euclid / repeat / polyrhythm / group / list

// generic term for matching in groups
term "term" = body:(
  polymeter / polyrhythm / degrade / repeat / feet / group / euclid  / number / word / rest
) _ { return body }

// a list (which is a group)
list = _ body:term+ _ { body.type = 'group'; return body }

// a group
group "group" = _ '[' _ body:term+ _ ']' _ {
  body.type = 'group'
  return body
}

// bjorklund
euclid = _ value:noteuclid '(' _ pulses:term ',' _ slots:term ')' _ {
  return { type:'euclid', value, pulses, slots }
}
// avoid left-recursions
noteuclid = body:( group / number / word / rest ) _ { return body }

// degrading individual values
degrade = value:notdegrade '?' {
  return { type:'degrade', value }
}
// avoid left-recursions
notdegrade = body:( repeat / euclid / group / number / word ) _ { return body }

// match a binary operation, a la 4*2, or [0 1]*4
repeat = value:notrepeat _ operator:op  _ repeatValue:term {
  return { type:'repeat', value, operator, repeatValue }
}
// avoid left-recursions
notrepeat = body:(euclid / polymeter / group / number / word / rest ) _ { return body }


polymeter = _ '{' _ left:term+ ',' _ right:term+ _ '}' _ {
  return { type:'polymeter', left, right }
}

// return a rest object
rest = '~' {
 return { type:'rest' }
}

// identifies an array of groups delimited by '.' characters
feet = start:foot+ end:term+ {
  end.type = 'group'

  start.push( end )
  start.type = 'group'

  return start
}

// identifies a group delimited by a '.' character
foot = value:notfoot+ dot _ {
  //let group = value.map( v => v[0] )
  value.type = 'group'
  return value
}
// avoid left-recursions
notfoot = degrade / polymeter / rest repeat / euclid / group / number / word

// basically, get each list and push into an array while leaving out whitespace
// and commas
polyrhythm = _ '[' _ body:(notpolyrhythm _ ',' _ )+ end:notpolyrhythm _ ']'_ {
  const concurrent = []
  concurrent.type = 'polyrhythm'

  for( let i = 0; i < body.length; i++ ) {
  	concurrent.push( body[ i ][ 0 ] )
    concurrent[ concurrent.length - 1 ].type = 'group'
  }

  end.type = 'group'

  concurrent.push( end )

  return concurrent
}
notpolyrhythm = body:(list / euclid / polymeter / group / number / word / rest ) _ { return body }

word "word" = _ value:$[^ \[\] \{\} \(\) \t\n\r '*' '/' '.' '~' '?' ',']+ _ {
  return { type:typeof value, value }
}

// match tidal operators
op = ('*' / '/')
dot = '.'
question = '?'

number = _ "-"? (([0-9]+ "." [0-9]*) / ("."? [0-9]+)) _ {
  return { type:'number', value:+text() }
}

_ "whitespace" = [ \t\n\r ]*
