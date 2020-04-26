import PieceMap from "./PieceMap"
import { Cell } from "./types"

const cellOf = (x: number, y: number): Cell => ({ x, y })

describe("PieceMap", () => {
    
    const cell_00 = cellOf(0, 0)
    const cell_01 = cellOf(0, 1)
    const cell_02 = cellOf(0, 2)

    const cell_10 = cellOf(1, 0)
    const cell_11 = cellOf(1, 1)
    const cell_12 = cellOf(1, 2)

    const cell_20 = cellOf(2, 0)
    const cell_21 = cellOf(2, 1)
    const cell_22 = cellOf(2, 2)

    let pieceMap: PieceMap

    describe("with 2x2 cells", () => {
        beforeEach(() => {
            pieceMap = new PieceMap(2)
        })

        it("should generate a grid with 4 non-flipped pieces", () => {
            expect(pieceMap.getPiece(cell_00)).toEqual({ cell: cell_00, flipped: false })
            expect(pieceMap.getPiece(cell_01)).toEqual({ cell: cell_01, flipped: false })
            expect(pieceMap.getPiece(cell_10)).toEqual({ cell: cell_10, flipped: false })
            expect(pieceMap.getPiece(cell_11)).toEqual({ cell: cell_11, flipped: false })
        })

        describe("when flipping a single piece", () => {
            beforeEach(() => {
                pieceMap.flipPiece(cell_01)
            })

            it("should flip the specified piece", () => {
                expect(pieceMap.getPiece(cell_01)).toEqual({ cell: cell_01, flipped: true })
            })

            it("should not flip any other pieces", () => {
                expect(pieceMap.getPiece(cell_00)).toEqual({ cell: cell_00, flipped: false })
                expect(pieceMap.getPiece(cell_10)).toEqual({ cell: cell_10, flipped: false })
                expect(pieceMap.getPiece(cell_11)).toEqual({ cell: cell_11, flipped: false })
            })

            describe("outside of the board", () => {
                it("should throw an error", () => {
                    expect(() => pieceMap.flipPiece(cellOf(100, 0))).toThrow("Out of bounds, expected cell.x >= 0 && cell.x < 2 but cell.x was '100'.")
                    expect(() => pieceMap.flipPiece(cellOf(-2, 0))).toThrow("Out of bounds, expected cell.x >= 0 && cell.x < 2 but cell.x was '-2'.")

                    expect(() => pieceMap.flipPiece(cellOf(0, 100))).toThrow("Out of bounds, expected cell.y >= 0 && cell.y < 2 but cell.y was '100'.")
                    expect(() => pieceMap.flipPiece(cellOf(0, -1))).toThrow("Out of bounds, expected cell.y >= 0 && cell.y < 2 but cell.y was '-1'.")
                })
            })
        })
    })

    describe("with 3x3 cells", () => {
        beforeEach(() => {
            pieceMap = new PieceMap(3)
        })

        describe("when flipping a region", () => {
            beforeEach(() => {
                /**
                 * Flip the following region on the 3x3 board
                 * 1 1 0
                 * 1 1 0
                 * 1 1 0
                 * */
                pieceMap.flipRegion({
                    topLeft: {
                        x: 0,
                        y: 0
                    },
                    bottomRight: {
                        x: 1,
                        y: 2
                    }
                })
            })

            it("should flip all pieces in the region", () => {
                // Expect that all cells are checked in on the y-axis when x = 0
                expect(pieceMap.getPiece(cell_00)).toEqual({ cell: cell_00, flipped: true })
                expect(pieceMap.getPiece(cell_01)).toEqual({ cell: cell_01, flipped: true })
                expect(pieceMap.getPiece(cell_02)).toEqual({ cell: cell_02, flipped: true })

                // Expect that all cells are checked in on the y-axis when x = 1
                expect(pieceMap.getPiece(cell_10)).toEqual({ cell: cell_10, flipped: true })
                expect(pieceMap.getPiece(cell_11)).toEqual({ cell: cell_11, flipped: true })
                expect(pieceMap.getPiece(cell_12)).toEqual({ cell: cell_12, flipped: true })
            })

            it("should not flip any other pieces", () => {
                expect(pieceMap.getPiece(cell_20)).toEqual({ cell: cell_20, flipped: false })
                expect(pieceMap.getPiece(cell_21)).toEqual({ cell: cell_21, flipped: false })
                expect(pieceMap.getPiece(cell_22)).toEqual({ cell: cell_22, flipped: false })
            })
        })
    })
})
