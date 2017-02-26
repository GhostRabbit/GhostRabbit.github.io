var expect = require("chai").expect;
var func = require("../app/functional");

describe("Functional", () => {
  describe("sum", () => {
    it("adds three numbers", () => {
      expect(func.sum([1,2,3])).to.equals(6);
    });
  });
  
  describe("reverse", () => {
    it("reverses three numbers", () => {
      expect(func.reverse([1,2,3])).to.deep.equal([3,2,1]);
    });
  });
  
  describe("map", () => {
    it("applies function over array", () => {
      expect(func.map((x) => {return 2*x}, [1,2,3])).to.deep.equal([2,4,6]);
    });
  });
  
  describe("filter", () => {
    it("applies predicate over array", () => {
      expect(func.filter((x) => {return x % 2 === 1}, [1,2,3])).to.deep.equal([1,3]);
    });
  });
  
  describe("unfold", () => {
    it("gathers results of function", () => {
      expect(func.unfold((x) => {if (x < 3) return [String.fromCharCode(x + 65), x+ 1] }, 0)).to.deep.equal(['A', 'B', 'C']);
    });
  });
  
  describe("range", () => {
    it("build array of values between bounderies", () => {
      expect(func.range(5, 10)).to.deep.equal([5,6,7,8,9,10]);
    });
  });
});