import PieceMap from "./PieceMap"
import { Cell } from "./types"

const cellOf = (x: number, y: number): Cell => ({ x, y })

describe("PieceMap", () => {
    const cell_00 = cellOf(0, 0)
    const cell_01 = cellOf(0, 1)
    const cell_10 = cellOf(1, 0)
    const cell_11 = cellOf(1, 1)

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

        describe("when flipping pieces", () => {
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
})
