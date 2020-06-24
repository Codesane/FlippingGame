import {Cell, Piece, RectangularRegion} from "./types"

export default class PieceMap {
    private readonly pieces: Piece[][]

    constructor(readonly sideLength: number) {
        const pieces: Piece[][] = []
        for (let y = 0; y < sideLength; y++) {
            const row: Piece[] = []
            for (let x = 0; x < sideLength; x++) {
                row.push({
                    cell: { x, y },
                    flipped: false
                })
            }
            pieces.push(row)
        }
        this.pieces = pieces
    }

    getPiece(cell: Cell): Piece {
        this.assertIsWithinBounds(cell)
        return this.pieces[cell.y][cell.x]
    }

    flipPiece(cell: Cell) {
        this.assertIsWithinBounds(cell)
        this.pieces[cell.y][cell.x].flipped = !this.getPiece(cell).flipped
    }

    flipRegion(region: RectangularRegion) {
        for (let y = region.topLeft.y; y <= region.bottomRight.y; y++) {
            for (let x = region.topLeft.x; x <= region.bottomRight.x; x++) {
                this.flipPiece({ x, y })
            }
        }
    }

    private assertIsWithinBounds(cell: Cell) {
        if (!(cell.x >= 0 && cell.x < this.sideLength)) throw new Error(
            `Out of bounds, expected cell.x >= 0 && cell.x < ${this.sideLength} but cell.x was '${cell.x}'.`)

        if (!(cell.y >= 0 && cell.y < this.sideLength)) throw new Error(
            `Out of bounds, expected cell.y >= 0 && cell.y < ${this.sideLength} but cell.y was '${cell.y}'.`)
    }
}
