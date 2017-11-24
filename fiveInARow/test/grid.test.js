const expect = require("chai").expect
const Grid = require("../app/grid").Grid

describe("Grid", () => {
  describe("when created", () => {
    it("grid is empty", () => {
      expect(new Grid().get(0, 0)).to.be.undefined
    })
  })

  describe("add", () => {
    it("and remember it", () => {
      let grid = new Grid()
      grid.add(0, 0, "O")
      expect(grid.get(0, 0)).to.be.equal("O")
    })
    it("at any location", () => {
      let grid = new Grid()
      grid.add(-1, -1, "X")
      expect(grid.get(-1, -1)).to.be.equal("X")
      grid.add(-100, -1, "X")
      expect(grid.get(-100, -1)).to.be.equal("X")
      grid.add(-1, 100, "X")
      expect(grid.get(-1, 100)).to.be.equal("X")
    })
  })

  describe("maxSquares", () => {

    it("which is zero when created", () => {
      let grid = new Grid()
      expect(grid.maxSquares()).to.be.equal(0)
    })

    it("to be one after add on center", () => {
      let grid = new Grid()
      grid.add(0, 0, 'O')
      expect(grid.maxSquares()).to.be.equal(1)
    })

    it("to be nine after add on index x nine", () => {
      let grid = new Grid()
      grid.add(0, 9, 'O')
      expect(grid.maxSquares()).to.be.equal(9)
    })

    it("to be nine after add on index y nine", () => {
      let grid = new Grid()
      grid.add(9, 0, 'O')
      expect(grid.maxSquares()).to.be.equal(9)
    })

    it("to be nine after add on index x negative nine", () => {
      let grid = new Grid()
      grid.add(0, -9, 'O')
      expect(grid.maxSquares()).to.be.equal(9)
    })

    it("to be nine after add on index y negative nine", () => {
      let grid = new Grid()
      grid.add(-9, 0, 'O')
      grid.maxSquares()
      expect(grid.maxSquares()).to.be.equal(9)
    })
  })

  describe("win", () => {
    it("is off at creation", () => {
      expect(new Grid().win).to.be.undefined
    })

    it("needs five in a row", () => {
      let grid = new Grid()
      for (let x = 0; x < 5; x++) {
        expect(grid.win).to.be.undefined
        grid.add(x, 0, 'X')
      }
      expect(grid.win).to.be.eql({ x1: 0, y1: 0, x2: 4, y2: 0 })
    })

    it("can be offset", () => {
      let grid = new Grid()
      for (let x = 0; x < 5; x++) {
        expect(grid.win).to.be.undefined
        grid.add(x + 10, 0, 'X')
      }
      expect(grid.win).to.be.eql({ x1: 10, y1: 0, x2: 14, y2: 0 })
    })

    it("can happen on negatives", () => {
      let grid = new Grid()
      for (let x = 0; x < 5; x++) {
        expect(grid.win).to.be.undefined
        grid.add(-x, 0, 'X')
      }
      expect(grid.win).to.be.eql({ x1: -4, y1: 0, x2: 0, y2: 0 })
    })
    it("works for columns too", () => {
      let grid = new Grid()
      for (let y = 0; y < 5; y++) {
        expect(grid.win).to.be.undefined
        grid.add(0, y, 'X')
      }
      expect(grid.win).to.be.eql({ x1: 0, y1: 0, x2: 0, y2: 4 })
    })
    it("even negtive columns", () => {
      let grid = new Grid()
      for (let y = 0; y < 5; y++) {
        expect(grid.win).to.be.undefined
        grid.add(0, -y, 'X')
      }
      expect(grid.win).to.be.eql({ x1: 0, y1: -4, x2: 0, y2: 0 })
    })
    it("first diagonal", () => {
      let grid = new Grid()
      for (let z = 0; z < 5; z++) {
        expect(grid.win).to.be.undefined
        grid.add(z, z, 'X')
      }
      expect(grid.win).to.be.eql({ x1: 0, y1: 0, x2: 4, y2: 4 })
    })
    it("second diagonal", () => {
      let grid = new Grid()
      for (let z = 0; z < 5; z++) {
        expect(grid.win).to.be.undefined
        grid.add(-z, -z, 'X')
      }
      expect(grid.win).to.be.eql({ x1: -4, y1: -4, x2: 0, y2: 0 })
    })
    it("third diagonal", () => {
      let grid = new Grid()
      for (let z = 0; z < 5; z++) {
        expect(grid.win).to.be.undefined
        grid.add(-z, z, 'X')
      }
      expect(grid.win).to.be.eql({ x1: -4, y1: 4, x2: 0, y2: 0 })
    })
    it("forth diagonal", () => {
      let grid = new Grid()
      for (let z = 0; z < 5; z++) {
        expect(grid.win).to.be.undefined
        grid.add(z, -z, 'X')
      }
      expect(grid.win).to.be.eql({ x1: 0, y1: 0, x2: 4, y2: -4 })
    })
  })
})
