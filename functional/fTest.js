function assertEquals(a, b) {
  if (a === b) return
  if (a == null || b == null || a.length != b.length) throw a + " differs from " + b
  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) 
      throw a + " differs from " + b + " at element " + i + "(" + a[i] + " vs " + b[i] + ")"
  }
}



function sum(xs) {
  
  return reduce(function (acc, x) {return x + acc}, 0, xs)

}


function first(xs) {

  return xs[0];

}



function rest(xs) {

  return xs.splice(1);

}



function reverse(xs) {

  return reduce(function (acc, x) {return [x].concat(acc)}, [], xs)

}



function reduce(f, acc, xs) {

  if (xs.length === 0) return acc

  return reduce(f, f(acc, first(xs)), rest(xs))

}



function map(f, xs) {

  return reduce(function (acc, x) {return acc.concat(f(x))}, [], xs)

}



function filter(f, xs) {

  return reduce(function (acc, x) { return f(x)?acc.concat(x):acc}, [], xs)

}



function para(f, acc, xs) {
  if (xs.length === 0) return acc

  return para(f, f(acc, first(xs), xs), rest(xs))

}

function unfold(f, seed) {
  function go(f, seed, acc) {
    var res = f(seed)
    return res ? go(f, res[1], acc.concat([res[0]])) : acc
  }
  return go(f, seed, [])
}

function range(i, count) {
  return unfold(function(x) { if (x <= count) return [x, x + 1]}, i)
}

assertEquals(sum([1,2,3]), 6
)
assertEquals(reverse([1,2,3]), [3,2,1])
assertEquals(map(function(x) {return x * 2}, [1,2,3]), [2,4,6])
assertEquals(filter(function(x) {return x % 2 === 1}, [1,2,3]), [1,3])
assertEquals(
unfold(function (x) { if (x < 26) return [String.fromCharCode(x + 65), x + 1] }, 0),
['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'])
assertEquals(range(5, 10), [5,6,7,8,9,10])
