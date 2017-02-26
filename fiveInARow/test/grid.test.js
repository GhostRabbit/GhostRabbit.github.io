var expect = require("chai").expect;
var Grid = require("../app/grid").Grid;

describe("Grid", () => {
  describe("should when created", () => {
    var grid = new Grid();
    it("be have zero max squares", () => {
      expect(grid.maxSquares()).to.be.equal(-1);
    });
    
    it("not have any win", () => {
      expect(grid.win).to.be.undefined;
    });
    
    it("not have anything stored", () => {
      expect(grid.get(0,0)).to.be.undefined;
    });
  });
  
  /*
  This test does not work as we do not have p5.js available when running mocha.
  Need to figureout a way around that.
  
  describe("should add", () => {
    it("and remeber it", () => {
      var grid = new Grid();
      grid.add(0, 0, "O");
      expect(grid.get(0,0)).to.be.equal("O");
    });
  });
  */
  
});