function sum(xs) {
  return reduce(function (acc, x) {return x + acc}, 0, xs)
}
exports.sum = sum;

function first(xs) {
  return xs[0];
}

function rest(xs) {
  return xs.splice(1);
}

function reverse(xs) {
  return reduce(function (acc, x) {return [x].concat(acc)}, [], xs)
}
exports.reverse = reverse;


function reduce(f, acc, xs) {
  if (xs.length === 0) return acc
  return reduce(f, f(acc, first(xs)), rest(xs))
}


function map(f, xs) {
  return reduce(function (acc, x) {return acc.concat(f(x))}, [], xs)
}
exports.map = map;

function filter(f, xs) {
  return reduce(function (acc, x) { return f(x)?acc.concat(x):acc}, [], xs)
}
exports.filter = filter;

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
exports.unfold = unfold;

function range(i, count) {
  return unfold(function(x) { if (x <= count) return [x, x + 1]}, i)
}
exports.range = range;

/*

assertEquals(
unfold(function (x) { if (x < 26) return [String.fromCharCode(x + 65), x + 1] }, 0),
['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'])
assertEquals(range(5, 10), [5,6,7,8,9,10])
*/
